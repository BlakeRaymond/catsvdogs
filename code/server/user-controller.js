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
        SELECT user_name, user_email, user_password, user_id FROM users WHERE '${email}' = user_email AND '${username}' = user_name;
        `).then((dbRes) => {
            auth(dbRes[0][0])
        })

        const auth = (data) => {
            if (!data) {
                res.status(200).send({success: false, message: 'Username/email does not exist.'})
                return
            } 

            isGood = bcrypt.compareSync(password, data.user_password)

            if (!isGood) {
                res.status(200).send({success: false, message: 'Username or password is incorrect. Please try again.'})
            } else {
                req.session.userID = data.user_id
                console.log(req.session)
                res.status(200).send({success: true, message: 'You said the right thing!', userID: data.user_id})
                
            }

        } 
    },
}