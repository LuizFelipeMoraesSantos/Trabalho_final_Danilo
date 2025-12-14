const express = require("express");
const cors = require("corsqp"); 
const db = require("./db");

const app = express();
app.use(require("cors")()); 
app.use(express.json());


app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body;
  try {
    const [result] = await db.query("INSERT INTO users (nome, email) VALUES (?, ?)", [nome, email]);
    res.json({ id: result.insertId, nome, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    await db.query("UPDATE users SET nome=?, email=? WHERE id=?", [nome, email, id]); 
    res.json({ id, nome, email }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id=?", [id]);
    res.json({ message: "Usuário deletado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));