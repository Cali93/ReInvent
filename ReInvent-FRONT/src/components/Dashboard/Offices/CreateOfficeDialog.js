import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Mutation } from 'react-apollo';
import * as Yup from 'yup';
import {
  Dialog,
  DialogContent,
  Typography,
  Fade,
  Button,
  MenuItem,
  OutlinedInput,
  Select
} from '@material-ui/core';

import { TextFieldGroup } from '../../common/TextFieldGroup/TextFieldGroup';
import SubmitOrCancel from '../../common/SubmitOrCancel/SubmitOrCancel';
import { GET_ALL_OFFICES, CREATE_OFFICE } from '../../../graphql/offices';
import { countryList } from '../../../utils/staticLists';

const CreateOfficeDialog = ({ isOpen, toggleDialog }) => {
  const [createError, setCreateError] = useState(false);

  const validateFields = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    cover: Yup.string(),
    country: Yup.string(),
    emails: Yup.array(Yup.object({
      owner: Yup.string(),
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
      fullWidth
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
                emails: [{ owner: '', email: '' }]
              }}
              validationSchema={validateFields}
              onSubmit={(fields, form) =>
                onSubmit(fields, form, createOffice)
              }
              render={({
                errors,
                touched,
                handleSubmit,
                handleReset,
                values
              }) => (
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
                      <Select
                        {...field}
                        fullWidth
                        variant='outlined'
                        input={
                          <OutlinedInput
                            name='country'
                            placeholder='Country'
                          />
                        }
                      >
                        <MenuItem
                          key='select.country'
                          value='Select your country'
                        >
                          <em>Select your country</em>
                        </MenuItem>
                        {countryList.map(option => (
                          <MenuItem key={option.name} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FieldArray name='emails'>
                    {({ push, remove }) => (
                      <>
                        <Typography
                          variant='h6'
                          style={{ marginTop: '20px' }}
                        >
                          Office emails
                        </Typography>
                        {values.emails.map((email, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                flexDirection: 'row'
                              }}
                            >
                              <Field
                                name={`emails[${index}].owner`}
                                render={({ field, form }) => {
                                  return (
                                    <TextFieldGroup
                                      {...field}
                                      form={form}
                                      label='Owner'
                                      placeholder='Owner'
                                    />
                                  );
                                }}
                              />
                              <Field
                                name={`emails[${index}].email`}
                                render={({ field, form }) => (
                                  <TextFieldGroup
                                    {...field}
                                    form={form}
                                    label='Email'
                                    placeholder='Email'
                                  />
                                )}
                              />
                              <span
                                style={{ color: 'red' }}
                                onClick={() => remove(index)}
                              >
                                x
                              </span>
                            </div>
                          );
                        })}
                        <Button
                          type='button'
                          onClick={() => push({ owner: '', email: '' })}
                        >
                          Add new email
                        </Button>
                      </>
                    )}
                  </FieldArray>
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

export default CreateOfficeDialog;
