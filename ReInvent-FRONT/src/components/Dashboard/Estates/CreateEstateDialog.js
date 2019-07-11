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
import { GET_ALL_ESTATES, CREATE_ESTATE, GET_ALL_ESTATES_BY_OFFICE } from '../../../graphql/estates';
import { useStoreState } from 'easy-peasy';

const CreateEstateDialog = ({ isOpen, toggleDialog }) => {
  const [createError, setCreateError] = useState(false);
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

  const onSubmit = async (fields, form, createEstate) => {
    if (createEstate) {
      try {
        const refetchQueriesByRole = role === 'admin' ? [
          { query: GET_ALL_ESTATES }
        ] : [
          { query: GET_ALL_ESTATES_BY_OFFICE, variables: { officeId } }
        ];
        const createEstateResponse = await createEstate({
          variables: {
            input: {
              ...fields,
              officeId
            }
          },
          refetchQueries: refetchQueriesByRole
        });
        const { data } = createEstateResponse;
        const hasData = data && data.createEstate;
        const isCreateOk = hasData && data.createEstate.ok;
        const hasCreateErrors =
          hasData && data.createEstate.errors && data.createEstate.errors.length > 0;

        if (hasCreateErrors || !isCreateOk) {
          return setCreateError(true);
        }

        if (isCreateOk) {
          form.resetForm();
          return true;
        }
      } catch (err) {
        return setCreateError(true);
      }
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={toggleDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogContent>
        <Mutation mutation={CREATE_ESTATE}>
          {(createEstate, { loading }) => (
            <Formik
              initialValues={{
                name: '',
                cover: ''
              }}
              validationSchema={validateFields}
              onSubmit={(fields, form) => onSubmit(fields, form, createEstate)}
              render={({ errors, touched, handleSubmit, handleReset }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography variant='h3'>Create estate</Typography>
                  {createError && (
                    <Fade in={createError}>
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
                      return handleReset();
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

export default CreateEstateDialog;
