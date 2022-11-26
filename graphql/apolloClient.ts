import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clavmiw6u33y101us006xggne/master", //brane z ustawień projektu w GraphCMS
  cache: new InMemoryCache(),
});
