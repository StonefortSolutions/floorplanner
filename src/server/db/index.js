const conn = require("./conn")
const syncAndSeed = async () => {
    await conn.sync({ force: true })
    console.log("DATABASE: Synced and Seeded")
}
module.exports = {
    syncAndSeed
}
