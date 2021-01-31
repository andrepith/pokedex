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
  const [limit, setLimit] = useState(20);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentName, setName] = useState("");
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { limit, offset: 0 },
  });

  const openModal = (name) => {
    setName(name);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (loading === false && data) {
      setList(data.pokemons.results);
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
                  onClick={() => openModal(item.name)}
                >
                  <div>
                    <img alt={item.name + " image"} src={item.image} />
                  </div>
                  <div>{startCase(item.name)}</div>
                </div>
              );
            })}
          </div>
          {!!list.length && (
            <button
              className="button-see-more"
              onClick={() => setLimit(limit + 20)}
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
          <PokemonDetail name={currentName} />
        </Modal>
      </>
    );
  }
};

Modal.setAppElement("#root");

export default PokemonsContainer;
