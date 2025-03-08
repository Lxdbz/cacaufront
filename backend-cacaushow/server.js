require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // ou outro usuário configurado
  password: '4794'
  database: 'nome_do_banco_de_dados'
});


db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL: ", err);
  } else {
    console.log("🔥 Conectado ao MySQL!");
  }
});

// 📌 Rota de Cadastro
app.post("/criar-conta", async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaHash = await bcrypt.hash(senha, 10);

  db.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", 
    [nome, email, senhaHash], 
    (err, result) => {
      if (err) return res.status(500).json({ erro: "Erro ao cadastrar" });
      res.json({ sucesso: "Conta criada com sucesso!" });
    }
  );
});

// 📌 Rota de Login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err || result.length === 0) return res.status(400).json({ erro: "Usuário não encontrado" });

    const usuario = result[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ sucesso: "Login realizado!", token });
  });
});

// 📌 Rota para Adicionar Produto
app.post("/adicionar-produto", (req, res) => {
  const { nome, preco, descricao, imagem } = req.body;

  db.query("INSERT INTO produtos (nome, preco, descricao, imagem) VALUES (?, ?, ?, ?)", 
    [nome, preco, descricao, imagem], 
    (err, result) => {
      if (err) return res.status(500).json({ erro: "Erro ao adicionar produto" });
      res.json({ sucesso: "Produto adicionado!" });
    }
  );
});

// 📌 Rota para Listar Produtos
app.get("/produtos", (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar produtos" });
    res.json(results);
  });
});

// 🔥 Iniciar o servidor
app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    connection.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hash],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao cadastrar usuário" });
            }
            res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        }
    );
});

const registerUser = async () => {
    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Lucas",
                email: "lucas@email.com",
                password: "123456"
            })
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
    }
};
