import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
//import {useEffect, useState} from 'react';
//import axiosClient from '.../config/axiosClient'
import { data } from '../data';
import Producto from './Producto';

const ListaProductos = () => {

  //const [productos, setProductos] = useState([]);
  //usando la data mientras
  const renderProductos = () => (
    <tbody>
      {data.map((producto, index) => (
        <Producto
          key={index}
          index={index}
          id={producto.id}
          nombre={producto.title}
          categoria={producto.categoria}
          precio={producto.price}
          onDelete={handleDeleteProduct}
        />)
      )}
    </tbody>
  );
  const handleDeleteProduct = (id) => {

  };
  // cuando la api funcione, codigo de llamada a los datos

  /*const getProductos = () => {
    axiosClient.get('/products')
    .then(res => {
      console.log(res.data)
      setProductos(res.data);
    });
  };
  useEffect(()=> {
    getProductos();
  }, []);*/


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
      <Link to='/Admin/nuevoProducto'
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

