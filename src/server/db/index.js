const conn = require("./conn");
const Examples = require("./examples");
const Floorplan = require("./floorplan");

// const floorplans = [
//   {
//     name: "Bathroom Floorplan",
//   },
//   {
//     name: "Bedroom Floorplan",
//   },
//   {
//     name: "Kitchen Floorplan",
//   },
// ];

const seed = async () => {
  // const examples = Promise.all([
  //   Examples.create({ text: "foo" }),
  //   Examples.create({ text: "bar" }),
  // ])
  // const floorplan = await Promise.all(
  //   floorplans.map((floorplan) => {
  //     return Floorplan.create(floorplan);
  //   })
  // );
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await seed();
  console.log("DATABASE: Synced and Seeded");
};

module.exports = {
  syncAndSeed,
  Examples,
  Floorplan,
};
