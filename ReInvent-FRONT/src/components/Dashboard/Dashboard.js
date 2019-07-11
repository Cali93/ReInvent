import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Estates from './Estates/Estates';
import Profile from './Profile/Profile';
import Offices from './Offices/Offices';
import Users from './Users/Users';
import Sidebar from '../Layout/Sidebar/Sidebar';
import TopToolbar from '../Layout/TopToolbar/TopToolbar';
import { PrivateRoute } from '../common/PrivateRoute/PrivateRoute';
import { useDashboardStyles } from './dashboard.styles';

const Dashboard = () => {
  const classes = useDashboardStyles();
  const [isOpen, setToggleDrawer] = useState(true);
  const handleToggleDrawer = () => {
    setToggleDrawer(prevState => !prevState);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <TopToolbar isOpen={isOpen} handleToggleDrawer={handleToggleDrawer} classes={classes} />
        <Sidebar isOpen={isOpen} handleToggleDrawer={handleToggleDrawer} classes={classes} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <PrivateRoute exact path='/app/estates' component={Estates} />
            <PrivateRoute exact path='/app/offices' component={Offices} />
            <PrivateRoute exact path='/app/users' component={Users} />
            <PrivateRoute exact path='/app/profile' component={Profile} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
