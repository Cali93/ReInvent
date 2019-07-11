import React from 'react';
import { Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { LOGOUT_USER } from '../../../graphql/auth';
import { useStoreActions } from 'easy-peasy';

const LogoutButton = () => {
  const logoutUser = useStoreActions(actions => actions.user.logout);

  const handleLogout = async (logout) => {
    await logoutUser();
    await logout();
    return window.location.reload();
  };

  return (
    <Mutation mutation={LOGOUT_USER}>
      {logout => (
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => handleLogout(logout)}
        >
          Logout
        </Button>
      )}
    </Mutation>
  );
};

export default LogoutButton;
