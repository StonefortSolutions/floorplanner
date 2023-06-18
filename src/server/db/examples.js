const conn = require("./conn");
const { UUID, UUIDV4, STRING } = conn.Sequelize;

const Example = conn.define("example", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  text: {
    type: STRING,
  },
});

module.exports = Example;
