import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Styles
import "./app.scss";
import {
    getCreatedUser, getDeletedUser,
    getImportedUser, getPessoas, getUpdatedUser
} from "./app/api";
import CreateUser from "./components/CreateUser";
import DataTable from "./components/DataTable";
import DeleteUser from "./components/DeleteUser";
import Footer from "./components/Footer";
// Components
import Header from "./components/Header";
import ImportUser from "./components/ImportUser";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import UpdateUser from "./components/UpdateUser";
import MySwal from "./index";



function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: null,
    avatar: null,
    first_name: "",
  });
  
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState(users);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Search
  const search = term => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedUsers.filter(user =>
        Object.keys(user).some(key =>
          user[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_USERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_USERS", data: savedUsers });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "nome_completo":
        const nameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.nome_completo.localeCompare(b.nome_completo, "tr")
            : b.nome_completo.localeCompare(a.nome_completo, "tr");
        });
        dispatch({ type: "SET_USERS", data: nameSort });
        return;
      case "surname":
        const surnameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.last_name.localeCompare(b.last_name, "tr")
            : b.last_name.localeCompare(a.last_name, "tr");
        });
        dispatch({ type: "SET_USERS", data: surnameSort });
        return;
      case "email":
        const emailSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.email.localeCompare(b.email, "tr")
            : b.email.localeCompare(a.email, "tr");
        });
        dispatch({ type: "SET_USERS", data: emailSort });
        return;
		case "cpf":
        const cpfSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.cpf.localeCompare(b.cpf, "tr")
            : b.cpf.localeCompare(a.cpf, "tr");
        });
        dispatch({ type: "SET_USERS", data: cpfSort });
        return;
      default:
        break;
    }
  };
  
  // Import User
  const importUser = async (pessoas) => {
	
	setActiveModal(false);
    setLoading(true);

    try {
		
        await getImportedUser(pessoas).then(res => {
		
        MySwal.fire({
          icon: "success",
          title: "Upload realizado com sucesso!"
        }).then(async () => {
            await fetchUsers();
        });
		
      });
	  
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Falha ao fazer o upload do arquivo!"
      });
    } finally {
      setLoading(false);
    }
	
  };

  // Create User
  const createUser = async user => {
	
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedUser(user).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Cadastrado com sucesso!"
        }).then(() => {
          dispatch({ type: "CREATE_USER", data: result });
          setSavedUsers([...users, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const updateRow = user => {
    setModal("Alterar");

    setCurrentUser(user);
  };

  const updateUser = async (id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedUser(id, updatedUser).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Salvo com sucesso!"
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.map(user =>
              user.id === id ? Object.assign(user, result) : user
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteRow = user => {
    setModal("Excluir");

    setCurrentUser({
      id: user.id,
      avatar: user.avatar,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  };

  const deleteUser = async id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedUser(id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "Deletado com sucesso!"
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.filter(user => user.id !== id)
          });
          setSavedUsers(savedUsers.filter(user => user.id !== id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      await getPessoas().then(({ data }) => {
        setSavedUsers(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: err.message
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
				<button
                  className="primary-btn"
                  onClick={() => setModal("Importar")}
                >
                  Importar
                </button>
                <button
                  className="success-btn"
                  onClick={() => setModal("Cadastrar")}
                >
                  Cadastrar
                </button>
              </div>
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
		
			{activeModal.name === "Importar" && (
				<ImportUser
				  importUser={importUser}
				  setActiveModal={setActiveModal}
				/>
			)}
			  
          {activeModal.name === "Cadastrar" && (
            <CreateUser
              createUser={createUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Alterar" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Excluir" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default App;
