const PaymentsService = require("./payment-service");

const AMQP_CONNECTION_STRING = process.env.AMQP_CONNECTION_STRING;
const AMQP_CHANNEL_NAME = process.env.AMQP_CHANNEL_NAME;
const AMQP_QUEUE_NAME = process.env.AMQP_QUEUE_NAME;

let service = new PaymentsService(
  AMQP_CONNECTION_STRING,
  AMQP_CHANNEL_NAME,
  AMQP_QUEUE_NAME
);
service.init();
