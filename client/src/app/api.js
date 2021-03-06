import axios from "axios";

const apiURL = process.env.REACT_APP_REQRES_API;

function getPessoas() {
  const response = axios.get(`http://localhost:4000/api/pessoas`);

  return response;
}

function getCreatedUser(pessoa) {

	console.log(pessoa);

	const response = axios.post(`http://localhost:4000/api/pessoas`, pessoa);

  return response;
}

function getUpdatedUser(id, pessoa) {
  const response = axios.put(`http://localhost:4000/api/pessoas/${id}`, pessoa);

  return response;
}

function getDeletedUser(id) {
  const response = axios.delete(`http://localhost:4000/api/pessoas/${id}`);

  return response;
}

function getImportedUser(pessoas) {
	
  const response = axios.post(`http://localhost:4000/api/pessoas/import`, pessoas);

  return response;
  
}

export { getPessoas, getCreatedUser, getUpdatedUser, getDeletedUser, getImportedUser };
