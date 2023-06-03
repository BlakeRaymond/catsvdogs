require('dotenv').config()

const express = require("express")
const cors = require("cors")
const path = require("path")
const session = require("express-session")
const crypto = require("crypto")

const app = express()
// app.set('trust proxy', 1)

const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(cors())
app.use(express())
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    genid: function (req) {
        return crypto.randomUUID()
    },
    cookie: {
        httpOnly: true,
        secure: 'auto',
        maxAge: 60000,
    },
    rolling: true
}))

app.use(express.static(path.join(__dirname, "../public")))

const { createChar, keepChar, resetComp, seed, submitToDb, getFighters } = require("./controller.js")
const { fightChar, compAtt } = require("./battle.js")
const { signUp, login } = require("./user-controller.js")

//SEED ENDPOINT

// app.post('/seed', seed)

// MAIN ENDPOINTS


app.get("/api/createcharacter", createChar)
app.get("/api/reset", resetComp)
app.post("/api/db-submit", submitToDb)
app.post("/api/keepcharacter", keepChar)
app.put("/api/fightcharacter:attack", fightChar)
app.put("/api/compattack:attack", compAtt)

//USER ENDPOINTS

app.post("/api/signup", signUp)
app.post("/api/login", login)
app.get("/api/getfighters", getFighters)

app.listen(SERVER_PORT, () => {
    console.log(`up and running on port ${SERVER_PORT}`)
})