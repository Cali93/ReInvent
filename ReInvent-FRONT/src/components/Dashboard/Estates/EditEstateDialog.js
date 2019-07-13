import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import {
  Dialog,
  DialogContent,
  Typography,
  Fade
} from '@material-ui/core';

import { TextFieldGroup } from '../../common/TextFieldGroup/TextFieldGroup';
import SubmitOrCancel from '../../common/SubmitOrCancel/SubmitOrCancel';
import { UPDATE_ESTATE, GET_ALL_ESTATES, GET_ALL_ESTATES_BY_OFFICE } from '../../../graphql/estates';
import { useStoreState } from 'easy-peasy';

const EditEstateDialog = ({ estate, isOpen, toggleDialog }) => {
  const [updateError, setUpdateError] = useState(false);
  const { role, officeId } = useStoreState(state => ({
    officeId: state.user.user.officeId,
    role: state.user.user.role
  }));
  const validateFields = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    cover: Yup.string()
      .required('Cover is required')
  });

  const onSubmit = async (fields, updateEstate) => {
    if (updateEstate) {
      try {
        const refetchQueriesByRole = role === 'admin' ? [
          { query: GET_ALL_ESTATES }
        ] : [
          { query: GET_ALL_ESTATES_BY_OFFICE, variables: { officeId } }
        ];
        const updateEstateResponse = await updateEstate({
          variables: {
            input: {
              ...fields,
              estateId: estate.estateId,
              officeId: estate.officeId
            }
          },
          refetchQueries: refetchQueriesByRole
        });
        const { data } = updateEstateResponse;
        const hasData = data && data.updateEstate;
        const isUpdateOk = hasData && data.updateEstate.ok;
        const hasUpdateErrors =
          hasData && data.updateEstate.errors && data.updateEstate.errors.length > 0;

        if (hasUpdateErrors || !isUpdateOk) {
          return setUpdateError(true);
        }

        if (isUpdateOk) {
          return toggleDialog();
        }
      } catch (err) {
        return setUpdateError(true);
      }
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleDialog()}
      aria-labelledby='form-dialog-title'
    >
      <DialogContent>
        <Mutation mutation={UPDATE_ESTATE}>
          {(updateEstate, { loading }) => (
            <Formik
              initialValues={{
                name: estate.name,
                cover: estate.cover
              }}
              validationSchema={validateFields}
              onSubmit={fields => onSubmit(fields, updateEstate)}
              render={({ errors, touched, handleSubmit, handleReset }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography variant='h3'>
                    Edit estate informations
                  </Typography>
                  {updateError && (
                    <Fade in={updateError}>
                      <Typography color='error'>
                        Something went wrong while updating this estate :(
                      </Typography>
                    </Fade>
                  )}
                  <Field
                    name='name'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='name'
                        label='Name'
                        placeholder='Name'
                        required
                      />
                    )}
                  />
                  <Field
                    name='cover'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='cover'
                        label='Cover'
                        placeholder='Cover'
                        required
                      />
                    )}
                  />
                  <SubmitOrCancel
                    onSubmit={onSubmit}
                    errors={errors}
                    loading={loading}
                    resetForm={() => {
                      handleReset();
                      return toggleDialog();
                    }}
                  />
                </Form>
              )}
            />
          )}
        </Mutation>
      </DialogContent>
    </Dialog>
  );
};

export default EditEstateDialog;
