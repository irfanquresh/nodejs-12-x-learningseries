const axios = require("axios");
const Subscription = require("../models/index")["Subscription"];
const ValidationError = require("../../errors/validation-error");

module.exports = class SubscriptionService {
  async findAll(userId) {
    return await Subscription.findAll({ where: { userId } });
  }

  async findOne(id) {
    return await Subscription.findOne({ where: { id } });
  }

  async create(subscription) {
    let respone = await axios.default.get(
      `http://localhost:3001/${subscription.planId}`
    );
    let plan = respone.data;
    if (!plan) {
      throw new ValidationError("Given plan is invalid");
    }
    return await Subscription.create(subscription);
  }

  async deleteOne(id) {
    return await Subscription.destroy({ where: { id } });
  }
};
