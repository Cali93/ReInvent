import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from './themes';

const theme = createMuiTheme({ ...themes.default, ...overrides });

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    credentials: 'include'
  }),
  cache
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <StoreProvider store={store}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </StoreProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
