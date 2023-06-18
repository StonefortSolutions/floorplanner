const conn = require("./conn");
const Examples = require("./examples");

const seed = async () => {
  return Promise.all([
    Examples.create({ text: "foo" }),
    Examples.create({ text: "bar" }),
  ]);
};
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await seed();
  console.log("DATABASE: Synced and Seeded");
};

module.exports = {
  syncAndSeed,
  Examples,
};
