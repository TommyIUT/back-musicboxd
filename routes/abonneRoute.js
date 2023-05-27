const router = require("express").Router()
const pool = require('../config/db');

router.get("/", async (req, res) => {
    try {
        const allAbonne = await pool.query("select * from abonne;")
        return res.status(200).json(allAbonne.rows)
    } catch (err) {
        console.log(err.message)
        return res.status(500).send("Erreur serveur")
    }
})

router.get("/:id_user/:id_artist", async (req, res ) => {
  try {
    const {id_user,id_artist} = req.params
    const abonne = await pool.query('SELECT * FROM abonne where id_user = $1 and id_artist = $2;', [id_user,id_artist])
    return res.status(200).json(abonne.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Erreur serveur")
  }
})

router.get("/:id_user", async (req, res ) => {
  try {
    const {id_user} = req.params
    const abonne = await pool.query('SELECT * FROM abonne where id_user = $1;', [id_user])
    return res.status(200).json(abonne.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Erreur serveur")
  }
})

router.post("/", async (req, res) => {
    try {
      const { id_user, id_artist, nom_artiste, photo_artiste } = req.body;
      const newAbonne = await pool.query(
        "INSERT INTO abonne (id_user, id_artist, nom_artiste, photo_artiste) VALUES ($1, $2, $3, $4) RETURNING * ;",
        [id_user, id_artist, nom_artiste, photo_artiste]
      );
      res.status(201).json(newAbonne.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

router.delete("/:id_user/:id_artist", async (req, res) => {
try {
  const { id_user,id_artist } = req.params;
  const deleteAbonne = await pool.query(
    "DELETE FROM abonne WHERE id_user = $1 AND id_artist = $2 RETURNING *;",
    [id_user,id_artist]
);
  res.status(201).json(deleteAbonne.rows[0]);
} catch (err) {
  console.error(err.message);
  res.status(500).json({ error: "Erreur serveur" });
}
});

module.exports = router