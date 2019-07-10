import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ChartsIcon from '@material-ui/icons/BarChart';
import EstatesIcon from '@material-ui/icons/AccountBalance';
import PeopleIcon from '@material-ui/icons/People';
import OfficesIcon from '@material-ui/icons/Domain';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { resetLinkStyle } from '../../../utils/styles';

export const MainNavItems = withRouter(({ history, match }) => {
  const isActive = (path) => history.location.pathname.includes(path);
  return (
    <>
      <Link style={resetLinkStyle} to='/app/estates'>
        <ListItem button selected={isActive('/app/estates')}>
          <ListItemIcon>
            <EstatesIcon />
          </ListItemIcon>
          <ListItemText primary='Estates' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/offices'>
        <ListItem button selected={isActive('/app/offices')}>
          <ListItemIcon>
            <OfficesIcon />
          </ListItemIcon>
          <ListItemText primary='Offices' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/users'>
        <ListItem button selected={isActive('/app/users')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItem>
      </Link>
      <Link style={resetLinkStyle} to='/app/charts'>
        <ListItem button selected={isActive('/app/charts')}>
          <ListItemIcon>
            <ChartsIcon />
          </ListItemIcon>
          <ListItemText primary='Charts' />
        </ListItem>
      </Link>
    </>
  );
});

export const SecondaryNavItems = () => {
  return (
    <>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Current month' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Last quarter' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Year-end sale' />
      </ListItem>
    </>
  );
};
