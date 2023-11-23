import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


const Admin = () => {
  return (
    <MenuAdmin>
      <h2> Bienvenido Admin</h2>
      <p>Escoge una opcion</p>
    <div className='MenuDeAdmin'>
      <Link to='/admin/newProduct'
              className='BotonAdmin'
              role="button"> Nuevo Producto
      </Link>
      <Link to='/admin/productList'
        className='BotonAdmin'
        role="button">Lista de Productos
      </Link>   
      <Link to='/admin/categoriesList'
        className='BotonAdmin'
        role="button">Lista de Categorias
      </Link>   
      <Link to='/admin/characteristicsList'
        className='BotonAdmin'
        role="button">Lista de Características
      </Link>   
      <Link to='/admin/userList'
        className='BotonAdmin'
        role="button">Usuarios
      </Link>           
      </div>
    </MenuAdmin>
  )
}

export default Admin

const MenuAdmin = styled.div`
  margin: auto;
  padding: 2rem;
  border-radius: 20px;
  display: block;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 100px;
  background-color: white;
  color: black;
  width: 500px;
  .BotonAdmin{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    margin: auto;
    border: solid .1px gray;
    border-radius: 10px;
    padding: 1rem;
    background-color: black;
    color: white;
  }
  .MenuDeAdmin{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 40px;
    gap: 30px;
  }
  @media (max-width: 768px) {
    .MenuAdmin {
      display: none;
    }
  }
`
