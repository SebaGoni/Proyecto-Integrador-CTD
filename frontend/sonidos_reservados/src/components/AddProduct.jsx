import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2';

function AddProduct() {
  
  const navigate = useNavigate();
  const URL = 'http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos';

  const [productData, setProductData] = useState({
    title: '',
    price: '',
    categoriaId: '',
    description: '',
    image: '',
    imagenes: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProductData({ ...productData, [name]: value});
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await getBase64(file);
        setProductData({ ...productData, image: base64Image });
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    }
  };

  const handleImagenesChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      try {
        const base64Images = await Promise.all(
          Array.from(files).map(async (file) => await getBase64(file))
        );
        setProductData({ ...productData, imagenes: base64Images });
      } catch (error) {
        console.error('Error converting images to base64:', error);
      }
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const submitProduct = async () => {
    const jsonObject = {
      title: productData.title,
      price: productData.price,
      categoriaId: productData.categoriaId,
      description: productData.description,
      image: productData.image,
      imagenes: productData.imagenes,
    };
  
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObject),
      });

      console.log('Response status:', response.status);
      console.log('Response body:', await response.text())

      if (response.status === 200) {
        console.log('Producto agregado correctamente.');
        Swal.fire({
          title: 'Registro exitoso',
              text: '¡Tu producto fue agregado a la lista!',
              icon: 'success',
        })
        navigate('/Admin/productList')
      } else {
        Swal.fire({
          title: '¡Error al ingresar producto!',
              text: 'Intenta nuevamente',
              icon: 'error',
        })
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };  

  return (
    <NuevoContainer>
      <form>
        <h2>Agregar Producto</h2>
        <Link to='/Admin'
              className='BotonAtras'> 
              Atras
        </Link>
        <ContainerForm>
          <div className='input-row'>
                  <label htmlFor="title">Nombre del Producto:</label>
                  <input type="text" id="title" name="title" value={productData.title} onChange={handleInputChange} required />
          </div>

          <div className='input-row'>
                  <label htmlFor="price">Precio por Hora:</label>
                  <input type="number" id="price" name="price" value={productData.price} onChange={handleInputChange} required />
          </div>

          <div className='input-row'>
                  <label htmlFor="categoriaId">Indice de Categoria:</label>
                  <input type="number" id="categoriaId" name="categoriaId" value={productData.categoriaId} onChange={handleInputChange} required />
          </div> 

          <div className='input-row'>
                  <label htmlFor="description">Descripcion del Producto:</label>
                  <textarea type="text" id="description" name="description" value={productData.description} onChange={handleInputChange} required />
          </div> 
        
          <div className='input-row'>
                  <label htmlFor="image">Imagen del Producto:</label>
                  <input 
                  type="file" 
                  accept="image/*" 
                  id="image" 
                  name="image" 
                  onChange={handleImageChange} 
                  required />
          </div> 

          <div className='input-row'>
                  <label htmlFor="image">Galeria del Producto:</label>
                  <input 
                  type="file" 
                  accept="imagenes/*" 
                  id="imagenes" 
                  name="imagenes" 
                  onChange={handleImagenesChange} 
                  required 
                  multiple/>
          </div>          
        </ContainerForm> 
        <button className="BotonGuardarProduct" 
          type="button"
          onClick={submitProduct}>
            Guardar Producto
          </button>
      </form>
    </NuevoContainer>
  );
}

export default AddProduct;

const NuevoContainer = styled.div`
    background-color:white;
    color: black;
    margin-top: 200px;
    margin-bottom:50px; 
    text-align: left;
    padding: 2rem;
    display: Block;
    justify-content: center;
    h2{
      display: block;
      width: 1200px;
    }
    .BotonAtras{
      background-color: #7E57C2;
      margin-left: 50rem;
      padding:.3rem 2rem;
      color: white;
      border-radius: 30px;
    }
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        border: solid .1px gray;
        border-radius: 10px;
        padding: 1rem;
        background-color: black;
        color: white;
        font-size: 1rem;
        font-weight: 600;
      }
`
const ContainerForm = styled.div`
    .input-row{
      margin: auto;
      width: 900px;
      margin:1rem;
      padding: .5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;

      input{
        margin: 1rem;
        padding: .3rem;
        width: 70%;
      }
      textarea{
        margin: 1rem;
        padding: .3rem;
        width: 70%;
        height: 100px;
      }
      
    }
    
`
