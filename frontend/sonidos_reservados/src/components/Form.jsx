import React from 'react';
import { useState } from 'react';
import styled from "styled-components";

function Form() {
  const [busqueda, setBusqueda] = useState("");
  const icono = '/src/assets/searchSymbol.png';

  const handleInputChange = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <DivBusqueda>
      <div className='containerInput'>
        <input
          type="text"
          id="busqueda"
          className="form-control inputBuscar"
          value={busqueda}
          placeholder='Busca aquí'
          onChange={handleInputChange}
        />
        <button className="btn btn-success">
          <img src={icono} alt="buscar" width="35" />
        </button>
      </div>
    </DivBusqueda>
  );
}

export default Form;

const DivBusqueda = styled.div`
  margin-top: 25vh;
  margin-left: 2rem;
  margin-right: 2rem;
  background-color: #D9D9D9;
  border-radius: 60px;
  display: flexbox;
  justify-content: space-between;
  align-items: center;
  @media(min-width: 900px){   
  input {
    flex: 1; 
    border-radius: 50px;
    border: none; 
    padding: 1.2rem; 
    margin: 0.5rem;
    background-color: #D9D9D9;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: width 0.3s;
    width: 80%;
  }
  input::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5em;
  }
  button {
    width: 10%; 
    border-radius: 50px;
    border: none;
    margin: 0.5rem;
    padding: 0.5rem; 
    background-color: #D9D9D9;
    cursor: pointer;
  }
}
@media(max-width: 900px){   
  input {
    flex: 1; 
    border-radius: 50px;
    border: none; 
    padding: 1.2rem; 
    margin: 0.5rem;
    background-color: #D9D9D9;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: width 0.3s;
    width:60%;
  }
  input::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5em;
  }
  button { 
    width: 10%; 
    border-radius: 50px;
    border: none;
    margin: 0.5rem;
    padding: 0.5rem; 
    background-color: #D9D9D9;
    cursor: pointer;
  }
}
`;