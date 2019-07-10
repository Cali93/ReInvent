import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItem';
import { useDashboardStyles } from './dashboard.styles';

const Dashboard = () => {
  const classes = useDashboardStyles();
  const [isOpen, setToggleDrawer] = React.useState(true);
  const handleToggleDrawer = () => {
    setToggleDrawer(prevState => !prevState);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='absolute' className={clsx(classes.appBar, isOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='Open drawer'
            onClick={handleToggleDrawer}
            className={clsx(classes.menuButton, isOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
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
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Router>
          <Switch>
            <Route exact path='/app/dashboard' />
            <Route exact path='/app/estates' />
            <Route exact path='/app/offices' />
            <Route exact path='/app/users' />
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default withRouter(Dashboard);
