import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GlobalContext } from './utils/global_context';

function Categorias() {
  const { categorias, getCategorias } = useContext(GlobalContext);

  console.log(categorias);

  useEffect(() => {
    getCategorias()
  }, []);

  return (
    <div>
      <DivCategorias>
        <div className='categorias'>
          <h2>CATEGORIAS</h2>
          <ButtonsContainer>
            {categorias.map((category) => (
              <Link className='link' key={category.id} to={`/categorias/${encodeURIComponent(category.nombre)}`}>
                <button
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div className="button-content">{category.nombre}</div>
                </button>
              </Link>
            ))}
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
    @media(min-width: 900px){
          font-size:2rem;
        }
    @media(max-width: 900px){
      font-size:1.8rem;
      text-align: center;
    }
    @media(max-width: 430px){
          font-size:1.4rem;
          text-align: center;
        }
  }
`;

const ButtonsContainer = styled.div`
  display: grid;
  gap: 1.2rem;
  @media (min-width: 901px) and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
  .link{
    transition: opacity 0.3s ease;
  }
  .link:hover{
    opacity: 0.9;
  }
  button {
    width: 100%;
    height: 300px;
    padding: 1rem;
    background-color: black;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.3rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    letter-spacing: 3px;
    cursor: pointer;
    }
  .button-content{
    background-color: rgb( 0,0,0,0.6);
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius:15px;
  }
`