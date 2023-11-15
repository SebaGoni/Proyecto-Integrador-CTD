import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalContext } from './utils/global_context';
import { useState, useContext, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ListaUsuarios = () => {

    const { usuarios, getUsuarios, deleteUsuario } = useContext(GlobalContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
          getUsuarios();
          setLoaded(true);
        }
      }, [getUsuarios, usuarios]);

  return (
    <UserContainer>
      <Link to='/admin'>
        <AiOutlineArrowLeft className='iconArrow'/>
      </Link>
      <h2>Usuarios</h2>
      <table className='TablaDeProductos'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Apellido</th>
            <th scope='col'>Email</th>
            <th scope='col'>Rol</th>
          </tr>
        </thead>
        <tbody>
            {usuarios.map((usuario) => (
                <>
                    <tr className='thUsuarios'>
                        <th>{usuario.id}</th>
                        <td>{usuario.firstname}</td>
                        <td>{usuario.lastname}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.role}</td>
                        <td>
                            <Link to={`/admin/${usuario.id}/editar`}
                                className='BotonEditar'
                                role='button'>
                                Editar
                            </Link>
                        </td>
                        <td>
                            <button
                                type="button"
                                className='BotonEliminar'
                                onClick={()=>{deleteUsuario(usuario.id);}}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </>
                )
            )}
        </tbody>
      </table>
    </UserContainer>
  )
}

export default ListaUsuarios

const UserContainer = styled.div`   
  background-color: white;
  border-radius: 20px;
  color: black;
  margin: 30vh 2rem 1rem 2rem;
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
