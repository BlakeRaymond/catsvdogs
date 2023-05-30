const bcrypt = require('bcryptjs');

const SALTING_ROUNDS = 10

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

module. exports = {
    signUp: (req, res) => {

        const { email, password, username } = req.body     

        hashed = bcrypt.hashSync(password, SALTING_ROUNDS)

        sequelize.query(`
        INSERT INTO users (user_name, user_email, user_password)
        VALUES ('${username}', '${email}', '${hashed}')
        `)
        .then((dbRes) => console.log('You did it!'))

        res.status(200).send({success: true})
    },

    login: (req, res) => {

        const {email, username, password} = req.body

        sequelize.query (`
        SELECT (user_name, user_email, user_password, user-id) FROM users WHERE '${email}' = user_email;
        `).then((dbRes) => (console.log('You did it!', dbRes[0])))

    }
}