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
import { UPDATE_OFFICE, GET_ALL_OFFICES } from '../../../graphql/offices';

const EditOfficeDialog = ({ office, isOpen, toggleDialog }) => {
  const [updateError, setUpdateError] = useState(false);
  const validateFields = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    cover: Yup.string()
      .required('Cover is required')
  });

  const onSubmit = async (fields, updateOffice) => {
    if (updateOffice) {
      try {
        const updateOfficeResponse = await updateOffice({
          variables: {
            input: {
              ...fields,
              officeId: office.officeId
            }
          },
          refetchQueries: [{ query: GET_ALL_OFFICES }]
        });
        const { data } = updateOfficeResponse;
        const hasData = data && data.updateOffice;
        const isUpdateOk = hasData && data.updateOffice.ok;
        const hasUpdateErrors =
          hasData && data.updateOffice.errors && data.updateOffice.errors.length > 0;

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
        <Mutation mutation={UPDATE_OFFICE}>
          {(updateOffice, { loading }) => (
            <Formik
              initialValues={{
                name: office.name,
                cover: office.cover
              }}
              validationSchema={validateFields}
              onSubmit={fields => onSubmit(fields, updateOffice)}
              render={({ errors, touched, handleSubmit, handleReset }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography variant='h3'>
                    Edit office informations
                  </Typography>
                  {updateError && (
                    <Fade in={updateError}>
                      <Typography color='error'>
                        Something went wrong while updating this office :(
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

export default EditOfficeDialog;
