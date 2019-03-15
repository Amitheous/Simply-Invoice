const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateClientInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "A name is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
