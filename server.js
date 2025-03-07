require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Criar a aplicação Express
const app = express();
app.use(express.json()); // Permitir JSON no body das requisições
app.use(cors()); // Permitir requisições externas

// Conectar ao MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/cacaushow";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Rota de Teste
app.get("/", (req, res) => {
  res.send("🚀 Backend do site da Cacau Show está rodando!");
});

// Definir a porta e iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
