const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Servir arquivos estáticos (HTML, CSS, JS, etc.)
app.use(express.static(__dirname));

// Carregar os perfumes
const perfumes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "perfumes-estoque.json"), "utf8")
);

// Rota principal -> envia index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para listar todos perfumes
app.get("/perfumes", (req, res) => {
  res.json(perfumes);
});

// Rota para buscar perfume por nome
app.get("/perfumes/:nome", (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const perfume = perfumes.find((p) => p.nome.toLowerCase() === nome);

  if (!perfume) {
    return res.status(404).json({ erro: "Perfume não encontrado" });
  }

  res.json(perfume);
});

// Porta dinâmica (Render) ou 3000 local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
