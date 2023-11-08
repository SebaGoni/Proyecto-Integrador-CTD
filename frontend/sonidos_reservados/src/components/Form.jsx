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
                    placeholder='Busca aqui'
                    onChange={handleInputChange} // Agregar el manejador de cambios
                />
                <button className="btn btn-success">
                    <img src={icono} alt="buscar" width="35"></img>
                </button>
            </div>
        </DivBusqueda>
    )
}

export default Form

const DivBusqueda = styled.div`
    margin-top: 25vh;
    margin-left: 2rem;
    margin-right: 2rem;
    background-color: #D9D9D9;
    border-radius: 60px;
    display: flex;
    justify-content:space-between;

    input{
        width: 70vw;
        border-radius: 50px;
        border-style: none;
        padding: .5rem;
        margin: 1rem 0 .5rem 2rem;
        align-item: center;
        background-color: #D9D9D9;
    }
    ::placeholder {
        font-family: 'Concert One', sans-serif;
        font-size: 1.5em;
    }
        
    button{
        border-radius: 50px;
        border-style: none;
        margin: .5rem;
        padding: .5rem;
        background-color: #D9D9D9;
        margin-top: .5rem;
        cursor: pointer;

    }
    `

