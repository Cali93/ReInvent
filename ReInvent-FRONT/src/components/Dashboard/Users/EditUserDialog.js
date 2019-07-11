import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogContent,
  Typography,
  Fade,
  Select,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';

import { TextFieldGroup } from '../../common/TextFieldGroup/TextFieldGroup';
import SubmitOrCancel from '../../common/SubmitOrCancel/SubmitOrCancel';
import { GET_ALL_USERS, UPDATE_USER } from '../../../graphql/users';
import { GET_ALL_OFFICES } from '../../../graphql/offices';
import { genders, roles } from '../../../utils/staticLists';

const EditUserDialog = ({ isOpen, toggleDialog, user }) => {
  const [editError, setEditError] = useState(false);

  const validateFields = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string(),
    role: Yup.string().required('Role is required'),
    officeId: Yup.number().required('Office ID is required'),
    avatar: Yup.string(),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required')
  });

  const onSubmit = async (fields, form, updateUser) => {
    if (updateUser) {
      try {
        const updateUserResponse = await updateUser({
          variables: {
            input: {
              ...fields
            }
          },
          refetchQueries: [{ query: GET_ALL_USERS }]
        });
        const { data } = updateUserResponse;
        const hasData = data && data.updateUser;
        const isEditOk = hasData && data.updateUser.ok;
        const hasEditErrors =
          hasData && data.updateUser.errors && data.updateUser.errors.length > 0;

        if (hasEditErrors || !isEditOk) {
          return setEditError(true);
        }

        if (isEditOk) {
          form.resetForm();
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
      aria-labelledby='edit-user-dialog'
    >
      <DialogContent>
        <Mutation mutation={UPDATE_USER}>
          {(updateUser, { loading }) => (
            <Formik
              initialValues={user}
              validationSchema={validateFields}
              onSubmit={(fields, form) => onSubmit(fields, form, updateUser)}
              render={({ errors, touched, handleSubmit, handleReset }) => (
                <Form onSubmit={handleSubmit}>
                  <Typography variant='h3'>Edit user</Typography>
                  {editError && (
                    <Fade in={editError}>
                      <Typography color='error'>
                        Something went wrong while updating this user :(
                      </Typography>
                    </Fade>
                  )}
                  <Field
                    name='firstName'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='firstName'
                        label='First Name'
                        placeholder='First Name'
                        required
                      />
                    )}
                  />
                  <Field
                    name='lastName'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='lastName'
                        label='Last Name'
                        placeholder='Last Name'
                        required
                      />
                    )}
                  />
                  <Field
                    name='email'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='email'
                        label='Email'
                        placeholder='Email'
                        required
                      />
                    )}
                  />
                  <Query query={GET_ALL_OFFICES}>
                    {({ data: officesData, error, loading }) => {
                      if (loading || !officesData.allOffices) {
                        return <div />;
                      }
                      if (error) {
                        return <div>Error...</div>;
                      }
                      return (
                        <Field
                          name='officeId'
                          render={({ field, form }) => (
                            <Select
                              {...field}
                              value={field.value || 0}
                              style={{ margin: '17px 0' }}
                              fullWidth
                              variant='outlined'
                              input={
                                <OutlinedInput
                                  name='officeId'
                                  placeholder='Office'
                                />
                              }
                            >
                              <MenuItem
                                key='select.office'
                                value={0}
                              >
                                <em>Select an office</em>
                              </MenuItem>
                              {officesData.allOffices.offices.map(office => (
                                <MenuItem key={office.id} value={office.id}>
                                  {office.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      );
                    }}
                  </Query>
                  <Field
                    name='role'
                    render={({ field, form }) => (
                      <Select
                        {...field}
                        value={field.value || 0}
                        fullWidth
                        style={{ margin: '17px 0' }}
                        variant='outlined'
                        input={
                          <OutlinedInput
                            name='role'
                            placeholder='Role'
                          />
                        }
                      >
                        <MenuItem
                          key='select.role'
                          value={0}
                          disabled
                        >
                          <em>Select a role</em>
                        </MenuItem>
                        {roles.map(role => (
                          <MenuItem key={role.value} value={role.value}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Field
                    name='gender'
                    render={({ field, form }) => (
                      <Select
                        {...field}
                        value={field.value || 0}
                        fullWidth
                        style={{ margin: '17px 0' }}
                        variant='outlined'
                        input={
                          <OutlinedInput
                            name='gender'
                            placeholder='Gender'
                          />
                        }
                      >
                        <MenuItem
                          key='select.gender'
                          value={0}
                        >
                          <em>Select a gender</em>
                        </MenuItem>
                        {genders.map(gender => (
                          <MenuItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Field
                    name='avatar'
                    render={({ field, form }) => (
                      <TextFieldGroup
                        {...field}
                        form={form}
                        name='avatar'
                        label='Avatar'
                        placeholder='Avatar'
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

export default EditUserDialog;
