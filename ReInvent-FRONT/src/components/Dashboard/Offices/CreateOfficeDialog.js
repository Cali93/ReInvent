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
import { GET_ALL_OFFICES, CREATE_OFFICE } from '../../../graphql/offices';

const CreateOfficeDialog = ({ isOpen, toggleDialog }) => {
  const [createError, setCreateError] = useState(false);

  const validateFields = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    cover: Yup.string()
      .required('Cover is required'),
    country: Yup.string()
      .required('Cover is required'),
    emails: Yup.array(Yup.object({
      user: Yup.number(),
      email: Yup.string().email()
    }))
  });

  const onSubmit = async (fields, form, createOffice) => {
    if (createOffice) {
      try {
        const createOfficeResponse = await createOffice({
          variables: {
            input: {
              ...fields
            }
          },
          refetchQueries: [{ query: GET_ALL_OFFICES }]
        });
        const { data } = createOfficeResponse;
        const hasData = data && data.createOffice;
        const isCreateOk = hasData && data.createOffice.ok;
        const hasCreateErrors =
          hasData && data.createOffice.errors && data.createOffice.errors.length > 0;

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
        <Mutation mutation={CREATE_OFFICE}>
          {(createOffice, { loading }) => (
            <Formik
              initialValues={{
                name: '',
                cover: '',
                country: '',
                emails: []
              }}
              validationSchema={validateFields}
              onSubmit={(fields, form) => onSubmit(fields, form, createOffice)}
              render={({ errors, touched, handleSubmit, handleReset }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography variant='h3'>Create office</Typography>
                  {createError && (
                    <Fade in={createError}>
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
                  <Field
                    name='country'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='country'
                        label='Country'
                        placeholder='Country'
                        required
                      />
                    )}
                  />
                  <Field
                    name='emails'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='emails'
                        label='Emails'
                        placeholder='Emails'
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
        ;
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfficeDialog;
