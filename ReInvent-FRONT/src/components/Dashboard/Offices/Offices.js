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
import { useOfficeStyles } from './office.styles';
import { GET_ALL_OFFICES, DELETE_OFFICE } from '../../../graphql/offices';
import ConfirmPopover from '../../common/ConfirmPopover/ConfirmPopover';
import { Mutation } from 'react-apollo';
import EditOfficeDialog from './EditOfficeDialog';
import CreateOfficeDialog from './CreateOfficeDialog';
import { useStoreState } from 'easy-peasy';

const Offices = () => {
  const classes = useOfficeStyles();
  const [isEditDialogOpen, setToggleEditDialog] = useState(false);
  const [isCreateDialogOpen, setToggleCreateDialog] = useState(false);
  const [office, setOffice] = useState({
    officeId: null,
    name: '',
    cover: '',
    country: '',
    emails: ''
  });
  const isAdmin = useStoreState(state => state.user.user.role === 'admin');
  const { data, error, loading } = useQuery(GET_ALL_OFFICES);

  const handleEditOffice = (officeId, name, cover, country, emails) => {
    setOffice({ officeId, name, cover, country, emails });
    setToggleEditDialog(prevState => !prevState);
  };

  const handleCreateOffice = () => {
    setToggleCreateDialog(prevState => !prevState);
  };

  if (loading || !data.allOffices) {
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
            Offices
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            You can browse through all our offices accross the world.
          </Typography>
          {isAdmin && (
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCreateOffice}
                  >
                  Create an office
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </div>
      {isAdmin && isEditDialogOpen && (
        <EditOfficeDialog
          isOpen={isEditDialogOpen}
          toggleDialog={() => setToggleEditDialog()}
          office={office}
        />
      )}
      {isAdmin && isCreateDialogOpen && (
        <CreateOfficeDialog
          isOpen={isCreateDialogOpen}
          toggleDialog={handleCreateOffice}
        />
      )}
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid container spacing={4}>
          {data.allOffices.offices.map(({ id, name, cover, country, emails }) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={cover}
                  title={name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h4' component='h3'>
                    {name} - { country }
                  </Typography>
                  {emails.map(({ email, owner }) => email && (
                    <Typography key={email}>
                      {owner && `${owner} -` } {email}
                    </Typography>
                  ))}
                </CardContent>
                {isAdmin && (
                  <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary'>
                      <SeeIcon color='primary' />
                    </Button>
                    <Button
                      size='small'
                      onClick={() => handleEditOffice(id, name, cover, country, emails)}
                    >
                      <EditIcon color='secondary' />
                    </Button>
                    <Mutation mutation={DELETE_OFFICE}>
                      {deleteOffice => (
                        <ConfirmPopover
                          confirmAction='Delete office'
                          onConfirmation={() =>
                            deleteOffice({
                              variables: {
                                officeId: id
                              },
                              refetchQueries: [{ query: GET_ALL_OFFICES }]
                            })
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

export default Offices;
