import React, { useState, useCallback } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import { useUserStyles } from '../Users/user.styles';
import EditUserDialog from '../Users/EditUserDialog';
import { useStoreState } from 'easy-peasy';
import { renderGender } from '../../../utils/helpers';

const Profile = () => {
  const classes = useUserStyles();
  const user = useStoreState(state => state.user.user);
  const { __typename, ...userFields } = user;
  const [isEditDialogOpen, setToggleEditDialog] = useState(false);

  const handleEditUser = useCallback(
    () => {
      setToggleEditDialog(!isEditDialogOpen);
    },
    [isEditDialogOpen]
  );
  const userAvatar =
  user.avatar || 'https://source.unsplash.com/random/400x200';

  return (
    <div>
      <CssBaseline />
      {isEditDialogOpen && (
        <EditUserDialog
          isOpen={isEditDialogOpen}
          profileMode
          toggleDialog={() => setToggleEditDialog()}
          user={userFields}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid container justify='center'>
          <Grid item key={user.id} xs={12} sm={6} md={10}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={userAvatar}
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
                <Button size='small' onClick={handleEditUser}>
                  <EditIcon color='secondary' />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Profile;
