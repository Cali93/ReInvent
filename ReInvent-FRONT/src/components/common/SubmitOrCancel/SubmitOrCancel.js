import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { isEmptyObject } from '../../../utils/helpers';
import { useSubmitOrCancelStyles } from './submitOrCancel.styles';

const SubmitOrCancel = ({ onSubmit, errors, loading, resetForm }) => {
  const classes = useSubmitOrCancelStyles();
  return (
    <div className={classes.formButtons}>
      <Button variant='outlined' color='primary' size='large' className={classes.cancelButton} onClick={resetForm}>
        Cancel changes
      </Button>
      {loading ? (
        <CircularProgress size={26} className={classes.loader} />
      ) : (
        <Button
          disabled={!isEmptyObject(errors)}
          type='submit'
          onClick={onSubmit}
          variant='contained'
          color='primary'
          size='large'
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default SubmitOrCancel;
