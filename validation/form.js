const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateFormInput(data) {
  let errors = {};

  data.formType = !isEmpty(data.formType) ? data.formType : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.formNumber = !isEmpty(data.formNumber) ? data.formNumber : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.from.organizationName = !isEmpty(data.from.organizationName)
    ? data.from.organizationName
    : "";
  data.to.organizationName = !isEmpty(data.to.organizationName)
    ? data.to.organizationName
    : "";

  if (Validator.isEmpty(data.formType)) {
    errors.formType = "Form Type is Required";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(data.formNumber)) {
    errors.formNumber = "Form Number is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Form status is required";
  }
  if (Validator.isEmpty(data.from.organizationName)) {
    errors.from.organizationName = "From Name field is required";
  }
  if (Validator.isEmpty(data.to.organizationName)) {
    errors.to.organizationName = "To Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
