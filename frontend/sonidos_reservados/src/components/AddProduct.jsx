import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from './utils/global_context';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'

function AddProduct() {
  const { postProducto, categorias, getCategorias } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState('');

  useEffect(() => {
    if (!loaded) {
      getCategorias();
      setLoaded(true);
    }
  }, [getCategorias, categorias]);

  const crearProducto = () => {
    const productForm = document.getElementById("productForm");
    const formData = new FormData(productForm);
    formData.append('categoriaId', selectedCategoriaId);
    postProducto(formData);
  }

  const handleCategoriaChange = (event) => {
    setSelectedCategoriaId(event.target.value);
  }

  return (
    <NuevoContainer>
        <Link to='/admin'>
          <AiOutlineArrowLeft className='iconArrow' />
        </Link>
      <form id="productForm">
        <h1>Crear producto</h1>

        <GridContainer>
         
          <GridItem>
            <label htmlFor="title">Nombre</label>
            <input className='inputs' type="text" id="title" name="title" required />
          </GridItem>

          <GridItem>
            <label htmlFor="description">Descripción</label>
            <input className='inputs' id="description" name="description" required></input>
          </GridItem>

        
          <GridItem>
            <label htmlFor="categoriaId">Categoría</label>
            <select className='inputs' id="categoriaId" name="categoriaId" value={selectedCategoriaId} onChange={handleCategoriaChange} required>
              <option value="" disabled>Selecciona una categoría</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
              ))}
            </select>
          </GridItem>

          <GridItem>
            <label htmlFor="price">Precio</label>
            <input className='inputs' type="number" id="price" name="price" required />
          </GridItem>

          
          <GridItem>
            <label htmlFor="image">Imagen de portada</label>
            <input className='inputsImagenes' type="file" id="image" name="imagen" accept="image/*" required />
          </GridItem>

          <GridItem>
            <label htmlFor="imagenes">Imágenes de galería</label>
            <input className='inputsImagenes' type="file" id="imagenes" name="imagenes" accept="image/*" multiple />
          </GridItem>
        </GridContainer>
        <div className='divButton'>
          <button type="button" onClick={crearProducto}>Crear</button>
        </div>
      </form>
    </NuevoContainer>
  );
}

export default AddProduct;

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
  align-items: center; /* Centrar las columnas verticalmente */
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




