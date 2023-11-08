import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

function AddProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [categoriaId, setCategoriaId] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const URL = 'http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos';
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoriaIdChange = (e) => {
    setCategoriaId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImagenesChange = (e) => {
    const file = e.target.files[0];
    setImagenes(file);
  };

  const handleAddProduct = async () => {
    // Realizar una consulta a la API para verificar si ya existe un producto con el mismo nombre
    const isProductExists = await checkProductExistence(title);
  
    if (isProductExists) {
      setError('Ya existe un producto con el mismo nombre. Introduce un nombre diferente.');
      return; // Detener la función si el producto ya existe
    }
  
    const formData = new FormData();
    formData.append('name', title);
    formData.append('price', price);
    formData.append('categoria', categoriaId);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('imagenes', imagenes);
  
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Producto agregado correctamente.');
      } else {
        const data = await response.json();
        console.error('Error al agregar el producto:', data.error);
        setError('Error al agregar el producto. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Ocurrió un error al agregar el producto. Inténtalo de nuevo más tarde.');
    }
  };
  
  // Función para verificar si ya existe un producto con el mismo nombre
  const checkProductExistence = async (title) => {
    try {
      const response = await fetch(`http://ec2-3-81-113-87.compute-1.amazonaws.com:8080/productos?name=${title}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.length > 0; // Devuelve true si ya existe un producto con el mismo nombre
      } else {
        console.error('Error al verificar la existencia del producto:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return false;
    }
  };       

  return (
    <NuevoContainer>
      <h2>Agregar Producto</h2>
      <Link to='/Admin'
            className='BotonAdmin'
            role="button"> Atras
      </Link>
      {error && <p>{error}</p>}
      <form>
        <label>Nombre del Producto:</label> <br />
        <input type="text" value={title} onChange={handleTitleChange} />

        <br /><label>Precio:</label> <br />
        <input type="number" value={price} onChange={handlePriceChange} />

        <br /><label>Categoria:</label> <br />
        <input type="text" value={categoriaId} onChange={handleCategoriaIdChange} />

        <br /><label>Descripción del Producto:</label> <br />
        <textarea value={description} onChange={handleDescriptionChange} />

        <br /><label>Imagen del Producto:</label> <br />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <br /><label>Galeria:</label> <br />
        <input type="file" accept="imagenes/*" onChange={handleImagenesChange} />

        <br /><button onClick={handleAddProduct}>Guardar Producto</button>
      </form>
    </NuevoContainer>
  );
}

export default AddProduct;

const NuevoContainer = styled.div`
    background-color:white;
    color: black;
    margin: auto;
    margin-top: 200px;
    text-align: center;

`