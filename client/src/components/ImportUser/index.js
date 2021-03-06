import React, { useState } from "react";

const ImportUser = props => {
 
	var pessoas = [];
 
  const onInputChange = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      //const text = (e.target.result);
	  //file = text;
	  
		var lines = e.target.result.split(/\r?\n/);

		lines.forEach(function (line) {
			
			const dateString = line.substring(130, 138);
			const year = +dateString.substring(0, 4);
			const month = +dateString.substring(4, 6);
			const day = +dateString.substring(6, 8);

			const date = new Date(year, month - 1, day);
			
			pessoas.push({ 
				nome_completo: line.substring(0, 50),
				email: line.substring(50, 130),
				data_aniversario: date,
				cpf: line.substring(138, 149),
			});
			
		});
		
    };
    reader.readAsText(e.target.files[0]);
  }

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.importUser(pessoas);
      }}
    >
      <div className="form-group">
        <label>Arquivo</label>
        <input
          type="file"
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Upload</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ImportUser;
