const conn = require("./conn");
const { UUID, UUIDV4, STRING, JSONB, BOOLEAN, TEXT } = conn.Sequelize;

const Floorplan = conn.define("floorplan", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  scene: {
    type: JSONB,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  userId: {
    type: STRING,
  },
  isPublic: {
    type: BOOLEAN,
    defaultValue: false,
  },
  previewImage: {
    type: TEXT,
  },
  isTemplate: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Floorplan;
