const { Model } = require("sequelize");
const Joi = require("joi");

("use strict");

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plan.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      type: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Plan",
    }
  );
  return Plan;
};

module.exports.PlanValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().allow(0).required(),
  type: Joi.string().valid("monthly", "yearly").required(),
  userId: Joi.number().positive().required(),
});
