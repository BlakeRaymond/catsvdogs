charactersDb = require("./db-characters.json")

module.exports = {
    fightChar: (req, res) => {
        
        // console.log('You made it this far!!!', req.params.attack)

        //I need to figure out the math. Let it be melee(4-7), ranged(0-12), magic(-10-40) picking a random number in the range, subtracting it from currHealth, setting currHealth, and return currHealth

        let playerHealth = charactersDb[charactersDb.length-1].HP
        let compHealth = charactersDb[0].HP

        let melee = Math.floor(Math.random() * (8 - 4) + 4)
        let ranged = Math.floor(Math.random() * (13 - 0) + 0)
        let magic = Math.floor(Math.random() * (20 - 0) + 0)

        console.log(melee, ranged, magic)

        if (req.params.attack === ':player-melee') {
            // console.log('You can totally do math here!')
        }

        if (req.params.attack === ':player-ranged') {
            // console.log('You can totally do math here!')
        }

        if (req.params.attack === ':player-magic') {
            // console.log('You can totally do math here!')
        }

        // console.log(playerHealth, compHealth)
    },
}