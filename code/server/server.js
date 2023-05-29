require('dotenv').config()

const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
const { SERVER_PORT } = process.env

app.use(cors())
app.use(express())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

const { createChar, keepChar, resetComp, seed, submitToDb } = require("./controller.js")
const { fightChar, compAtt } = require("./battle.js")

//SEED ENDPOINT

// app.post('/seed', seed)

// MAIN ENDPOINTS

app.get("/api/createcharacter", createChar)
app.get("/api/reset", resetComp)
app.post("/api/db-submit", submitToDb)
app.post("/api/keepcharacter", keepChar)
app.put("/api/fightcharacter:attack", fightChar)
app.put("/api/compattack:attack", compAtt)



app.listen(SERVER_PORT, () => {
    console.log(`up and running on port ${SERVER_PORT}`)
})