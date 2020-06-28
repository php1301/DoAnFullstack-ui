/* eslint-disable import/no-extraneous-dependencies */
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch,
  credentials: 'include',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});
// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#login_usage nếu muốn gắn vào header

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const ApolloComponent = (props) => {
  const { children } = props;
  return (<ApolloProvider client={client}>{children}</ApolloProvider>);
};
