import React from "react";
import Moment from 'moment';

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => {
                props.onSortChange("nome_completo");
              }}
            >
              <span className="column-sort">
                Nome completo
                <img src={SortIcon} alt="Nome completo" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("email");
              }}
            >
              <span className="column-sort">
                E-mail
                <img src={SortIcon} alt="E-mail" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("data_aniversario");
              }}
            >
              <span className="column-sort">
                Aniversário
                <img src={SortIcon} alt="Aniversário" />
              </span>
            </th>
			<th
              onClick={() => {
                props.onSortChange("cpf");
              }}
            >
              <span className="column-sort">
                CPF
                <img src={SortIcon} alt="CPF" />
              </span>
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length ? (
            props.users.map(user => (
              <tr key={user.id}>
                <td>{user.nome_completo}</td>
                <td>{user.email}</td>
                    <td>{Moment(new Date(user.data_aniversario)).format("DD/MM/YYYY")}</td>
				<td>{user.cpf}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(user);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(user)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
