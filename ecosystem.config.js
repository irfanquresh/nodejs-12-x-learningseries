const AMQP_CONNECTION_STRING =
  "amqps://vqqammks:GNcqWHRHZviXYlOSbVQDN7OEoqbbSo-0@lionfish.rmq.cloudamqp.com/vqqammks";
const AMQP_CHANNEL_NAME = "PAYMENTS_GATEWAY";
const AMQP_QUEUE_NAME = "PAYMENT_QUEUE";

module.exports = {
  apps: [
    {
      name: "plans-service",
      script: "./plans-service/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        MYSQL_USER: "root",
        MYSQL_PASS: "123456789",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: "6607",
        MYSQL_DB: "planDB",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "subscriptions-service",
      script: "./subscriptions-service/index.js",
      watch: true,
      env: {
        AMQP_CONNECTION_STRING: AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME: AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME: AMQP_QUEUE_NAME,
        NODE_ENV: "development",
        MYSQL_USER: "root",
        MYSQL_PASS: "123456789",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: "6606",
        MYSQL_DB: "subscriptionDB",
        PORT: 3002,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    // {
    //   name: "payments-service",
    //   script: "./payments-service/index.js",
    //   watch: true,
    //   env: {
    //     AMQP_CONNECTION_STRING,
    //     AMQP_CHANNEL_NAME,
    //     AMQP_QUEUE_NAME,
    //   },
    //   env_production: {},
    // },
  ],
};
