import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { startCase } from "lodash";
import Modal from "react-modal";
import { GET_POKEMONS } from "../graphql/get-pokemons";
import PokemonDetail from "../components/PokemonDetail";

import "./index.css";

const customStyles = {
  content: {
    padding: 0,
  },
};

const PokemonsContainer = () => {
  const [list, setList] = useState([]);
  const [first, setFirst] = useState(20);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentID, setID] = useState("");
  const [currentName, setName] = useState("");
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { first },
  });

  const openModal = (id, name) => {
    setID(id);
    setName(name);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (loading === false && data) {
      setList(data.pokemons);
    }
  }, [data, loading]);

  if (list) {
    return (
      <>
        <div className="main">
          <h1 className="main-title">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
              alt="Pokemon Logo"
            />
          </h1>
          <div className="wrapper-card">
            {list.map((item, key) => {
              return (
                <div
                  className="poke-list"
                  key={key}
                  onClick={() => openModal(item.id, item.name)}
                >
                  <div className="poke-list__image">
                    <img
                      width={96}
                      alt={item.name + " image"}
                      src={item.image}
                    />
                  </div>
                  <div className="poke-list__name">{startCase(item.name)}</div>
                </div>
              );
            })}
          </div>
          {!!list.length && (
            <button
              className="button-see-more"
              onClick={() => setFirst(first + 20)}
            >
              See More
            </button>
          )}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <PokemonDetail id={currentID} name={currentName} />
        </Modal>
      </>
    );
  }
};

Modal.setAppElement("#root");

export default PokemonsContainer;
