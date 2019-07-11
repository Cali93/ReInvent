import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SeeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useUserStyles } from './user.styles';
import { GET_ALL_USERS, DELETE_USER } from '../../../graphql/users';
import ConfirmPopover from '../../common/ConfirmPopover/ConfirmPopover';
import { Mutation } from 'react-apollo';
import EditUserDialog from './EditUserDialog';
import CreateUserDialog from './CreateUserDialog';

const Users = () => {
  const classes = useUserStyles();
  const [isEditDialogOpen, setToggleEditDialog] = useState(false);
  const [isCreateDialogOpen, setToggleCreateDialog] = useState(false);
  const [user, setUser] = useState({
    userId: null,
    officeId: null,
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    gender: ''
  });
  const { data, error, loading } = useQuery(GET_ALL_USERS);

  const handleEditUser = (user) => {
    const { __typename, ...userFields } = user;
    setUser(userFields);
    setToggleEditDialog(prevState => !prevState);
  };

  const handleCreateUser = () => {
    setToggleCreateDialog(prevState => !prevState);
  };

  const renderGender = (gender) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'Mr.';
      case 'female':
        return 'Mrs.';
      default:
        return '';
    }
  };

  if (loading || !data.allUsers) {
    return <div />;
  }
  if (error) {
    return <div>Oops an error has occured...</div>;
  }
  return (
    <>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Users
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            You can browse through all the users.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleCreateUser}
                >
                  Create an user
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {isEditDialogOpen && (
        <EditUserDialog
          isOpen={isEditDialogOpen}
          toggleDialog={() => setToggleEditDialog()}
          user={user}
        />
      )}
      {isCreateDialogOpen && (
        <CreateUserDialog
          isOpen={isCreateDialogOpen}
          toggleDialog={handleCreateUser}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='md'>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {data.allUsers.map(user => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={user.avatar}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {user.gender && renderGender(user.gender)}{' '}
                    {user.firstName && user.firstName}{' '}
                    {user.lastName && user.lastName}
                  </Typography>
                  <Typography>{user.email && user.email}</Typography>
                  <Typography>
                    {user.officeId && <span>Office ID: {user.officeId}</span>}
                  </Typography>
                  <Typography>
                    {user.role && <span>Permissions: {user.role}</span>}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size='small' color='primary'>
                    <SeeIcon color='primary' />
                  </Button>
                  <Button size='small' onClick={() => handleEditUser(user)}>
                    <EditIcon color='secondary' />
                  </Button>
                  <Mutation mutation={DELETE_USER}>
                    {deleteUser => (
                      <ConfirmPopover
                        confirmAction='Delete user'
                        onConfirmation={() =>
                          deleteUser({
                            variables: {
                              id: user.id
                            },
                            refetchQueries: [{ query: GET_ALL_USERS }]
                          })
                        }
                      >
                        <DeleteIcon color='error' />
                      </ConfirmPopover>
                    )}
                  </Mutation>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Users;
