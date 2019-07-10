import React from 'react';
import { TextField, FormHelperText, Fade } from '@material-ui/core';
import PropTypes from 'prop-types';

export const TextFieldGroup = ({
  id,
  label,
  placeholder,
  name,
  type,
  hasError,
  disabled,
  required,
  form,
  field,
  hidden,
  className,
  ...inputProps
}) => {
  const touched = form.touched[name];
  const error = form.errors[name];
  return (
    <>
      <TextField
        {...inputProps}
        id={id}
        name={name}
        label={label}
        className={className}
        placeholder={placeholder}
        margin='normal'
        type={type}
        hidden={hidden}
        error={error && touched}
        required={required}
        variant='outlined'
        fullWidth
      />
      <Fade in={error && touched}>
        <FormHelperText error>
          {error}
        </FormHelperText>
      </Fade>
    </>
  );
};

TextFieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};
