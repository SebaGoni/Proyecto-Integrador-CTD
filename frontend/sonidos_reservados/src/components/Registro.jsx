import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"; 

const Registro = () => {

    const navigate = useNavigate()

    const initialValues = {
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      role: 'USER',
    };
    
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().matches(/^[A-Za-z]+$/, '*El nombre debe contener únicamente letras').min(2,'*El nombre debe contener 2 o más dígitos'),
        lastname: Yup.string().matches(/^[A-Za-z]+$/, '*El apellido debe contener únicamente letras').min(2,'*El apellido debe contener 2 o más dígitos'),
        email: Yup.string().email('*Correo electrónico no válido').required('El correo electrónico es requerido'),
        password: Yup.string().min(6,'*La contraseña debe contener al menos 6 dígitos'),
    });
    
    const submitForm = async (values) => {
      try {
          const response = await fetch('http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.status === 200) {
            Swal.fire({
              title: 'Registro exitoso',
              text: '¡Bienvenido, inicia sesión!',
              icon: 'success',
            })
            navigate('/login')
          } else {
            Swal.fire({
              title: '¡Error al registrarse!',
              text: 'Intenta nuevamente',
              icon: 'error',
            })
          }
        } catch (error) {
          console.error('Error al registrar:', error);
        }
      };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        <Form>
          <h2>Registro de Usuario</h2>
          <div className='input-container'>
            <div className='input-row'>
              <label htmlFor="firstname">Nombre</label>
              <Field type="text" id="firstname" name="firstname"/>
              <ErrorMessage name="firstname" component="div" className="error" />
            </div>

            <div className='input-row'>
              <label htmlFor="lastname">Apellido</label>
              <Field type="text" id="lastname" name="lastname" />
              <ErrorMessage name="lastname" component="div" className="error" />
            </div>

            <div className='input-row'>
              <label htmlFor="email">Correo Electrónico</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className='input-row'>
              <label htmlFor="password">Contraseña</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
          </div>
          <button className="BotonDeIngreso" type="submit">Registrar</button>
        </Form>
      </Formik>
      </FormContainer>
  )
}

export default Registro;

const FormContainer = styled.div`
    border-radius:  20px;
    margin: auto;
    margin-top: 200px;
    margin-bottom: 100px;
    width: 600px;
    height: 600px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
    text-align: center; 
    h2{ 
        padding-bottom: 5px;
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
    .error {
    color: red;
    font-size: 0.8rem;
    font-style: italic;
    margin-top: 4px; 
    }
    `