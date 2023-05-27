const router = require("express").Router()
const pool = require('../config/db');

router.get("/", async (req, res) => {
    try {
        const allListenlist = await pool.query("select * from listenlist;")
        return res.status(200).json(allListenlist.rows)
    } catch (err) {
        console.log(err.message)
        return res.status(500).send("Erreur serveur")
    }
})

router.get("/:id_user/:id_album", async (req, res ) => {
  try {
    const {id_user,id_album} = req.params
    const listenlist = await pool.query('SELECT * FROM listenlist where id_user = $1 and id_album = $2;', [id_user,id_album])
    return res.status(200).json(listenlist.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Erreur serveur")
  }
})

router.get("/:id_user", async (req, res ) => {
  try {
    const {id_user} = req.params
    const listenlist = await pool.query('SELECT * FROM listenlist where id_user = $1;', [id_user])
    return res.status(200).json(listenlist.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Erreur serveur")
  }
})

router.post("/", async (req, res) => {
    try {
      const { id_user, id_album,nom_album, photo } = req.body;
      const newListenlist = await pool.query(
        "INSERT INTO listenlist (id_user, id_album, nom_album, photo) VALUES ($1, $2, $3, $4) RETURNING * ;",
        [id_user, id_album,nom_album, photo]
      );
      res.status(201).json(newListenlist.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

router.delete("/:id_user/:id_album", async (req, res) => {
  try {
    const { id_user,id_album } = req.params;
    const deleteListenlist = await pool.query(
      "DELETE FROM listenlist WHERE id_user = $1 AND id_album = $2 RETURNING *;",
      [id_user,id_album]
    );
    res.status(201).json(deleteListenlist.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router