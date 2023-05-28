const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

const { createChar, keepChar, resetComp } = require("./controller.js")
const { fightChar, compAtt } = require("./battle.js")

app.get("/api/createcharacter", createChar)
app.get("/api/reset", resetComp)
app.post("/api/keepcharacter", keepChar)
app.put("/api/fightcharacter:attack", fightChar)
app.put("/api/compattack:attack", compAtt)


app.listen(4000, () => {
    console.log('up and running on port 4000')
})