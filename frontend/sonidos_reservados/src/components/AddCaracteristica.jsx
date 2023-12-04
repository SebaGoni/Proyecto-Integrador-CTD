import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from './utils/global_context';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'

const AddCaracteristica = () => {

    const { postCaracteristica } = useContext(GlobalContext);

    const crearCaracteristica = () => {
        const caractForm = document.getElementById('caractForm');
        const formData = new FormData(caractForm);
        console.log(formData);
        postCaracteristica(formData);
      };

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <NuevoContainer>
        <Link to='/admin'>
          <AiOutlineArrowLeft className='iconArrow' />
        </Link>
      <form id="caractForm">
        <h1>Crear Característica</h1>
        <GridContainer>
         
          <GridItem>
            <label htmlFor="nombre">Nombre</label>
            <input className='inputs' type="text" id="nombre" name="nombre" required />
          </GridItem>

          <GridItem>
            <label htmlFor="imagen">Imagen de categoria</label>
            <input className='inputsImagenes' type="file" id="imagen" name="imagen" accept="image/*" required />
          </GridItem>

        </GridContainer>
        <div className='divButton'>
          <button type="button" onClick={crearCaracteristica}>Crear</button>
        </div>
      </form>
    </NuevoContainer>
  )
}

export default AddCaracteristica

const NuevoContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  color: black;
  margin-top: 200px;
  margin-bottom: 50px;
  margin-right: 2rem;
  margin-left: 2rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    text-align: center;
  }
  .divButton{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
  }
  button{
    background-color: black;
    color: white;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 5px 30px;
    cursor: pointer; 
  }
  .iconArrow{
      position: absolute;
      top: 14rem;
      left: 4rem;
      font-size: 2rem;
      color: black;
      cursor: pointer;
    }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-items: center; 
  margin-top: 70px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${(props) => (props.colSpan ? '100%' : 'auto')};
  grid-column: span ${(props) => (props.colSpan || 1)};
  label{
    font-weight: 600;
    margin: auto;
  }
  .inputs{
    border-radius: 10px;
    border: solid .5px #7A7A7A;
    height: 25px;
    width: 250px;
    margin: auto;
    padding-left: 8px;
  }
  .inputsImagenes{
    background-color: black;
    color: white;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 5px 30px;
    cursor: pointer;
    margin: auto;
  }
`;