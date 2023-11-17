import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalContext } from './utils/global_context';
import { useState, useContext, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai'


const ListaProductos = () => {
  
  const { productos, getProductos, deleteProducto } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      if (!loaded) {
        getProductos();
        setLoaded(true);
      }
    }, [getProductos, productos]);

  return (
    <ProductContainer>
      <Link to='/admin'>
        <AiOutlineArrowLeft className='iconArrow'/>
      </Link>
      <h2>Productos</h2>
      <table className='TablaDeProductos'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Categoria</th>
            <th scope='col'>Descripción</th>
            <th scope='col'>Precio</th>
          </tr>
        </thead>
        <tbody>
            {productos.map((producto) => (
                    <tr key={producto.id} className='thUsuarios'>
                        <th>{producto.id}</th>
                        <td>{producto.title}</td>
                        <td>{producto.categoria.nombre}</td>
                        <td> {producto.description.length > 20
                  ? `${producto.description.slice(0, 20)}...`
                  : producto.description}</td>
                        <td>${producto.price}</td>
                        <td>
                            <Link to={`/admin/${producto.id}/editar`}
                                className='BotonEditar'
                                role='button'>
                                Editar
                            </Link>
                        </td>
                        <td>
                            <button
                                type="button"
                                className='BotonEliminar'
                                onClick={()=>{deleteProducto(producto.id)}}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                )
            )}
        </tbody>
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
  margin: 1rem 2rem 1rem 2rem;
  padding: 2rem;
  .iconArrow{
      margin-right: 2rem;
      font-size: 2rem;
      color: black;
      cursor: pointer;
    }
  h2{
    text-align: center;
  }
  table, th, tr {
    text-align: center;
    border-bottom: solid .1px #e7e7e7;
    padding: 2rem;
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

.BotonEditar{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #32CD32;
  padding: .5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
}
.BotonEliminar{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF5733;
  padding: .5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  margin-left: 1rem;
  color: white;
  cursor: pointer;
}
`

