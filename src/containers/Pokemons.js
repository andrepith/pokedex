import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { startCase } from "lodash";
import Modal from "react-modal";
import { GET_POKEMONS } from "../graphql/get-pokemons";
import PokemonDetail from "../components/PokemonDetail";
import PokemonCompare from "../components/PokemonCompare";

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
  const [isCompare, setCompare] = useState(false);
  const [compareID, setCompareID] = useState("");
  const [compareName, setCompareName] = useState("");
  const { data, loading } = useQuery(GET_POKEMONS, {
    variables: { first },
  });

  const openModal = (id, name) => {
    if (isCompare) {
      setCompareID(id);
      setCompareName(name);
    } else {
      setID(id);
      setName(name);
    }
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const comparePokemon = () => {
    setCompare(true);
    setIsOpen(false);
  };

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
          {isCompare && (
            <div
              onClick={() => setCompare(false)}
              style={{ marginBottom: "16px" }}
            >
              <div>Compare {startCase(currentName)} with:</div>
              <button className="button-see-more">Stop Comparing</button>
            </div>
          )}
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
          {isCompare ? (
            <PokemonCompare
              currentID={currentID}
              currentName={currentName}
              compareID={compareID}
              compareName={compareName}
            />
          ) : (
            <>
              <PokemonDetail id={currentID} name={currentName} />
              <div
                style={{
                  padding: "0 40px 16px",
                  backgroundColor: "#f4f4f4",
                  marginTop: "-16px",
                }}
                className="text-center"
              >
                <button className="button-see-more" onClick={comparePokemon}>
                  Compare This Pokemon
                </button>
              </div>
            </>
          )}
        </Modal>
      </>
    );
  }
};

Modal.setAppElement("#root");

export default PokemonsContainer;
