import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EstatesIcon from '@material-ui/icons/AccountBalance';
import PeopleIcon from '@material-ui/icons/People';
import OfficesIcon from '@material-ui/icons/GroupWork';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { resetLinkStyle } from '../../utils/styles';

export const mainListItems = (
  <>
    <Link style={resetLinkStyle} to='/app/dashboard'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
    </Link>
    <Link style={resetLinkStyle} to='/app/estates'>
      <ListItem button>
        <ListItemIcon>
          <EstatesIcon />
        </ListItemIcon>
        <ListItemText primary='Estates' />
      </ListItem>
    </Link>
    <Link style={resetLinkStyle} to='/app/offices'>
      <ListItem button>
        <ListItemIcon>
          <OfficesIcon />
        </ListItemIcon>
        <ListItemText primary='Offices' />
      </ListItem>
    </Link>
    <Link style={resetLinkStyle} to='/app/users'>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Users' />
      </ListItem>
    </Link>
  </>
);

export const secondaryListItems = (
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
