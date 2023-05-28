charactersDb = require("./db-characters.json")



module.exports = {

    fightChar: (req, res) => {

        let comp = charactersDb[0]


        if (req.params.attack === ':player-melee') {
            let melee = Math.floor(Math.random() * (8 - 4) + 4)
            comp.HP -= melee
            res.status(200).send(comp)
        }

        if (req.params.attack === ':player-ranged') {
            let ranged = Math.floor(Math.random() * (13 - 0) + 0)
            comp.HP -= ranged
            res.status(200).send(comp)
        }

        if (req.params.attack === ':player-magic') {
            let magic = Math.floor(Math.random() * (20 - 0) + 0)
            comp.HP -= magic
            res.status(200).send(comp)
        }


    },

    compAtt: (req, res) => {

        let player = charactersDb[charactersDb.length - 1]


            if (req.params.attack === ':melee') {
                let melee = Math.floor(Math.random() * (8 - 4) + 4)
                player.HP -= melee
                res.status(200).send(player)
            }

            if (req.params.attack === ':ranged') {
                let ranged = Math.floor(Math.random() * (13 - 0) + 0)
                player.HP -= ranged
                res.status(200).send(player)
            }

            if (req.params.attack === ':magic') {
                let magic = Math.floor(Math.random() * (20 - 0) + 0)
                player.HP -= magic
                res.status(200).send(player)
            }
            
    }
}