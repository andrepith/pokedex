import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      name
      image
      id
    }
  }
`;

export const GET_DETAIL = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      classification
      maxHP
      maxCP
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      types
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }
`;
