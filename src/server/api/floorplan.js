const express = require("express")
const Floorplan = require("../db/floorplan")
const app = express.Router()

module.exports = app


app.get("/", async (req, res, next) => {
    try {
        const floorplan = await Floorplan.findAll()
        res.send(floorplan)
    } catch (error) {
        next(error)
    }
})

app.post("/", async (req, res, next) => {
    try {
        const floorplan = await Floorplan.create(req.body)
        res.send(floorplan)
    } catch (error) {
        next(error)
    }
})

app.delete("/:id", async (req, res, next) => {
    try {
        const floorplan = await Floorplan.findByPk(req.params.id)
        await floorplan.destroy()
        res.send(floorplan)
    } catch (error) {
        next(error)
    }
})



