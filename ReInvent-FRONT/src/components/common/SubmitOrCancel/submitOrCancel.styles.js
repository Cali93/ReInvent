import { makeStyles } from '@material-ui/core';

export const useSubmitOrCancelStyles = makeStyles(theme => ({
  formButtons: {
    width: '100%',
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelButton: {
    textTransform: 'none',
    fontWeight: 400
  },
  login: {
    marginLeft: theme.spacing(4)
  }
}));
