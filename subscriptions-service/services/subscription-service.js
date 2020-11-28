const axios = require("axios");
const Subscription = require("../models/index")["Subscription"];
const ValidationError = require("../../errors/validation-error");
const AMQPService = require("./amqp-service");

// const AMQP_CONNECTION_STRING = process.env.AMQP_CONNECTION_STRING;
// const AMQP_CHANNEL_NAME = process.env.AMQP_CHANNEL_NAME;
// const AMQP_QUEUE_NAME = process.env.AMQP_QUEUE_NAME;

const AMQP_CONNECTION_STRING =
  "amqps://vqqammks:GNcqWHRHZviXYlOSbVQDN7OEoqbbSo-0@lionfish.rmq.cloudamqp.com/vqqammks";
const AMQP_CHANNEL_NAME = "PAYMENTS_GATEWAY";
const AMQP_QUEUE_NAME = "PAYMENT_QUEUE";


module.exports = class SubscriptionService {
  constructor() {
    this.amqpService = new AMQPService(
      AMQP_CONNECTION_STRING,
      AMQP_CHANNEL_NAME,
      AMQP_QUEUE_NAME
    );
  }
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

    await this.amqpService.init();

    subscription = await Subscription.create(subscription);

    return this.amqpService.send(JSON.stringify({ plan, subscription }));
  }

  async deleteOne(id) {
    return await Subscription.destroy({ where: { id } });
  }
};
