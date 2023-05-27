const router = require("express").Router()
const pool = require('../config/db');

router.get("/", async (req, res) => {
    try {
        const allActivite = await pool.query("select * from activite;")
        return res.status(200).json(allActivite.rows)
    } catch (err) {
        console.log(err.message)
        return res.status(500).send("Erreur serveur")
    }
})

router.get("/:id_user", async (req, res ) => {
  try {
    const {id_user} = req.params
    const activite = await pool.query('SELECT * FROM activite where id_user = $1 ORDER BY activite_date DESC;', [id_user])
    return res.status(200).json(activite.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Erreur serveur")
  }
})

router.post("/", async (req, res) => {
    try {
      const { id_user, activite_date, contenu } = req.body;
      const newActivite = await pool.query(
        "INSERT INTO activite (id_user, activite_date, contenu) VALUES ($1, $2, $3) RETURNING * ;",
        [id_user, activite_date, contenu]
      );
      res.status(201).json(newActivite.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

module.exports = router