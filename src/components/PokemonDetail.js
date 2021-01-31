import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { padStart, capitalize, startCase } from "lodash";
import { GET_DETAIL } from "../graphql/get-pokemons";

import "./index.css";

const Pokemon = ({ name }) => {
  const { data, loading } = useQuery(GET_DETAIL, {
    variables: { name },
  });

  if (loading) {
    return <div></div>;
  }
  return (
    <div className={data.pokemon.types[0].type.name + " detail-page"}>
      <div style={{ padding: "40px" }} className="d-flex">
        <div>
          <h1>{startCase(name)}</h1>
          <div className="wrapper-pills">
            {data.pokemon.types.map((item, key) => (
              <span className={item.type.name + " pills text-center"} key={key}>
                {capitalize(item.type.name)}
              </span>
            ))}
          </div>
        </div>
        <div className="id">
          <div>#{padStart(data.pokemon.id, 3, 0)}</div>
        </div>
      </div>
      <div className="text-center">
        <img
          alt={"pokemon-" + data.pokemon.id}
          src={data.pokemon.sprites.front_default}
          height="300px"
        />
      </div>
      <div className="about">
        <h2 style={{ marginBottom: "16px" }}>Details</h2>
        <table className="table-about">
          <tbody>
            <tr>
              <td>Species</td>
              <td>{data.pokemon.species.name}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{data.pokemon.height} cm</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{data.pokemon.weight} kg</td>
            </tr>
            <tr>
              <td>Abilities</td>
            </tr>
          </tbody>
        </table>
        <div className="wrapper-pills">
          {data.pokemon.abilities.map((item, key) => (
            <span
              className={data.pokemon.types[0].type.name + " pills text-center"}
              key={key}
            >
              {capitalize(item.ability.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
