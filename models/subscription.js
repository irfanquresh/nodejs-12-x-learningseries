const Joi = require("joi");

module.exports.SubscriptionValidationSchema = Joi.object({
  planId: Joi.number().positive().required(),
  coupan: Joi.number().min(0).max(100).optional().allow(null),
  cardNumber: Joi.string().creditCard().required(),
  holderName: Joi.string().alphanum().required(),
  expirationDate: Joi.string().required(),
  cvv: Joi.string().min(3).max(3).required(),
});
