import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Grid, Divider, Button, Typography, CircularProgress, Fade, withStyles } from '@material-ui/core';
import cn from 'classnames';

// import { withRouter } from "react-router-dom";
// import logo from './logo.svg';
// import google from '../../../assets/images/google.svg';
import { styles } from './auth.styles';
import { TextFieldGroup } from '../common/TextFieldGroup';
import { CREATE_USER } from '../../graphql/auth';
import { isEmptyObject } from '../../utils/helpers';

export const Register = withStyles(styles)(({ classes }) => {
  const validateFields = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string(),
    avatar: Yup.string(),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  const onSubmit = async (fields, register) => {
    const registerResponse = await register({ variables: fields });
    console.log(registerResponse);
  };

  return (
    <Mutation mutation={CREATE_USER}>
      {(register, { loading }) => (
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            gender: '',
            avatar: '',
            email: '',
            password: ''
          }}
          validationSchema={validateFields}
          onSubmit={onSubmit}
          render={({
            values: { firstName, lastName, email, gender, password },
            errors,
            touched,
            status,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Typography variant='h3' className={classes.subGreeting}>
                Create your account
              </Typography>
              <Field name='firstName' render={({ field, form }) => (
                <TextFieldGroup
                  {...field}
                  form={form}
                  label='First Name'
                  placeholder='First Name'
                  required
                />
              )} />
              <Field name='lastName' render={({ field, form }) => (
                <TextFieldGroup
                  {...field}
                  form={form}
                  label='Last Name'
                  placeholder='Last Name'
                  required
                />
              )} />
              <Field name='gender' render={({ field, form }) => (
                <TextFieldGroup
                  {...field}
                  form={form}
                  label='Gender'
                  placeholder='Gender'
                  required
                />
              )} />
              <Field name='email' render={({ field, form }) => (
                <TextFieldGroup
                  {...field}
                  form={form}
                  type='email'
                  label='Email'
                  placeholder='Email'
                  required
                />
              )} />
              <Field name='password' render={({ field, form }) => (
                <TextFieldGroup
                  {...field}
                  form={form}
                  type='password'
                  label='Password'
                  placeholder='Password'
                  required
                />
              )} />
              <div className={classes.creatingButtonContainer}>
                {loading || isSubmitting ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    disabled={!isEmptyObject(errors)}
                    size='large'
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>
                  or
                </Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size='large'
                className={cn(
                  classes.googleButton,
                  classes.googleButtonCreating
                )}
              >
                {/* <img src={google} alt='google' className={classes.googleIcon} /> */}
                &nbsp;Sign in with Google
              </Button>
            </Form>
          )}
        />
      )}
    </Mutation>
  );
});
// class Register extends Component {
//   state = {
//     username: "",
//     usernameError: "",
//     email: "",
//     emailError: "",
//     password: "",
//     passwordError: ""
//   };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   render() {
//     const {
//       username,
//       email,
//       password,
//       usernameError,
//       emailError,
//       passwordError
//     } = this.state;
//     const { classes } = this.props;
//     const errorList = [];

//     if (usernameError) {
//       errorList.push(usernameError);
//     }
//     if (emailError) {
//       errorList.push(emailError);
//     }
//     if (passwordError) {
//       errorList.push(passwordError);
//     }

//     return (
//       <Mutation mutation={register}>
//         {(register, { error, loading, data }) => (
//           <form
//             noValidate
//             onSubmit={async e => {
//               e.preventDefault();

//               const { username, email, password } = this.state;

//               this.setState({
//                 authenticateError: ""
//               });

//               const res = await register({
//                 variables: { username, email, password }
//               });

//               const { ok, errors } = res.data.register;

//               if (ok) {
//                 return this.props.handleTabChange(e, 0);
//               } else {
//                 const err = {};
//                 errors.forEach(({ path, message }) => {
//                   err[`${path}Error`] = message;
//                 });
//                 console.log(err)
//                 this.setState(err);
//               }

//             }}
//           >
//             <Typography variant='h3' className={classes.subGreeting}>
//               Create your account
//               </Typography>
//             <Fade in={!!usernameError || !!emailError || !!passwordError}>
//               <Typography color='secondary' className={classes.errorMessage}>
//                 Something is wrong with your registration :(
//                 </Typography>
//             </Fade>
//             <TextFieldGroup
//               name="username"
//               error={usernameError}
//               onChange={this.handleChange}
//               value={username}
//               label="Username"
//               type="username"
//               fullWidth
//               placeholder="Username"
//             />
//             <TextFieldGroup
//               name="email"
//               error={emailError}
//               onChange={this.handleChange}
//               value={email}
//               label="Email"
//               type="email"
//               fullWidth
//               placeholder="Email"
//             />
//             <TextFieldGroup
//               error={passwordError}
//               name="password"
//               onChange={this.handleChange}
//               value={password}
//               type="password"
//               fullWidth
//               label="Password"
//               placeholder="Password"
//             />
//             <div className={classes.creatingButtonContainer}>
//               {loading ? (
//                   <CircularProgress size={26} />
//                 ) : (
//               <Button
//                 disabled={
//                   username.length === 0 ||
//                     email.length === 0 ||
//                     password.length === 0
//                 }
//                 size='large'
//                 type='submit'
//                 variant='contained'
//                 color='primary'
//                 className={classes.createAccountButton}
//               >
//                 Create your account
//                 </Button>
//              )}
//             </div>
//             <div className={classes.formDividerContainer}>
//               <div className={classes.formDivider} />
//               <Typography className={classes.formDividerWord}>or</Typography>
//               <div className={classes.formDivider} />
//             </div>
//             <Button
//               size='large'
//               className={cn(
//                 classes.googleButton,
//                 classes.googleButtonCreating
//               )}
//             >
//               {/* <img src={google} alt='google' className={classes.googleIcon} /> */}
//               &nbsp;Sign in with Google
//               </Button>
//           </form>
//         )}
//       </Mutation>
//     );
//   }
// }

// export default withStyles(styles)(Register);
