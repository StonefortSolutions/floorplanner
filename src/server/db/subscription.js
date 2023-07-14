const conn = require("./conn");
const { STRING, BOOLEAN } = conn.Sequelize;

const Subscription = conn.define("subscription", {
  userId: {
    type: STRING,
  },
  subscriptionId: {
    type: STRING,
  },
});

module.exports = Subscription;
