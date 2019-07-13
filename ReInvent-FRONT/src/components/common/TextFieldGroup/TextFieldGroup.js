import React from 'react';
import { TextField, FormHelperText, Fade } from '@material-ui/core';
import PropTypes from 'prop-types';

export const TextFieldGroup = ({
  id,
  label,
  placeholder,
  name,
  type,
  disabled,
  required,
  form,
  field,
  hidden,
  className,
  value,
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
        value={value || ''}
        label={label}
        className={className}
        placeholder={placeholder}
        margin='normal'
        disabled={disabled}
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
  form: PropTypes.object,
  field: PropTypes.object,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool
};

TextFieldGroup.defaultProps = {
  type: 'text'
};
