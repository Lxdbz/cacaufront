require("dotenv").config();  // Carrega as variáveis de ambiente do arquivo .env

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Criar a aplicação Express
const app = express();
app.use(express.json()); // Permitir JSON no body das requisições
app.use(cors()); // Permitir requisições externas

// Conectar ao MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",  // Usuário do MySQL
  password: process.env.DB_PASSWORD || "",  // Senha do MySQL
  database: process.env.DB_NAME || "cacaushow",  // Nome do banco de dados
});

// Verificar se a conexão com o MySQL foi bem-sucedida
db.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao MySQL");
  }
});

// Rota de Teste
app.get("/", (req, res) => {
  res.send("🚀 Backend do site da Cacau Show está rodando!");
});

// Usar a variável de ambiente PORT ou definir 5000 caso não esteja configurada
const PORT = process.env.PORT || 3000; // Aqui é onde a porta é definida

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
