import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {useEffect, useState} from 'react';
import axios from 'axios';
import { data } from '../data';
import Producto from './Producto';
import Swal from 'sweetalert2';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
    const getProductos = async () => {
    try {
      const response = await axios.get('http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // You can add error handling logic here, such as showing an error message.
    }
  };
 
  useEffect(() => {
    getProductos();
  }, []);
  
  const renderProductos = () => (
    <tbody>
      {productos.map((producto, index) => (
        <Producto
          key={index}
          index={index}
          id={producto.id}
          nombre={producto.title}
          categoria={producto.categoria.nombre}
          precio={producto.price}
          onDelete={handleDeleteProduct}
        />)
      )}
    </tbody>
  );
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este producto no se podra recuperar",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
    }).then((result)=>{
      if (result.value){
        deleteProducto(id);
      }
    })
  };
  const deleteProducto = (id) => {
    axios.delete(`/products/${id}`)
    data.delete(`/producto/${id}`)
    .then(res => {
      if (res.status !== 200 ) {
        Swal.fire(
          'Eliminar Producto',
          'Error al eliminar producto',
          'error'
        );
      }else{
        Swal.fire(
          'Eliminar producto',
          res.data.message,
          'success'
        );
        getProductos();
      }
    });
  };
  return (
    <ProductContainer>
      <h2>Lista de Productos</h2>
      <table className='TablaDeProductos'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Categoria</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Accion</th>
          </tr>
        </thead>
        {renderProductos()}
      </table>
      <Link to='/admin/newProduct'
              className='BotonAdmin'
              role="button"> Nuevo Producto
      </Link>
    </ProductContainer>
  )
}

export default ListaProductos;

const ProductContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  color: black;
  margin: 1rem;
  padding: 2rem;
  h2{
    text-align: center;
  }
  table, th, tr {
    border-bottom: solid .1px #e7e7e7;
    padding: .5rem;
    margin: auto;
  }
  .BotonAdmin{
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
  }

`

