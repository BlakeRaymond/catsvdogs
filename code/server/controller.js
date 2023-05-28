let charId = 0

let charactersDb = require("./db-characters.json")

let nameDb = require("./db-names.json")
let homelandDb = require("./db-homelands.json")
let picDb = require("./db-pics.json")
let talentDb = require("./db-talents.json")

module.exports = {
    createChar: (req, res) => {

        let nameIndex = Math.floor(Math.random() * nameDb.length);
        let homelandIndex = Math.floor(Math.random() * homelandDb.length);
        let picIndex = Math.floor(Math.random() * picDb.length);
        let talentIndex = Math.floor(Math.random() * talentDb.length);
        
        let randomName = nameDb[nameIndex];
        let randomHomeland = homelandDb[homelandIndex];
        let randomPic = picDb[picIndex];
        let randomTalent = talentDb[talentIndex];

        let potChar = {
            pic: randomPic,
            name: randomName,
            homeland: randomHomeland,
            talent: randomTalent,
            HP: 100
        }
        // console.log(potChar)
        res.status(200).send(potChar)
    },

    keepChar: (req, res) => {
        
        let { pic, name, homeland, talent } = req.body
        
        let newChar = {
            Id : charId,
            pic,
            name,
            homeland,
            talent,
            HP: 100
        }
        charactersDb.push(newChar)
        res.status(200).send('Prepare for BATTLE!')
        charId++
        console.log(charactersDb[charactersDb.length -1])
    }
}