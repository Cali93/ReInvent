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
import { GET_ALL_ESTATES, DELETE_ESTATE } from '../../../graphql/estates';
import ConfirmPopover from '../../common/ConfirmPopover/ConfirmPopover';
import { Mutation } from 'react-apollo';
import EditEstateDialog from './EditEstateDialog';
import CreateEstateDialog from './CreateEstateDialog';

const Estates = () => {
  const classes = useEstateStyles();
  const [isEditDialogOpen, setToggleEditDialog] = useState(false);
  const [isCreateDialogOpen, setToggleCreateDialog] = useState(false);
  const [estate, setEstate] = useState({ estateId: null, name: '', cover: '' });
  const { data, error, loading } = useQuery(GET_ALL_ESTATES);

  const handleEditEstate = (estateId, name, cover) => {
    setEstate({ estateId, name, cover });
    setToggleEditDialog(prevState => !prevState);
  };

  const handleCreateEstate = () => {
    setToggleCreateDialog(prevState => !prevState);
  };

  if (loading || !data.allEstates) {
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
        </Container>
      </div>
      {isEditDialogOpen && (
        <EditEstateDialog
          isOpen={isEditDialogOpen}
          toggleDialog={() => setToggleEditDialog()}
          estate={estate}
        />
      )}
      {isCreateDialogOpen && (
        <CreateEstateDialog
          isOpen={isCreateDialogOpen}
          toggleDialog={handleCreateEstate}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='md'>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {data.allEstates.map(({ id, name, cover }) => (
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
                <CardActions className={classes.cardActions}>
                  <Button size='small' color='primary'>
                    <SeeIcon color='primary' />
                  </Button>
                  <Button
                    size='small'
                    onClick={() => handleEditEstate(id, name, cover)}
                  >
                    <EditIcon color='secondary' />
                  </Button>
                  <Mutation mutation={DELETE_ESTATE}>
                    {deleteEstate => (
                      <ConfirmPopover
                        confirmAction='Delete estate'
                        onConfirmation={() =>
                          deleteEstate({
                            variables: {
                              id
                            },
                            refetchQueries: [{ query: GET_ALL_ESTATES }]
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

export default Estates;
