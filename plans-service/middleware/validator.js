const Joi = require("joi");
const Plan = require("../models/plan");
const ValidationError = require("../../errors/validation-error");

("use strict");

let validators = {
  Plan: Plan.PlanValidationSchema,
};

function scopeExsit(validator, scope) {
  return Object.keys(validator.scopes).find((key) => key == scope) != undefined;
}

function getSchema(model, scope) {
  let validator = validators[model];
  if (!validator) {
    throw new Error("Validator does not exist");
  }
  if (validator.scopes) {
    if (scope) {
      if (!scopeExsit(validator, scope)) {
        throw new Error(`Scope ${scope} does not exists in ${model} validator`);
      } else {
        return validator.scopes[scope];
      }
    } else {
      return validator.scopes.default;
    }
  } else {
    return validator;
  }
}

function validate(model, object, scope) {
  const schema = getSchema(model, scope);
  return schema.validate(object);
}

// actual middleware factory
module.exports = function ValidationMiddleware(model, scope) {
  return (req, res, next) => {
    const validationResult = validate(model, req.body, scope);
    if (validationResult.error) {
      throw new ValidationError(
        validationResult.error.details[0].message,
        model
      );
    } else {
      next();
    }
  };
};
