import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


const InicioSesion = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
      const [errorMessage, setErrorMessage] = useState('');
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const submitForm = async (e) => {
        e.preventDefault();

    try {
      const response = await fetch('http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Inicio de sesión exitoso, obtén el token de la respuesta.
        const data = await response.json();
        const token = data.token;

        // Guarda el token en el localStorage.
        localStorage.setItem('token', token);

        // Redirecciona o muestra un mensaje de éxito.
        alert('Inicio de sesión exitoso');
      } else {
        // Error en las credenciales, muestra un mensaje de error.
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      // Error al realizar la solicitud, muestra un mensaje de error.
      alert('Error al iniciar sesión: ' + error.message);
    }
      };    

    return (
        <FormContainer>
            <form className='login-container'>
                <h2>Inicia Sesión</h2>
                <div className='input-container'>
                    <div className='input-row'>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                    </div>
                    <div className='input-row'>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    </div>
                </div>
                <button onClick={submitForm} className="BotonDeIngreso">Ingresar</button>
            </form>
                <p id="errorMessage" style={{ display: errorMessage ? 'block' : 'none', color: 'red' }}>{errorMessage}</p>
            </FormContainer>
    )
    }

export default InicioSesion

const FormContainer = styled.div`
    border-radius:  20px;
    margin: auto;
    margin-top: 200px;
    margin-bottom: 100px;
    width: 450px;
    height: 400px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
    text-align: center; 
    
    h2{ 
        border-bottom: solid #E7E7E7;
    }
    .input-container{
        margin: 2rem;
    }
    .input-row{
        width: 300px;
        margin: .5rem;
    }
    input{
        border-radius: 10px;
        border: solid .5px #7A7A7A;
        height: 25px;
        width: 250px;
    }
    button{
        background-color: black;
        color: white;
        border-radius: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        padding: 5px 30px;
        cursor: pointer;
    }
    `