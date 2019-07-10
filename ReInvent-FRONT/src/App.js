import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import './App.css';
import { useQuery } from 'react-apollo-hooks';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Error404 from './components/Error/Error404';
import { PrivateRoute } from './components/common/PrivateRoute/PrivateRoute';
import { GET_CURRENT_USER } from './graphql/auth';

const App = () => {
  const setUser = useStoreActions(actions => actions.user.setUser);

  const { data, loading } = useQuery(GET_CURRENT_USER);
  if (loading) {
    return <div />;
  }
  if (data.getUser && data.getUser.user && data.getUser.user.id) {
    setUser(data.getUser.user);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/authenticate' component={Auth} />
        <Route exact path='/' render={() => <Redirect to='/app' />} />
        <PrivateRoute path='/app' component={Dashboard} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
};

export default App;
