const Sequelize = require("sequelize");

Sequelize.define("user", {
  id:{
    type: Sequelize.UUIDV4,
    primaryKey: true
  },
  username:{
    type: Sequelize.STRING,
    unique: true
  }
})

db.run(
  "CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB \
  )"
);