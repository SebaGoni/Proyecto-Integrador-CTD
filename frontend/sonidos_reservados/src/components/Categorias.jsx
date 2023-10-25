import React from 'react'
import styled from "styled-components";

function Categorias() {
  return (
    <DivCategorias>
        <div className='categorias'>
            <h2>CATEGORIAS</h2>
            <button>CUERDAS</button>
            <button>VIENTO</button>
            <button>PERCUSION</button>
            <button>TECLADOS</button>
            <button>MICROFONOS</button>
            <button>SISTEMAS DE AUDIO</button>
        </div>
    </DivCategorias>
  )
}

export default Categorias

const DivCategorias = styled.div`
    margin: 2rem;
    padding: 1rem;
    background-color: #D9D9D9;
    border-radius: 30px;
    display:flex;
    justify-content: center;
    align-items: center;
    h2{
        font-family: 'Concert One', sans-serif;
        color: black;
        margin: 1.5rem;
        font-size: 2rem;
        border-bottom: solid;
        padding: 1rem;
    }
    button{
        align-items: center;
        margin:1.2rem;
        width: 400px;
        padding: 1rem;
        background-color: black;
        border-radius: 50px;

        color: white;
        font-size: 2rem;
        font-family: 'Concert One', sans-serif;
        cursor: pointer;
    `
