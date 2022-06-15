import { Pessoa } from "../models/Pessoa.js";

export async function createPessoa(req, res) {
    try {

        const newPessoa = await Pessoa.create(req.body);
        res.json(newPessoa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getPessoas(req, res) {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updatePessoa(req, res) {
	
  const { id } = req.params;
  
  try {

    const pessoa = await Pessoa.findOne({
      where: { id },
    });

    pessoa.set(req.body);

    await pessoa.save();

    res.json(pessoa);
	
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deletePessoa(req, res) {
  const { id } = req.params;
  try {
    await Pessoa.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function getPessoa(req, res) {
  const { id } = req.params;
  try {
    const pessoa = await Task.findOne({
      where: { id },
      attributes: ["id", "nome_completo"],
    });
    res.json(pessoa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function importPessoa(req, res) {
  try {
	  
		const newPessoa = await Pessoa.bulkCreate(req.body);
	
		res.json(newPessoa);
	
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}