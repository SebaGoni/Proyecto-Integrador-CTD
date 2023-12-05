import React from 'react'
import { useState, useContext } from 'react';
import styled from 'styled-components'
import { GlobalContext } from './utils/global_context';

const InicioSesion = () => {

    const { login } = useContext(GlobalContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
      const submitForm = async (e) => {
        e.preventDefault();
        login({ username, password });
      };  

    return (
        <FormContainer>
            <form className='login-container'>
                <h2>Inicia Sesión</h2>
                <div className='input-container'>
                    <div className='input-row'>
                        <label htmlFor="username">Correo electrónico</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className='input-row'>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button onClick={submitForm} className="BotonDeIngreso">Ingresar</button>
            </form>
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
    @media (max-width: 786px) {
      margin-top: 28vh;
      width: 65vw;
    }
    h2{ 
        border-bottom: solid #E7E7E7;
    }
    .input-container{
        display: flex;
      flex-direction: column;
      gap: 5px;
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