import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { capitalize } from "lodash";
import { GET_DETAIL } from "../graphql/get-pokemons";

import "./index.css";

const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const multiplierDamage = (type, weakness, resistance) => {
  if (weakness.includes(type)) {
    return 1.25;
  }
  if (resistance.includes(type)) {
    return 0.75;
  }
  return 1;
};

const PokemonCompare = ({ currentID, currentName, compareID, compareName }) => {
  const [winner, setWinner] = useState("");
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
    const pokemonA = currentData.pokemon;
    const pokemonB = compareData.pokemon;
    const currentMoves = [
      ...currentData.pokemon.attacks.fast,
      ...currentData.pokemon.attacks.special,
    ];
    const compareMoves = [
      ...compareData.pokemon.attacks.fast,
      ...compareData.pokemon.attacks.special,
    ];
    const fightPokemon = () => {
      let pokemonAHealth = pokemonA.maxHP;
      let pokemonBHealth = pokemonB.maxHP;
      let pokemonAStep = 0;
      let pokemonBStep = 0;

      while (pokemonAHealth > 0) {
        const moves =
          compareMoves[Math.floor(Math.random() * compareMoves.length)];
        pokemonAHealth -=
          moves.damage *
          multiplierDamage(moves.type, pokemonA.weaknesses, pokemonA.resistant);
        pokemonAStep++;
      }

      while (pokemonBHealth > 0) {
        const moves =
          currentMoves[Math.floor(Math.random() * currentMoves.length)];
        pokemonBHealth -=
          moves.damage *
          multiplierDamage(moves.type, pokemonB.weaknesses, pokemonB.resistant);
        pokemonBStep++;
      }

      setWinner(pokemonAStep > pokemonBStep ? pokemonA.name : pokemonB.name);
    };
    return (
      <div>
        <h2 style={{ marginBottom: "16px", padding: "40px 16px 16px" }}>
          Pokemon Showdown
        </h2>
        <div className="d-flex" style={{ padding: "16px" }}>
          <div className="pokemon-showdown">
            <div className="my-auto">
              <img src={pokemonA.image} style={{ width: "100%" }} />
            </div>
            <span
              className={pokemonA.types[0].toLowerCase() + " pills"}
              style={{ marginTop: "auto" }}
            >
              {pokemonA.name}
            </span>
          </div>
          <div className="pokemon-showdown">
            <div className="my-auto">
              <img src={pokemonB.image} style={{ width: "100%" }} />
            </div>
            <span
              className={pokemonB.types[0].toLowerCase() + " pills"}
              style={{ marginTop: "auto" }}
            >
              {pokemonB.name}
            </span>
          </div>
        </div>
        <div className="about" style={{ padding: "32px 8px" }}>
          <div className="d-flex">
            <div className="flex-1" style={{ marginRight: "4px" }}>
              <div className="attributes">
                <div>Max HP</div>
                <div>{pokemonA.maxHP}</div>
              </div>
              <div className="attributes">
                <div>Max CP</div>
                <div>{pokemonA.maxCP}</div>
              </div>
              <div className="attributes">
                <div>Abilities</div>
                <div>
                  {currentMoves.map((item, key) => (
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
                <div>{pokemonB.maxHP}</div>
              </div>
              <div className="attributes">
                <div>Max CP</div>
                <div>{pokemonB.maxCP}</div>
              </div>
              <div className="attributes">
                <div>Abilities</div>
                <div>
                  {compareMoves.map((item, key) => (
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
          <div className="text-center">
            <button
              onClick={fightPokemon}
              style={{ padding: "8px 32px", borderRadius: "8px" }}
            >
              Fight!!!
            </button>
          </div>
          {winner && (
            <div style={{ marginTop: "16px" }} className="text-center">
              The Winner is {winner}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default PokemonCompare;
