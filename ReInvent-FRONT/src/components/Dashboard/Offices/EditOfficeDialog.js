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
import { GET_ALL_OFFICES, UPDATE_OFFICE } from '../../../graphql/offices';
import { countryList } from '../../../utils/staticLists';

const EditOfficeDialog = ({ isOpen, toggleDialog, office }) => {
  const [editError, setEditError] = useState(false);
  const validateFields = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    cover: Yup.string(),
    country: Yup.string().nullable(),
    emails: Yup.array(Yup.object({
      owner: Yup.string().nullable(),
      email: Yup.string().email().nullable()
    }))
  });

  const onSubmit = async (fields, form, updateOffice) => {
    if (updateOffice) {
      try {
        const updateOfficeResponse = await updateOffice({
          variables: {
            input: {
              ...fields,
              emails: fields.emails.map(({ owner, email }) => ({ owner, email }))
            }
          },
          refetchQueries: [{ query: GET_ALL_OFFICES }]
        });
        const { data } = updateOfficeResponse;
        const hasData = data && data.updateOffice;
        const isEditOk = hasData && data.updateOffice.ok;
        const hasEditErrors =
          hasData && data.updateOffice.errors && data.updateOffice.errors.length > 0;

        if (hasEditErrors || !isEditOk) {
          return setEditError(true);
        }

        if (isEditOk) {
          return toggleDialog();
        }
      } catch (err) {
        return setEditError(true);
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
        <Mutation mutation={UPDATE_OFFICE}>
          {(updateOffice, { loading }) => (
            <Formik
              initialValues={office}
              validationSchema={validateFields}
              onSubmit={(fields, form) =>
                onSubmit(fields, form, updateOffice)
              }
              render={({
                errors,
                touched,
                handleSubmit,
                handleReset,
                values
              }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Typography variant='h3'>Edit office</Typography>
                    {editError && (
                      <Fade in={editError}>
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
                );
              }}
            />
          )}
        </Mutation>
      </DialogContent>
    </Dialog>
  );
};

export default EditOfficeDialog;
