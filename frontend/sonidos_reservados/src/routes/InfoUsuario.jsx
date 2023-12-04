import React from 'react'
import { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GlobalContext } from '../components/utils/global_context';
import { IoPerson } from 'react-icons/io5'

const InfoUsuario = () => {

  const navigate = useNavigate()

  const { firstname, lastname, email, userRol } = useContext(GlobalContext);
     
  const reenviarCorreo = async () => {
    const url = 'http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/auth/emailRegistro';
    const data = {
      email: email,
      firstname: firstname,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    if (response.ok) {
      Swal.fire({
        title: 'Envío exitoso',
        text: 'Se ha enviado nuevamente el correo de confirmación',
        icon: 'success',
      }) 
      navigate('/account')
    } else {
      console.error('Failed to send email.');
    }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  return (
    <FormContainer>
        <h2>INFORMACIÓN PERSONAL</h2>
            <div className='divBodyInfo'>
                <div>
                    <IoPerson className='icon'/>
                </div>
                <div className='divImages'>
                    <div className='divSectionImages1'>
                        <h2>Nombre: <span>{firstname}</span></h2>
                        <h2>Apellido: <span>{lastname}</span></h2>
                    </div>
                    <div className='divSectionImages2'>
                        <h2>Correo electrónico: <span>{email}</span></h2>
                        <h2>Rol: <span>{userRol}</span></h2>
                    </div>
                    <button type="button" onClick={reenviarCorreo}>Reenviar correo de confirmación</button>
                </div>
            </div>
    </FormContainer>
    );
};

export default InfoUsuario;

const FormContainer = styled.div`
    border-radius:  20px;
    margin: auto;
    margin: 200px 2rem 50px 2rem;
    height: 400px;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    font-family: 'Poppins', sans-serif;
    text-align: center; 
    .icon{
        font-size: 300px;
        padding: 30px;
        background:#3F51B5;
        background-image: linear-gradient(#7E57C2 50%, #3F51B5);
        border-radius: 100%;
    }
    .divBodyInfo{
        display: flex;
        justify-content: left;
        align-items: center;
        text-align: start;
        gap: 40px;
        padding-top: 40px;
    }
    button{
        margin-top:1rem;
        padding: 1rem;
        background:#3F51B5;
        background-image: linear-gradient(#7E57C2 50%, #3F51B5);
        border-radius: 15px;
        color: white;
        font-size: 1.4rem;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
    }
`
