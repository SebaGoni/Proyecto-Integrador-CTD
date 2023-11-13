import React from 'react';
import styled from "styled-components";

function Categorias() {
  return (
    <DivCategorias>
      <div className='categorias'>
        <h2>CATEGORIAS</h2>
        <ButtonsContainer>
          <button>CUERDAS</button>
          <button>VIENTO</button>
          <button>PERCUSION</button>
          <button>TECLADOS</button>
          <button>MICROFONOS</button>
          <button>SISTEMAS DE AUDIO</button>
        </ButtonsContainer>
      </div>
    </DivCategorias>
  )
}

export default Categorias;

const DivCategorias = styled.div`
  margin: 2rem;
  padding: 1rem;
  background-color: #D9D9D9;
  border-radius: 30px;
  h2 {
    font-family: 'Poppins', sans-serif;
    color: black;
    margin: 2rem;
    border-bottom: solid;
    @media(min-width: 1000px){
          font-size:2rem;
        }
        @media(max-width: 1000px){
          font-size:1.8rem;
          text-align: center;
        }
  }
`;

const ButtonsContainer = styled.div`
  @media(min-width: 900px){
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates 3 columns with equal width */
  gap: 1.2rem; /* Space between buttons */
  
  button {
    width: 100%;
    padding: 1rem;
    background-color: black;
    border-radius: 50px;
    color: white;
    font-size: 1.7rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    cursor: pointer;
    }
  }
  @media(max-width: 900px){
    display: block;
    align-items: center;
    justify-content: center;
    margin:1.2rem;
        button {
            width: 95%;
            margin:1rem;
            padding: 1rem;
            background-color: black;
            border-radius: 50px;
            color: white;
            font-size: 1.8rem;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            cursor: pointer;
            }
  }

`