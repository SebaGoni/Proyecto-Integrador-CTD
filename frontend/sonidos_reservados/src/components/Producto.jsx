import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';

const Producto = ({index, id, nombre, categoria, precio, imagen, onDelete}) => (
      <tr>
        <th scope='row'>{index +1}</th>
        <td>{nombre}</td>
        <td>{categoria}</td>
        <td>{precio}</td>
          <StyledTd>
          <Link to={`/Admin/${id}/editar`}
            className='BotonEditar'
            role='button'>
            Editar
          </Link>
          <button
          type="button"
          className='BotonEliminar'
          onClick={()=>{onDelete(id);}}>
          Eliminar
          </button>
          </StyledTd>
      </tr>
)

export default Producto;

const StyledTd = styled.td`
  diplay: flex;
  justify-content: space-between;
  .BotonEditar{
    background-color: #32CD32;
    padding: .5rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
  }
  .BotonEliminar{
    background-color: #FF5733;
    padding: .5rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    margin-left: 1rem;
    color: white;
  }

`
