import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from './utils/global_context';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { MdCancel } from "react-icons/md";

function AddProduct() {
  const { postProducto, categorias, getCategorias, caracteristicas, getCaracteristicas } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState('');
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  console.log(selectedCaracteristicas);

  useEffect(() => {
    if (!loaded) {
      getCategorias();
      getCaracteristicas();
      setLoaded(true);
    }
  }, [getCategorias, categorias, caracteristicas, getCaracteristicas]);

  const crearProducto = () => {
    const productForm = document.getElementById('productForm');
    const formData = new FormData(productForm);
    formData.append('categoriaId', selectedCategoriaId);
    selectedCaracteristicas.forEach((caracteristica) => {
      formData.append('caracteristicas[]', caracteristica.id);
    });
    postProducto(formData);
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoriaId(event.target.value);
  }

  const handleCaracteristicasChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => caracteristicas.find((c) => c.id === parseInt(option.value))
    );
    setSelectedCaracteristicas(selectedOptions);
  };

  const handleRemoveCaracteristica = (caracteristicaId) => {
    const updatedSelectedCaracteristicas = selectedCaracteristicas.filter(
      (caracteristica) => caracteristica.id !== caracteristicaId
    );
    setSelectedCaracteristicas(updatedSelectedCaracteristicas);
  };
  

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

          <GridItem>
            <label htmlFor="caracteristicas">Características</label>
            <select
              id="caracteristicas"
              name="caracteristicas"
              multiple
              value={selectedCaracteristicas.map((c) => c.id)}
              onChange={handleCaracteristicasChange}
            >
              {caracteristicas.map((caracteristica) => (
                <option key={caracteristica.id} value={caracteristica.id}>
                  {caracteristica.nombre}
                </option>
              ))}
            </select>
          </GridItem>

          <GridItem>
            <label>Características seleccionadas</label>
            <ul className='ulCaracteristicas'>
              {selectedCaracteristicas.map((caracteristica) => (
                <li onClick={() =>
                  handleRemoveCaracteristica(caracteristica.id)
                } className='liCaracteristicas' key={caracteristica.id}>
                  {caracteristica.nombre}{' '}
                    <MdCancel />
                </li>
              ))}
            </ul>
          </GridItem>
        </GridContainer>
        <div className='divButton'>
          <button type="button" onClick={crearProducto}>Crear</button>
        </div>
      </form>
    </NuevoContainer>
)}

export default AddProduct;

const NuevoContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  color: black;
  margin-top: 15rem;
  margin-bottom: 50px;
  margin-right: 2rem;
  margin-left: 2rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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
  .btn{
    
  }
  .iconArrow{
      position: absolute;
      top: 17rem;
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
  .ulCaracteristicas{
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .liCaracteristicas{
    background-color: #b20e0e;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    color: white;
    font-weight: 600;
    font-family: 'Poppins';
  }
`;