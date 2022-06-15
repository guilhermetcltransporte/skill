import React, { useState, useEffect } from "react";
import Moment from 'moment';

const UpdateUser = props => {
  const [user, setUser] = useState(props.currentUser);

  const onInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateUser(user.id, user);
      }}
    >
      <div className="form-group">
        <label>Nome completo</label>
        <input
          type="text"
          name="nome_completo"
          value={user.nome_completo}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>E-mail</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Aniversário</label>
        <input
          type="date"
          name="data_aniversario"
                  value={Moment(user.data_aniversario).format("YYYY-MM-DD")}
          onChange={onInputChange}
        />
      </div>
	  <div className="form-group">
        <label>CPF</label>
        <input
          type="text"
          name="cpf"
          value={user.cpf}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Confirmar</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;
