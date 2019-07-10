import React, { Component } from "react";
import { Grid, Divider, Button, Typography, CircularProgress, Fade, withStyles } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link, withRouter } from "react-router-dom";
import { TextFieldGroup } from "../common/TextFieldGroup";
// import logo from './logo.svg';
import google from '../../assets/google.svg';
import { styles } from './auth.styles';

const login = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
  }
`;


// import React from 'react';

// export const Login = () => {
//   return (
//     <Formik
//       initialValues={{
//           firstName: '',
//           lastName: '',
//           gender: '',
//           avatar: '',
//           email: '',
//           password: '',
//           confirmPassword: ''
//       }}
//       validationSchema={Yup.object().shape({
//           firstName: Yup.string()
//               .required('First Name is required'),
//           lastName: Yup.string()
//               .required('Last Name is required'),
//           email: Yup.string()
//               .email('Email is invalid')
//               .required('Email is required'),
//           password: Yup.string()
//               .min(6, 'Password must be at least 6 characters')
//               .required('Password is required'),
//           confirmPassword:  Yup.string()
//               .oneOf([Yup.ref('password'), null], 'Passwords must match')
//               .required('Confirm Password is required')
//       })}
//       onSubmit={fields => {
//           alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
//       }}
//       render={({ errors, status, touched }) => (
//           <Form>
//               <div className="form-group">
//                   <label htmlFor="firstName">First Name</label>
//                   <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
//                   <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
//               </div>
//               <div className="form-group">
//                   <label htmlFor="lastName">Last Name</label>
//                   <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
//                   <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
//               </div>
//               <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
//                   <ErrorMessage name="email" component="div" className="invalid-feedback" />
//               </div>
//               <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
//                   <ErrorMessage name="password" component="div" className="invalid-feedback" />
//               </div>
//               <div className="form-group">
//                   <label htmlFor="confirmPassword">Confirm Password</label>
//                   <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
//                   <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
//               </div>
//               <div className="form-group">
//                   <button type="submit" className="btn btn-primary mr-2">Register</button>
//                   <button type="reset" className="btn btn-secondary">Reset</button>
//               </div>
//           </Form>
//       )}
//   />
//   )
// }


class Login extends Component {
  state = {
    email: '',
    password: '',
    authenticateError: ''
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    const { email, password, authenticateError } = this.state;
    const { classes } = this.props;

    const errorList = [];

    if (authenticateError) {
      errorList.push(authenticateError);
    }

    return (
      <Mutation mutation={login}>
        {(login, { error, loading, data }) => (
          <form
          noValidate
          onSubmit={async e => {
            e.preventDefault();
        
            const { email, password } = this.state;
        
            this.setState({
              authenticateError: ""
            });
        
            const res = await login({
              variables: { email, password },
              refetchQueries: [`getUser`]
            });
        
            const { ok, errors } = res.data.login;
        
            if (ok) {
              // return this.props.history.push("/");
            } else {
              const err = {};
              errors.forEach(({ path, message }) => {
                err[`${path}Error`] = message;
              });
              console.log(err)
              this.setState(err);
            }
        
          }}
        >
          <Typography variant='h3' className={classes.subGreeting}>
            Access your account
          </Typography>
          <Button size='large' className={classes.googleButton} href='http://localhost:5000/auth/google'>
            <img src={google} alt='google' className={classes.googleIcon} />
            &nbsp;Sign in with Google
          </Button>
          <div className={classes.formDividerContainer}>
            <div className={classes.formDivider} />
            <Typography className={classes.formDividerWord}>or</Typography>
            <div className={classes.formDivider} />
          </div>
          <Fade in={!!authenticateError}>
            <Typography color='secondary' className={classes.errorMessage}>
              Something is wrong with your login or password :(
            </Typography>
          </Fade>
          {/* <TextFieldGroup
            name="email"
            error={authenticateError}
            onChange={this.handleChange}
            value={email}
            label="Email"
            type="email"
            fullWidth
            placeholder="Email"
          />
          <TextFieldGroup
            error={authenticateError}
            name="password"
            onChange={this.handleChange}
            value={password}
            type="password"
            fullWidth
            label="Password"
            placeholder="Password"
          /> */}
          <div className={classes.formButtons}>
            {loading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
            <Button
              disabled={
                email.length === 0 ||
                password.length === 0
              }
              type="submit"
              onClick={this.onSubmit}
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
        </form>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(Login);
