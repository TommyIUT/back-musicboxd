const router = require("express").Router()
const pool = require('../config/db');

router.get("/", async (req, res) => {
    try {
        const allReview = await pool.query("select * from review;")
        return res.status(200).json(allReview.rows)
    } catch (err) {
        console.log(err.message)
        return res.status(500).send("Erreur serveur")
    }
})

router.get("/:id_user/:id_album", async (req, res ) => {
  try {
    const {id_user,id_album} = req.params
    const review = await pool.query('SELECT * FROM review where id_user = $1 and id_album = $2;', [id_user,id_album])
    return res.status(200).json(review.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Erreur serveur")
  }
})

router.get("/:id_user", async (req, res ) => {
  try {
    const {id_user} = req.params
    const review = await pool.query('SELECT * FROM review where id_user = $1;', [id_user])
    return res.status(200).json(review.rows)
  } catch (err) {
    console.log(err.message)
    return res.status(500).send("Erreur serveur")
  }
})

router.post("/", async (req, res) => {
    try {
      const { id_user, id_album, nom_album, photo, note, texte } = req.body;
      const newReview = await pool.query(
        "INSERT INTO review (id_user, id_album, nom_album, photo, review_date, note, texte) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, $6) RETURNING * ;",
        [id_user, id_album,nom_album, photo, note, texte]
      );
      res.status(201).json(newReview.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  router.delete("/:id_user/:id_album", async (req, res) => {
    try {
      const { id_user,id_album } = req.params;
      const deleteReview = await pool.query(
        "DELETE FROM review WHERE id_user = $1 AND id_album = $2 RETURNING *;",
        [id_user,id_album]
      );
      res.status(201).json(deleteReview.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

router.put("/:id_user/:id_album", async (req, res) => {
  try {
    const { id_user,id_album } = req.params;
    const {review_date, note, texte} = req.body;
    const updateReview = await pool.query(
      "UPDATE review SET review_date = $3, note = $4, texte = $5 WHERE id_user = $1 and id_album = $2 ;",
      [id_user,id_album,review_date, note, texte]
    );
    res.json(updateReview.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router