import express from "express";
import morgan from "morgan";

import cors from "cors";


const app = express();

app.use(cors());

// Import routes
import pessoaRoutes from "./routes/pessoas.routes.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
//app.use("/api/projects", projectRoutes);
//app.use("/api/tasks", taskRoutes);
app.use("/api/pessoas", pessoaRoutes);

export default app;
