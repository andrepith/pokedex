import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { padStart, capitalize, startCase } from "lodash";
import { GET_DETAIL } from "../graphql/get-pokemons";

import "./index.css";

const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const Pokemon = ({ id, name }) => {
  const { data, loading } = useQuery(GET_DETAIL, {
    variables: { id, name },
  });

  if (loading) {
    return <div></div>;
  }
  return (
    <div className={data.pokemon.types[0].toLowerCase() + " detail-page"}>
      <div style={{ padding: "40px" }} className="d-flex">
        <div>
          <h1>{startCase(data.pokemon.name)}</h1>
          <div className="wrapper-pills">
            {data.pokemon.types.map((item, key) => (
              <span
                className={item.toLowerCase() + " pills text-center"}
                key={key}
              >
                {capitalize(item)}
              </span>
            ))}
          </div>
        </div>
        <div className="id">
          <div>#{padStart(data.pokemon.number, 3, 0)}</div>
        </div>
      </div>
      <div className="text-center">
        <img
          alt={"pokemon-" + data.pokemon.number}
          src={imageUrl + Number(data.pokemon.number) + ".png"}
          width="300px"
        />
      </div>
      <div className="about">
        <h2 style={{ marginBottom: "16px" }}>Details</h2>
        <table className="table-about">
          <tbody>
            <tr>
              <td>Classification</td>
              <td>{data.pokemon.classification}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>
                {data.pokemon.height.minimum} - {data.pokemon.height.maximum}
              </td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>
                {data.pokemon.weight.minimum} - {data.pokemon.weight.maximum}
              </td>
            </tr>
            <tr>
              <td>Abilities</td>
            </tr>
          </tbody>
        </table>
        <div className="wrapper-pills">
          {[...data.pokemon.attacks.fast, ...data.pokemon.attacks.special].map(
            (item, key) => (
              <span
                className={
                  data.pokemon.types[0].toLowerCase() + " pills text-center"
                }
                key={key}
              >
                {capitalize(item.name)}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
