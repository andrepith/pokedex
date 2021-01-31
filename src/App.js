import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Pokemons from "./containers/Pokemons";

import "./index.css";

function App() {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <Pokemons />
    </ApolloProvider>
  );
}

export default App;
