import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StoreProvider, useStoreActions } from 'easy-peasy';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider, useQuery } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error404 from './components/Error/Error404';
import { GET_CURRENT_USER } from './graphql/auth';
import { store } from './store';
import themes, { overrides } from './themes';

const theme = createMuiTheme({ ...themes.default, ...overrides });

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL,
    credentials: 'include'
  }),
  cache
});
const App = () => {
  // const setUser = useStoreActions(actions => actions.user.setUser);
  // const { data, loading } = useQuery(GET_CURRENT_USER);
  // if (loading) {
  //   return <div />;
  // }
  // if (data.getUser && data.getUser.user && data.getUser.user.id) {
  //   const { __typename, ...userData } = data.getUser.user;
  //   setUser(userData);
  // }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <StoreProvider store={store}>
          <MuiThemeProvider theme={theme}>
            <Router>
              <Switch>
                {/* <Route exact path='/authenticate' component={Auth} />
                <Route exact path='/' render={() => <Redirect to='/app/estates' />} />
                <PrivateRoute path='/app' component={Dashboard} /> */}
                <Route component={Error404} />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </StoreProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
