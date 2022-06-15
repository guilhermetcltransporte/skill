import React, { useState, useEffect } from "react";

const DeleteUser = props => {
  const [user, setUser] = useState(props.currentUser);

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
        props.deleteUser(user.id);
      }}
    >
      <div className="form-group">
        Tem certeza que deseja excluir ?
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

export default DeleteUser;
