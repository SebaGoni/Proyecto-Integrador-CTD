import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai'; // Importa el ícono de 'close circle' de React Icons

function Form() {
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);

   const handleInputChange = async (event) => {
    const textoIngresado = event.target.value;
    setBusqueda(textoIngresado);

    if (textoIngresado.length > 2) {
      try {
        const response = await axios.get(`http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos/buscar`, {
          params: { palabrasClave: textoIngresado }
        });

        setSugerencias(response.data);
      } catch (error) {
        // Maneja los errores de la solicitud
        console.error('Error al obtener sugerencias:', error);
      }
    } else {
      setSugerencias([]);
    }
  };

  const clearSearch = () => {
    setBusqueda('');
    setSugerencias([]);
  };

  return (
    <DivBusqueda>
       <div className='containerInput'>
        <StyledInput
          type='text'
          id='busqueda'
          className='form-control inputBuscar'
          value={busqueda}
          placeholder='Busca aquí tu instrumento'
          onChange={handleInputChange}
        />
        {busqueda && ( // Muestra la "x" solo si hay texto en el campo de búsqueda
          <ClearButton onClick={clearSearch}>
            <AiOutlineCloseCircle />
          </ClearButton>
        )}
      </div>
      {busqueda.length > 2 && ( // Only show SugerenciasContainer if there is some text in the input
        <SugerenciasContainer id="sugerencias">
          {sugerencias.map((sugerencia, index) => (
            <Sugerencia key={index}>
              <ProductImage src={sugerencia.image} alt={sugerencia.title} />
              <div>
                <a href={`details/${sugerencia.id}`}>{sugerencia.title}</a>
              </div>
            </Sugerencia>
          ))}
        </SugerenciasContainer>
      )}
    </DivBusqueda>
  );
}

export default Form;


const DivBusqueda = styled.div`
position: relative;
margin-top: 20px;
margin-left: 2rem;
margin-right: 2rem;
background-color: white;
border-radius: 30px;
display: flexbox;
justify-content: space-between;
align-items: center;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  @media(min-width: 900px){   
  input {
    flex: 1; 
    border-radius: 50px;
    border: none; 
    padding: 1.2rem; 
    margin: 0.5rem;
    background-color: white;
    font-family: 'Poppins', sans-serif;
    font-size: .8rem;
    transition: width 0.3s;
    width: 80%;
  }
  input::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5em;
  }
  button {
    width: 10%; 
    border-radius: 50px;
    border: none;
    margin: 0.5rem;
    padding: 0.5rem; 
    background-color: white;
    cursor: pointer;
  }
}
@media(max-width: 900px){   
  input {
    flex: 1; 
    border-radius: 50px;
    border: none; 
    padding: 1.2rem; 
    margin: 0.5rem;
    background-color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: width 0.3s;
    width:60%;
  }
  input::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5em;
  }
  button { 
    width: 10%; 
    border-radius: 50px;
    border: none;
    margin: 0.5rem;
    padding: 0.5rem; 
    background-color: #D9D9D9;
    cursor: pointer;
  }
}
`;

// Estilos para el campo de búsqueda
const StyledInput = styled.input`
  flex: 1; 
  border-radius: 50px;
  border: none; 
  padding: 1.2rem; 
  margin: 0.5rem;
  background-color: #D9D9D9;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: width 0.3s;
  width: 97%; /* Ajusta el ancho del campo de búsqueda */

  /* Estilos para el foco */
  &:focus {
    outline: none; /* Elimina el contorno predeterminado */
    box-shadow: 0 0 0 2px #007BFF; /* Aplica tu propio efecto visual al enfocar */
  }
`;

// Estilos para el contenedor de sugerencias
const SugerenciasContainer = styled.div`
position: absolute;
background-color: white;
border-radius: 5px;
max-height: 250px; /* Altura máxima */
overflow-y: auto; /* Agrega scroll si excede la altura */
padding: 10px;
width: 97%; /* Ancho igual al campo de búsqueda */
top: calc(100%+10px);
z-index: 10;
`;

// Estilos para cada sugerencia
const Sugerencia = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Estilos para la imagen del producto en la sugerencia
const ProductImage = styled.img`
  width: 40px; /* Tamaño más pequeño de la imagen del producto */
  height: auto;
  margin-right: 10px; /* Espaciado entre la imagen y el título */
`;

// Estilos para el botón de limpiar
const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin-right: 10px; // Ajusta el espaciado entre el botón y el campo de búsqueda si es necesario
  font-size: 2em; /* Ajusta el tamaño del ícono */
  color: #888; /* Cambia el color del ícono si es necesario */
`;