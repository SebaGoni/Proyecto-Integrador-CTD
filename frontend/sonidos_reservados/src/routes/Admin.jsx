import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { FaClipboardList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const iconErr = 'https://sonidos-reservados.s3.amazonaws.com/imgFront/error-purple.png';
const Admin = () => {
  return (
    <>
      <MenuAdmin>
        <h2>PANEL DE ADMINISTRACIÓN</h2>
      <div className='MenuDeAdmin'>
        <Link to='/admin/newProduct'
                className='BotonAdmin'
                role="button"><span className='containerIcon'><IoMdAdd className='icon'/></span>Nuevo producto
        </Link>
        <Link to='/admin/productList'
          className='BotonAdmin'
          role="button"><span className='containerIcon'><FaClipboardList className='icon'/></span>Lista de productos
        </Link>   
        <Link to='/admin/newCategorie'
                className='BotonAdmin'
                role="button"><span className='containerIcon'><IoMdAdd className='icon'/></span>Nueva categoria
        </Link>
        <Link to='/admin/categoriesList'
          className='BotonAdmin'
          role="button"><span className='containerIcon'><FaClipboardList className='icon'/></span>Lista de categorias
        </Link> 
        <Link to='/admin/newCharacteristic'
                className='BotonAdmin'
                role="button"><span className='containerIcon'><IoMdAdd className='icon'/></span>Nueva característica
        </Link>  
        <Link to='/admin/characteristicsList'
          className='BotonAdmin'
          role="button"><span className='containerIcon'><FaClipboardList className='icon'/></span>Lista de características
        </Link>   
        <Link to='/admin/userList'
          className='BotonAdmin'
          role="button"><span className='containerIcon'><FaClipboardList className='icon'/></span>Lista de usuarios
        </Link>           
        </div>
      </MenuAdmin>
      <BloqueoAdmin>
      <div className='ErrorIcon'>
                <a href='/'>
                    <img src={iconErr} alt="error" height="80"></img>
                </a>
            </div>
        <h2>Oh no!
          <br/>Lo sentimos, el panel de administración no está habilitado para móvil.</h2>
      </BloqueoAdmin>
    </>
  )
}

export default Admin

const MenuAdmin = styled.div`
  @media (min-width: 786px){
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
    h2{
      margin: 0;
    }
    .containerIcon{
      background-color: white;
      padding: 8px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: scale(1.05); 
      transition: transform 0.3s ease;
    }
    .icon{
      text-align: center;
      color: #3F51B5;
    }
    .BotonAdmin{
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;
      width: 200px;
      margin: auto;
      border: solid .1px gray;
      border-radius: 10px;
      padding: 1rem;
      background-color: black;
      color: white;
      text-decoration: none;
    }
    .BotonAdmin:hover{
      transform: scale(1.05); 
      transition: transform 0.3s ease;
    }
    .MenuDeAdmin{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 40px;
      gap: 20px;
    }
  }
  @media (max-width: 768px) {
      display: none;
    }
`
const BloqueoAdmin = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 768px) {
    display:block;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    margin-top:400px;
    padding:2rem;
    background-color: rgb(255,255,255,0.7);
    border-radius: 20px;
    //text
    font-family: 'Poppins', sans-serif;
    color: purple;
    font-size:1.2rem;
    font-weight: 400;
    text-align: center;
    letter-spacing: 1px;
  }
`
