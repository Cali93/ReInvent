import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Typography,
  CircularProgress,
  withStyles,
  Fade
} from '@material-ui/core';

import google from '../../assets/google.svg';
import { styles } from './auth.styles';
import { TextFieldGroup } from '../common/TextFieldGroup/TextFieldGroup';
import { LOGIN_USER } from '../../graphql/auth';
import { isEmptyObject } from '../../utils/helpers';
import { useStoreActions } from 'easy-peasy';

const Login = ({ classes, history }) => {
  const [authError, setAuthError] = useState(false);
  const setUser = useStoreActions(actions => actions.user.setUser);

  const validateFields = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  const onSubmit = async (fields, login) => {
    if (login) {
      try {
        const loginResponse = await login({
          variables: fields
        });
        const { data } = loginResponse;
        const hasData = data && data.login;
        const isLoginOk = hasData && data.login.ok;
        const hasLoginErrors =
          hasData && data.login.errors && data.login.errors.length > 0;

        if (hasLoginErrors || !isLoginOk) {
          return setAuthError(true);
        }

        if (isLoginOk && data.login.user.id) {
          const { __typename, ...userData } = data.login.user;
          setUser(userData);
          return history.push('/app/estates');
        }
      } catch (err) {
        return setAuthError(true);
      }
    }
  };

  return (
    <Mutation mutation={LOGIN_USER}>
      {(login, { loading }) => (
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validateFields}
          onSubmit={fields => onSubmit(fields, login)}
          render={({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Typography variant='h3' className={classes.tabContentTitle}>
                Access your account
              </Typography>
              <Button
                size='large'
                className={classes.googleButton}
                href={`${process.env.REACT_APP_API_URL}/auth/google`}
              >
                <img
                  src={google}
                  alt='google'
                  className={classes.googleIcon}
                />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>
                  or
                </Typography>
                <div className={classes.formDivider} />
              </div>
              {authError && (
                <Fade in={authError}>
                  <Typography
                    color='secondary'
                    className={classes.errorMessage}
                  >
                    Something is wrong with your credentials :(
                  </Typography>
                </Fade>
              )}
              <Field
                name='email'
                render={({ field, form }) => (
                  <TextFieldGroup
                    {...field}
                    form={form}
                    type='email'
                    label='Email'
                    placeholder='Email'
                    required
                  />
                )}
              />
              <Field
                name='password'
                render={({ field, form }) => (
                  <TextFieldGroup
                    {...field}
                    form={form}
                    type='password'
                    label='Password'
                    placeholder='Password'
                    required
                  />
                )}
              />
              <div className={classes.formButtons}>
                {loading ? (
                  <CircularProgress
                    size={26}
                    className={classes.loginLoader}
                  />
                ) : (
                  <Button
                    disabled={!isEmptyObject(errors)}
                    type='submit'
                    onClick={onSubmit}
                    variant='contained'
                    color='primary'
                    size='large'
                  >
                    Login
                  </Button>
                )}
                <Button
                  color='primary'
                  size='large'
                  className={classes.forgetButton}
                >
                  Forgot Password
                </Button>
              </div>
            </Form>
          )}
        />
      )}
    </Mutation>
  );
};

export default withRouter(withStyles(styles)(Login));
