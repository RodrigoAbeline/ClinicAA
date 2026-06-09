const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM Paciente", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar pacientes" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;

