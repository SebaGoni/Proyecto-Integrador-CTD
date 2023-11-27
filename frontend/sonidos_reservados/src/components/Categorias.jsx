import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Categorias() {

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <DivCategorias>
        <div className='categorias'>
          <h2>CATEGORIAS</h2>
          <ButtonsContainer>
            <Link to={`/products/${selectedCategory || ''}`}>
              <button onClick={() => setSelectedCategory('viento')}>VIENTO</button>
            </Link>
            <Link to={`/products/${selectedCategory || ''}`}>
              <button onClick={() => setSelectedCategory(6)}>CUERDAS</button>
            </Link>
            <Link to={`/products/${selectedCategory || ''}`}>
              <button onClick={() => setSelectedCategory(7)}>PERCUSION</button>
            </Link>
            <Link to={`/products/${selectedCategory || ''}`}>
              <button onClick={() => setSelectedCategory(8)}>TECLADOS</button>
            </Link>
            <Link to={`/products/${selectedCategory || ''}`}>
              <button onClick={() => setSelectedCategory(9)}>MICROFONOS</button>
            </Link>
            <Link to={`/products/${selectedCategory || ''}`}>
              <button onClick={() => setSelectedCategory(10)}>SISTEMAS DE AUDIO</button>
            </Link>
          </ButtonsContainer>
        </div>
      </DivCategorias>
    </div>
  );
}

export default Categorias;

const DivCategorias = styled.div`
  margin: 2rem;
  padding: 2.5rem;
  background-color:rgba(255, 255, 255, 0.8);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  h2 {
    font-family: 'Poppins', sans-serif;
    color: black;
    margin: 1rem;
    padding: 1rem;
    letter-spacing: 4px;
    font-weight: 500;
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
    font-size: 1.3rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    letter-spacing: 3px;
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
            font-weight: 400;
            letter-spacing: 3px;
            cursor: pointer;
            }
  }

`