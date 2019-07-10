import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { GET_CURRENT_USER } from '../../../graphql/auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={GET_CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <div />;
      if (error) return <Redirect to='/login' />;
      return (
        <Route
          {...rest}
          render={props =>
            data && data.getUser && data.getUser.ok && data.getUser.user && data.getUser.user.id ? (
              <Component {...props} />
            ) : (
              <Redirect to='/login' />
            )
          }
        />
      );
    }}
  </Query>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object
};
