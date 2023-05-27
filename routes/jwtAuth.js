const router = require("express").Router()
const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../util/jwtGenerator")
const validInfo = require("../middleware/validinfo")
const authorization = require("../middleware/autorisation")

//registering

router.post("/register",validInfo, async (req,res )=> {
    try {
        const {email, hashedPassword, identifiant} = req.body

        const newUser = await pool.query("INSERT INTO userbox (identifiant, pseudo, bio, pronoms, localisation, mail, photo, mot_de_passe, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",[identifiant,identifiant,"","","", email,"https://cdn.discordapp.com/attachments/622842513652449280/1106992345741795469/image.png", hashedPassword, false])

        const token = jwtGenerator(newUser.rows[0].identifiant)
        res.json({token})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

//login route

router.post("/login", validInfo, async (req,res) => {
    try {
        
        const {mail, password} = req.body
        const user = await pool.query("SELECT * FROM userbox WHERE mail = $1",[mail])
        const validPassword = (password === user.rows[0].mot_de_passe)

        if (!validPassword) {
            return res.json({valid: false})
        }

        const token = await jwtGenerator(user.rows[0].identifiant)
        res.json({token, valid:true})

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.get("/verify", authorization, async (req,res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

module.exports = router