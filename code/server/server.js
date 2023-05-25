const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express())
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

const { createChar } = require("./controller.js")

app.get("/api/createcharacter", createChar)

app.listen(4000, () => {
    console.log('up and running on port 4000')
})