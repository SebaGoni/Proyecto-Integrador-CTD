import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Registro = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        role: 'USER',
      });
      const [successMessage, setSuccessMessage] = useState('');
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const submitForm = async () => {
        const jsonObject = formData;
    
        try {
          const response = await fetch('http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject),
          });
    
          if (response.status === 200) {
            setSuccessMessage('Registro exitoso.');
            navigate('/')
          } else {
            // Manejar otros códigos de estado aquí
          }
        } catch (error) {
          console.error('Error al registrar:', error);
        }
      };

  return (
    <FormContainer>
      <form>
      <h2>Registro de Usuario</h2>
        <div className='input-container'>


            <div className='input-row'>
                <label htmlFor="firstname">Nombre:</label>
                <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleInputChange} required />
            </div>

            <div className='input-row'>
                <label htmlFor="lastname">Apellido:</label>
                <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} required />
            </div>

            <div className='input-row'>
                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            
            <div className='input-row'>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
        </div>
        <button className="BotonDeIngreso" type="button" onClick={submitForm}>Registrar</button>
      <p id="successMessage" style={{ display: successMessage ? 'block' : 'none', color: 'green' }}>{successMessage}</p>
      </form>

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
    height: 500px;
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