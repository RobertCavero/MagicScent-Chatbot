const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Carregar perfumes do JSON
const perfumes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "perfumes-estoque.json"), "utf8")
);

// Tipos conhecidos com notas-chave
const tiposConhecidos = {
  floral: [
    "jasmim",
    "rosa",
    "violeta",
    "lavanda",
    "tuberosa",
    "orquídea",
    "gardênia",
  ],
  amadeirado: ["cedro", "sândalo", "patchouli", "vetiver", "madeira"],
  cítrico: [
    "limão",
    "bergamota",
    "laranja",
    "tangerina",
    "mandarina",
    "toranja",
    "cidra",
    "pomelo",
  ],
  doce: ["baunilha", "caramelo", "toffee", "pralinê", "mel", "chocolate"],
  fresco: ["hortelã", "alecrim", "menta", "notas oceânicas"],
  frutado: [
    "maçã",
    "abacaxi",
    "pêssego",
    "frésia",
    "cassis",
    "morango",
    "pera",
    "melão",
  ],
};

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Listar todos os perfumes
app.get("/perfumes", (req, res) => {
  res.json(perfumes);
});

// Buscar perfume por nome exato
app.get("/perfumes/:nome", (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const perfume = perfumes.find((p) => p.nome.toLowerCase() === nome);

  if (!perfume) {
    return res.status(404).json({ erro: "Perfume não encontrado" });
  }

  res.json(perfume);
});

// Rota de busca avançada
app.get("/buscar", (req, res) => {
  const { q } = req.query;

  if (!q) return res.json([]);

  const qLower = q.toLowerCase();
  const palavras = qLower.split(/\s+/);

  let resultados = perfumes.map((p) => {
    const todasNotas = [
      ...(p.notas.saida || []),
      ...(p.notas.corpo || []),
      ...(p.notas.fundo || []),
    ].map((n) => n.toLowerCase());

    // 1️⃣ Detectar múltiplos tipos com base nas notas
    const tiposDetectados = [];
    for (const [tipo, notasChave] of Object.entries(tiposConhecidos)) {
      if (notasChave.some((notaChave) => todasNotas.includes(notaChave))) {
        tiposDetectados.push(tipo);
      }
    }

    // 2️⃣ Calcular score de relevância
    let score = 0;
    palavras.forEach((palavra) => {
      if (p.nome.toLowerCase().includes(palavra)) score += 2;
      if (todasNotas.some((nota) => nota.includes(palavra))) score += 1;
      if (p.descricao?.toLowerCase().includes(palavra)) score += 0.5;
      // score por tipo detectado
      tiposDetectados.forEach((tipo) => {
        if (tipo.includes(palavra)) score += 1.5;
      });
    });

    return { ...p, score, tipos: tiposDetectados };
  });

  // filtra apenas resultados com score > 0 e ordena por relevância
  resultados = resultados
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  res.json(resultados);
});

// Porta dinâmica (Render) ou 3000 local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
