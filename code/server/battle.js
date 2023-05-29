charactersDb = require("./db-characters.json")



module.exports = {

    fightChar: (req, res) => {

        let comp = charactersDb[0]


        if (req.params.attack === ':player-melee') {
            let melee = Math.floor(Math.random() * (8 - 4) + 4)
            comp.HP -= melee
            checkIfZero(comp.HP)
        }

        if (req.params.attack === ':player-ranged') {
            let ranged = Math.floor(Math.random() * (13 - 0) + 0)
            comp.HP -= ranged
            checkIfZero(comp.HP)
        }

        if (req.params.attack === ':player-magic') {
            let magic = Math.floor(Math.random() * (20 - 0) + 0)
            comp.HP -= magic
            checkIfZero(comp.HP)
        }

        // CHECK IF ZERO

        function checkIfZero(num) {
            if (num > 0) {
                res.status(200).send(comp)
            } else {
                res.status(200).send("You killed the computer! Press OK for another chance at GLORY!")
            }
        }

    },

    compAtt: (req, res) => {

        let player = charactersDb[charactersDb.length - 1]


            if (req.params.attack === ':melee') {
                let melee = Math.floor(Math.random() * (8 - 4) + 4)
                player.HP -= melee
                ifZero(player.HP)
            }

            if (req.params.attack === ':ranged') {
                let ranged = Math.floor(Math.random() * (13 - 0) + 0)
                player.HP -= ranged
                ifZero(player.HP)
            }

            if (req.params.attack === ':magic') {
                let magic = Math.floor(Math.random() * (20 - 0) + 0)
                player.HP -= magic
                ifZero(player.HP)
            }

            function ifZero(num) {
                if (num > 0) {
                    res.status(200).send(player)
                } else {
                    res.status(200).send("You have *died.* The computer has killed you with murder. Press OK for another duel with death. IF. YOU. DAAAAARE!")
                }
            }

    }
}