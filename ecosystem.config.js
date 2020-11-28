const AMQP_CONNECTION_STRING =
  "amqps://vqqammks:gLG338CuhNmvfSmfpZC7LH3oCxtdHZzg@lionfish.rmq.cloudamqp.com/vqqammks";
const AMQP_CHANNEL_NAME = "PAYMENTS_GATEWAY";
const AMQP_QUEUE_NAME = "PAYMENT_QUEUE";

const TOKEN_ISSUER = "saas";
const AUTH_SECRET = "kbsyfg7jhAJLVLIakdudfq676fjavSc";

module.exports = {
  apps: [
    {
      name: "authentication-service",
      script: "./auth-service/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        MYSQL_USER: "root",
        MYSQL_PASS: "123456789",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: "6608",
        MYSQL_DB: "userDB",
        PORT: 3000,
        TOKEN_ISSUER,
        AUTH_SECRET,
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
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
        TOKEN_ISSUER,
        AUTH_SECRET,
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME,
      },
      env_production: {},
    },
    {
      name: "subscriptions-service",
      script: "./subscriptions-service/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        MYSQL_USER: "root",
        MYSQL_PASS: "123456789",
        MYSQL_HOST: "localhost",
        MYSQL_PORT: "6606",
        MYSQL_DB: "subscriptionDB",
        PORT: 3002,
        TOKEN_ISSUER,
        AUTH_SECRET,
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME,
      },
      env_production: {},
    },
    {
      name: "payments-service",
      script: "./payments-service/index.js",
      watch: true,
      env: {
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME,
      },
      env_production: {},
    },
  ],
};
