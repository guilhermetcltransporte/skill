import { Router } from "express";
import {
  createPessoa,
  getPessoas,
  updatePessoa,
  deletePessoa,
  getPessoa,
  importPessoa,
} from "../controllers/pessoa.controller.js";

const router = Router();

// Routes
router.post("/", createPessoa);
router.put("/:id", updatePessoa);
router.delete("/:id", deletePessoa);
router.get("/", getPessoas);
router.get("/:id", getPessoa);
router.post("/import", importPessoa);

export default router;
