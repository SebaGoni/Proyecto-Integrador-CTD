import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from './utils/global_context';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'

const AddCategoria = () => {

    const { postCategoria } = useContext(GlobalContext);

    const crearCategoria = () => {
        const categorieForm = document.getElementById('categorieForm');
        const formData = new FormData(categorieForm);
        console.log(formData);
        postCategoria(formData);
      };

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

  return (
    <NuevoContainer>
        <Link to='/admin'>
          <AiOutlineArrowLeft className='iconArrow' />
        </Link>
      <form id="categorieForm">
        <h1>CREAR CATEGORIA</h1>
        <GridContainer>
         
          <GridItem>
            <label htmlFor="nombre">Nombre</label>
            <input className='inputs' type="text" id="nombre" name="nombre" required />
          </GridItem>

          <GridItem>
            <label htmlFor="image">Imagen de categoria</label>
            <input className='inputsImagenes' type="file" id="image" name="image" accept="image/*" required />
          </GridItem>

        </GridContainer>
        <div className='divButton'>
          <button type="button" onClick={crearCategoria}>Crear</button>
        </div>
      </form>
    </NuevoContainer>
  )
}

export default AddCategoria

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
    background-color: #3F51B5;
    color: white;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: .8rem;
    font-weight: 600;
    padding: 5px 30px;
    cursor: pointer;
    margin: auto;
  }
`;