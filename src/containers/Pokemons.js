import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { startCase } from "lodash";
import { GET_POKEMONS } from "../graphql/get-pokemons";

import "./index.css";
const PokemonsContainer = () => {
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(20);
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { limit, offset: 0 },
  });

  useEffect(() => {
    if (loading === false && data) {
      setList(data.pokemons.results);
    }
  }, [data, loading]);

  if (list) {
    return (
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
              <div className="poke-list" key={key}>
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
    );
  }
};

export default PokemonsContainer;
