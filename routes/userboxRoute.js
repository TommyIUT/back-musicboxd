const router = require("express").Router()
const pool = require('../config/db');

router.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query("select * from userbox;")
        return res.status(200).json(allUsers.rows)
    } catch (err) {
        console.log(err.message)
        return res.status(500).send("Erreur serveur")
    }
})

router.get("/id/:id", async (req, res ) => {
  try {
    const {id} = req.params;
    const user = await pool.query('SELECT * FROM userbox where identifiant = $1;', [id]);
    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
  }
})

router.get("/mail/:mail", async (req, res ) => {
  try {
    const {mail} = req.params
    const user = await pool.query('SELECT * FROM userbox where mail = $1;', [mail])
    return res.status(200).json(user.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({message: "Erreur serveur"})
  }
})

router.post("/", async (req, res) => {
    try {
      const { identifiant, pseudo, bio, pronoms, localisation, mail, photo, mot_de_passe, is_admin } = req.body;
      const newUser = await pool.query(
        "INSERT INTO userbox (identifiant, pseudo, bio, pronoms, localisation, mail, photo, mot_de_passe,is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ;",
        [identifiant, pseudo, bio, pronoms, localisation, mail, photo, mot_de_passe, is_admin]
      );
      res.status(201).json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { newpseudo, newbio, newpronoms, newloc, newphoto } = req.body;
      const updateUser = await pool.query(
        "UPDATE userbox SET pseudo = $2, bio = $3, pronoms = $4, localisation = $5, photo = $6 WHERE identifiant = $1 ;",
        [id, newpseudo, newbio, newpronoms, newloc, newphoto]
      );
      res.json(updateUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });


router.delete("/:id", async (req,res) => {
  try {
      const {id} = req.params
      const deleteUser = await pool.query("DELETE FROM userbox WHERE identifiant = $1",[id])
      res.json("User was deleted")
  } catch (err) {
      console.error(err.message)
  }
})

  

module.exports = router