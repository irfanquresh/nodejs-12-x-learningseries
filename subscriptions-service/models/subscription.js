"use strict";

const Joi = require("joi");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscription.init(
    {
      planId: DataTypes.INTEGER,
      coupan: DataTypes.STRING,
      cardNumber: DataTypes.STRING,
      holderName: DataTypes.STRING,
      expirationDate: DataTypes.STRING,
      cvv: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Subscription",
    }
  );
  return Subscription;
};

module.exports.SubscriptionValidationSchema = Joi.object({
  planId: Joi.number().positive().required(),
  coupan: Joi.number().min(0).max(100).optional().allow(null),
  cardNumber: Joi.string().creditCard().required(),
  holderName: Joi.string().alphanum().required(),
  expirationDate: Joi.string().required(),
  cvv: Joi.string().min(3).max(3).required(),
});
