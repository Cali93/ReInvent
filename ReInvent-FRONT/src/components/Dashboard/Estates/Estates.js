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
import { useEstateStyles } from './estate.styles';
import { GET_ALL_ESTATES, DELETE_ESTATE, GET_ALL_ESTATES_BY_OFFICE } from '../../../graphql/estates';
import ConfirmPopover from '../../common/ConfirmPopover/ConfirmPopover';
import { Mutation } from 'react-apollo';
import EditEstateDialog from './EditEstateDialog';
import CreateEstateDialog from './CreateEstateDialog';
import { useStoreState } from 'easy-peasy';

const Estates = () => {
  const classes = useEstateStyles();
  const [isEditDialogOpen, setToggleEditDialog] = useState(false);
  const [isCreateDialogOpen, setToggleCreateDialog] = useState(false);
  const [estate, setEstate] = useState({ estateId: null, name: '', cover: '', officeId: null });
  const { role, officeId } = useStoreState(state => ({
    role: state.user.user.role,
    officeId: state.user.user.officeId
  }));
  const isAdmin = role === 'admin';
  const isNotBasicUser = role !== 'user';
  const query = isAdmin ? GET_ALL_ESTATES : GET_ALL_ESTATES_BY_OFFICE;
  const queryOptions = isAdmin ? {} : {
    variables: {
      officeId
    }
  };
  const { data, error, loading } = useQuery(query, queryOptions);
  const estates = data.allEstates || data.allEstatesByOfficeId;

  const handleEditEstate = (estateId, name, cover, estateOfficeId) => {
    setEstate({ estateId, name, cover, officeId: estateOfficeId });
    setToggleEditDialog(prevState => !prevState);
  };

  const handleCreateEstate = () => {
    setToggleCreateDialog(prevState => !prevState);
  };

  if (loading) {
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
            Estates
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            You can browse through all the properties that have been carefully
            selected to match the need of our customers.
          </Typography>
          {isNotBasicUser && (
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCreateEstate}
                  >
                    Create an estate
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </div>
      {isNotBasicUser && isEditDialogOpen && (
        <EditEstateDialog
          isOpen={isEditDialogOpen}
          toggleDialog={() => setToggleEditDialog()}
          estate={estate}
        />
      )}
      {isNotBasicUser && isCreateDialogOpen && (
        <CreateEstateDialog
          isOpen={isCreateDialogOpen}
          toggleDialog={handleCreateEstate}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid container spacing={4}>
          {estates.map(({ id, name, cover, officeId: estateOfficeId }) => (
            <Grid item key={id} xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={cover}
                  title={name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {name}
                  </Typography>
                  <Typography>
                    A beautiful house that has everything you would expect
                    from a cosy home.
                  </Typography>
                </CardContent>
                {isNotBasicUser && (
                  <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary'>
                      <SeeIcon color='primary' />
                    </Button>
                    <Button
                      size='small'
                      onClick={() => handleEditEstate(id, name, cover, estateOfficeId)}
                    >
                      <EditIcon color='secondary' />
                    </Button>
                    <Mutation mutation={DELETE_ESTATE}>
                      {deleteEstate => (
                        <ConfirmPopover
                          confirmAction='Delete estate'
                          onConfirmation={() => {
                            const refetchQueriesByRole = role === 'admin' ? [
                              { query: GET_ALL_ESTATES }
                            ] : [
                              { query: GET_ALL_ESTATES_BY_OFFICE, variables: { officeId } }
                            ];
                            return deleteEstate({
                              variables: {
                                id
                              },
                              refetchQueries: refetchQueriesByRole
                            });
                          }
                          }
                        >
                          <DeleteIcon color='error' />
                        </ConfirmPopover>
                      )}
                    </Mutation>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Estates;
