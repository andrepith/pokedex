import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { capitalize } from "lodash";
import { GET_DETAIL } from "../graphql/get-pokemons";

import "./index.css";

const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const PokemonCompare = ({ currentID, currentName, compareID, compareName }) => {
  const { data: currentData, loading: currentLoading } = useQuery(GET_DETAIL, {
    variables: { id: currentID, name: currentName },
  });
  const { data: compareData, loading: compareLoading } = useQuery(GET_DETAIL, {
    variables: { id: compareID, name: compareName },
  });
  if (currentLoading || compareLoading) {
    return <div />;
  }
  if (currentData && compareData) {
    return (
      <div>
        <h2 style={{ marginBottom: "16px", padding: "40px 16px 16px" }}>
          Comparing Pokemon
        </h2>
        <div className="d-flex" style={{ padding: "16px" }}>
          <div className="pokemon-showdown">
            <div className="my-auto">
              <img src={currentData.pokemon.image} style={{ width: "100%" }} />
            </div>
            <span
              className={currentData.pokemon.types[0].toLowerCase() + " pills"}
              style={{ marginTop: "auto" }}
            >
              {currentData.pokemon.name}
            </span>
          </div>
          <div className="pokemon-showdown">
            <div className="my-auto">
              <img src={compareData.pokemon.image} style={{ width: "100%" }} />
            </div>
            <span
              className={compareData.pokemon.types[0].toLowerCase() + " pills"}
              style={{ marginTop: "auto" }}
            >
              {compareData.pokemon.name}
            </span>
          </div>
        </div>
        <div className="about d-flex" style={{ padding: "32px 8px" }}>
          <div className="flex-1" style={{ marginRight: "4px" }}>
            <div className="attributes">
              <div>Max HP</div>
              <div>{currentData.pokemon.maxHP}</div>
            </div>
            <div className="attributes">
              <div>Max CP</div>
              <div>{currentData.pokemon.maxCP}</div>
            </div>
            <div className="attributes">
              <div>Abilities</div>
              <div>
                {[
                  ...currentData.pokemon.attacks.fast,
                  ...currentData.pokemon.attacks.special,
                ].map((item, key) => (
                  <div className="pokemon-moves" key={key}>
                    <div className="d-flex">
                      <span
                        className={
                          item.type.toLowerCase() + " pills d-inline-block"
                        }
                      >
                        {item.type}
                      </span>
                      <div className="my-auto">{capitalize(item.name)}</div>
                    </div>
                    <div>Attack Power: {item.damage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="attributes">
              <div>Max HP</div>
              <div>{compareData.pokemon.maxHP}</div>
            </div>
            <div className="attributes">
              <div>Max CP</div>
              <div>{compareData.pokemon.maxCP}</div>
            </div>
            <div className="attributes">
              <div>Abilities</div>
              <div>
                {[
                  ...compareData.pokemon.attacks.fast,
                  ...compareData.pokemon.attacks.special,
                ].map((item, key) => (
                  <div className="pokemon-moves" key={key}>
                    <div className="d-flex">
                      <span
                        className={
                          item.type.toLowerCase() + " pills d-inline-block"
                        }
                      >
                        {item.type}
                      </span>
                      <div className="my-auto">{capitalize(item.name)}</div>
                    </div>
                    <div>Attack Power: {item.damage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonCompare;
