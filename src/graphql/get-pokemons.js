import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        name
        image
        id
      }
    }
  }
`;

export const GET_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      species {
        name
      }
      height
      weight
      types {
        type {
          name
        }
      }
      sprites {
        front_default
      }
    }
  }
`;
