import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { FormGroup, Input, FormFeedback } from "reactstrap";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <FormGroup>
      <Input
        type={type}
        className={classnames("form-control form-control-lg")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        invalid={error}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (
        <FormFeedback>
          <span className="text-dark badge-pill badge-warning errors">
            {error}
          </span>
        </FormFeedback>
      )}
    </FormGroup>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
