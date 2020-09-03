/* eslint-disable import/no-extraneous-dependencies */
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import fetch from 'node-fetch';

// const client = new SubscriptionClient(`ws://localhost:3000/graphql`, {
//   reconnect: true
// });

// const link = new WebSocketLink(client);
// Có thể viết thành 1 hàm để lấy client tùy thích
// -> sử dụng cho getServerSidesProps
// export const withApolloClient = () => {
const wsLink = process.browser ? new WebSocketLink({ // Vì ssr nên browser sẽ throw phải check null
  uri: process.env.WS_API,
  options: {
    reconnect: true,
    lazy: true,
  },
  onReconnected: () => {
    console.log('WS reconnected');
  },
  onConnected: () => {
    console.log('WS connect');
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors + Socket error', graphQLErrors);
    console.log('networkError + Socket error', networkError);
  },
}) : null;

const httplink = new createHttpLink({
  uri: process.env.API,
  credentials: 'include',
  fetch,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

const link = process.browser ? split( // Chỉ split khi trên browser (đủ 2 links)
  // split dựa trên loại connection
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httplink,
) : httplink;
const client = new ApolloClient({
  link,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
});
// return client;
// }

export const ApolloComponent = (props) => {
  // const client = withApolloClient();
  const { children } = props;
  return (<ApolloProvider client={client}>{children}</ApolloProvider>);
};
