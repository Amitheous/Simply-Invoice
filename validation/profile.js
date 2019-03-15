const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.organizationName = !isEmpty(data.organizationName)
    ? data.organizationName
    : "";

  if (Validator.isEmpty(data.organizationName)) {
    errors.organizationName = "An organization name is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
