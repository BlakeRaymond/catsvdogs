require('dotenv')

const Sequelize = require('sequelize')
const { CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

let charId = 0

let charactersDb = require("./db-characters.json")

let nameDb = require("./db-names.json")
let homelandDb = require("./db-homelands.json")
let picDb = require("./db-pics.json")
let talentDb = require("./db-talents.json")

module.exports = {

    seed: (req, res) => {
        sequelize.query(`

        drop table if exists names;
drop table if exists homelands;
drop table if exists talents;

        CREATE TABLE names (
            name_id SERIAL PRIMARY KEY,
            name VARCHAR,
            picurl VARCHAR
        );

        CREATE TABLE homelands (
            homeland_id SERIAL PRIMARY KEY,
            homeland VARCHAR
        );

        CREATE TABLE talents (
            talent_id SERIAL PRIMARY KEY,
            talent VARCHAR
        );

        INSERT INTO names (name, picurl)
        VALUES
            ('lower-case fred', 'https://drive.google.com/uc?id=17tJO189IbJhzyTT9ZiU1AY2wA76fFopY'),
            ('Jollyhock Brzenskoff', 'https://drive.google.com/uc?id=1FmRmYylv2BzUfe5UNmnTKlIpM1VXXSr2'),
            ('Jane the Mute', 'https://drive.google.com/uc?id=1saCTSwmX4BGfmd4Kxn9P5YkZSTFnoGfU');

        INSERT INTO homelands (homeland)
        VALUES
            ('Narnia'),
            ('Mars'),
            ('Washington D.C.');

        INSERT INTO talents (talent)
            VALUES
            ('Acidey Spit'),
            ('Future Sight'),
            ('Gun Fists');
            `)
            .then(() => {
                console.log('DB Seeded!')
                res.status(200)
            })
            .catch((err) => console.log('error seeding database', err))
    },

    createChar: (req, res) => {

        sequelize.query(`
        SELECT COUNT (*) FROM names;
        `).then((dbRes) => {
            randomizer(dbRes[0][0])
        })

        const randomizer = (counts) => {
            let int1 = Math.floor(Math.random() * counts.count)+ 1;
            let int2 = Math.floor(Math.random() * counts.count)+ 1;
            let int3 = Math.floor(Math.random() * counts.count)+ 1;     
            
            sequelize.query(`
            SELECT name, picurl FROM names WHERE name_id = ${int1};
            SELECT homeland FROM homelands WHERE homeland_id = ${int2};
            SELECT talent FROM talents WHERE talent_id = ${int3}
            `).then(dbRes => buildChar(dbRes[0]))
        }

        const buildChar = (charArr) => {

            let randomName = charArr[0].name;            
            let randomHomeland = charArr[1].homeland;
            let randomPic = charArr[0].picurl;
            let randomTalent = charArr[2].talent;


            let potChar = {
                pic: randomPic,
                name: randomName,
                homeland: randomHomeland,
                talent: randomTalent,
    
            }
            res.status(200).send(potChar)
        }


    },

    keepChar: (req, res) => {

        let { pic, name, homeland, talent } = req.body

        let newChar = {
            Id: charId,
            pic,
            name,
            homeland,
            talent,
            HP: 100
        }
        charactersDb.push(newChar)
        res.status(200).send('Prepare for BATTLE!')
        charId++
    },

    resetComp: (req, res) => {

        charactersDb[0].HP = 100

        res.status(200)
    },

    submitToDb: (req, res) => {

        let { name, homeland, talent, pic } = req.body

        sequelize.query(`
        INSERT INTO names (name, picurl) VALUES ('${name}', '${pic}');
        INSERT INTO homelands (homeland) VALUES ('${homeland}');
        INSERT INTO talents (talent) VALUES ('${talent}');
        `)
        .then((dbRes) => {
            res.status(200)
        })
        .catch((err) => console.log(err))
    }
}