import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'


const InicioSesion = () => {

    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");

    return (
        <FormContainer>
            <div className='login-container'>
                <h2>Inicia Sesion</h2>
                <div className='input-container'>
                    <div className='input-row'>
                    <label htmlFor="nombre">Ingresa tu usuario</label>
                    </div>
                    <input type="text" id="nombre" placeholder="Usuario" />
                    <div className='input-row'>
                    <label htmlFor="contrasena">Ingresa tu Contraseña</label>
                    </div>
                    <input type="password" id="contrasena" placeholder="Contraseña" />
                </div>
                <button className="BotonDeIngreso">Ingresar</button>
            </div>
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
    }
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
        
    }
    `