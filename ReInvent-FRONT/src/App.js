import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
// import logo from './assets/logo.svg';
import './App.css';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Auth from './components/Auth/Auth';

export const GET_CURRENT_USER = gql`
  query getUser {
    getUser {
      ok
      user {
        id
        firstName
        lastName
        email
      }
      errors {
        path
        message
      }
    }
  }
`;
function App () {
  const todos = useStoreState(state => state.todos.items);
  const addTodo = useStoreActions(actions => actions.todos.add);
  const setUser = useStoreActions(actions => actions.user.setUser);

  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  if (loading) {
    console.log(loading);
  }
  if (data.getUser && data.getUser.user && data.getUser.user.id) {
    setUser(data.getUser.user);
  }

  // !todos.includes('Learn Easy Peasy') && addTodo('Learn Easy Peasy');
  return (
    <Router>
      <Switch>
        <Route exact path='/authenticate' component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
