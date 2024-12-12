import cors from "cors";
import express, { Application } from "express";
import educandoRoutes from "./routes/educando";
import instrumentoRoutes from "./routes/instrumento";
import emprestimoRoutes from "./routes/emprestimo";

const app: Application = express();

// Configurar CORS
app.use(
  cors({
    // origin: "http://localhost:5173", // Alterar para a URL do seu frontend em produção
    origin: "*", // Alterar para a URL do seu frontend em produção
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json());

// Rotas
app.use("/educandos", educandoRoutes);
app.use("/instrumentos", instrumentoRoutes);
app.use("/emprestimos", emprestimoRoutes);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
