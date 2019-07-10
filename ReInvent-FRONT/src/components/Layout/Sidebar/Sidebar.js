import React from 'react';
import clsx from 'clsx';
import { Drawer, IconButton, Divider, List } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainNavItems, SecondaryNavItems } from './navItems';

const Sidebar = ({ isOpen, handleToggleDrawer, classes }) => {
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose)
      }}
      open={isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MainNavItems />
      </List>
      <Divider />
      <List>
        <SecondaryNavItems />
      </List>
    </Drawer>
  );
};

export default Sidebar;
