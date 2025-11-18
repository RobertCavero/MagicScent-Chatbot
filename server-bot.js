const express = require("express");
const fs = require("fs");
const app = express();

const perfumes = JSON.parse(fs.readFileSync("./perfumes-estoque.json", "utf8"));

app.get("/perfumes", (req, res) => {
  res.json(perfumes);
});

app.get("/perfumes/:nome", (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const perfume = perfumes.find((p) => p.nome.toLowerCase() === nome);
  if (!perfume) return res.status(404).json({ erro: "Perfume não encontrado" });
  res.json(perfume);
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
