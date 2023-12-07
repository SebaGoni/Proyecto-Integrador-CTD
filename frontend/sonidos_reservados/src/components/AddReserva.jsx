import styled from 'styled-components';
import Swal from 'sweetalert2';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../components/utils/global_context';

function AddReserva() {
  
  const storedData = localStorage.getItem('reservaData');
  const parsedData = JSON.parse(storedData);

  const storedName = localStorage.getItem('firstname');
  const storedLastname = localStorage.getItem('lastname');
  const storedEmail = localStorage.getItem('email');

  const { getProductosById } = useContext(GlobalContext);
  const idProducto = parsedData.idProducto;

  const [datosProducto, setDatosProducto] = useState(null);

  useEffect(() => {
    if (idProducto) {
      getProductosById(idProducto)
        .then(productoData => {
          setDatosProducto(productoData);
        })
        .catch(error => {
          console.error('Error al obtener el producto:', error);
        });
    }
  }, [getProductosById, idProducto]);

  const handleConfirmReserva = async () => {
    try {
      const storedUserData = localStorage.getItem('id');
      const parsedUserData = JSON.parse(storedUserData);
      const idUsuario = parsedUserData;

      const storedToken = localStorage.getItem('token');

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const formattedFechaInicio = formatDate(new Date(parsedData.fechaInicio));
      const formattedFechaFin = formatDate(new Date(parsedData.fechaFin));

      const url = `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/reservas?idProducto=${parsedData.idProducto}&idUsuario=${idUsuario}&fechaInicio=${formattedFechaInicio}&fechaFin=${formattedFechaFin}&estadoReserva=PENDIENTE`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('reservaData');
        Swal.fire({
          title: 'Reserva confirmada',
          text: '¡Tu reserva ha sido confirmada!',
          icon: 'success',
        }).then(() => {
          window.location.href = "/reservations";
        });
      } else {
        localStorage.removeItem('reservaData');
        throw new Error('Error al confirmar la reserva');
      }
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
      Swal.fire({
        title: 'Error al confirmar la reserva',
        text: 'Por favor, intenta nuevamente',
        icon: 'error',
      });
    }
  };
  const handleCancelReserva = () => {
    localStorage.removeItem('reservaData');
    window.history.back();
  };

  return (
    <NuevoContainer>
      <ContainerForm>
        <div>
          <h1>Confirmación de Reserva</h1>
          <p>Producto id: {parsedData ? parsedData.idProducto : 'N/A'}</p>
          <p>Nombre: {datosProducto ? datosProducto.title : 'N/A'}</p>
          {datosProducto && datosProducto.image && (
            <div className="mainImage">
              <img src={datosProducto.image} alt="Imagen principal del producto" />
            </div>
          )}
          <div className="imageGallery">
            {datosProducto && datosProducto.imagenes && datosProducto.imagenes.map((imagen, index) => (
              <div className="imageContainer" key={index}>
                <img
                  src={imagen}
                  alt={`Imagen ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <p>Fecha de inicio: <strong>{parsedData ? parsedData.fechaInicio.split('T')[0] : 'N/A'}</strong></p>
          <p>Fecha de finalización: <strong>{parsedData ? parsedData.fechaFin.split('T')[0] : 'N/A'}</strong></p>
          <h2>Datos del usuario</h2>
          <p>Nombre: {storedName}  {storedLastname}</p>
          <p>Email: {storedEmail}</p>
        </div>
      </ContainerForm>
      <ButtonContainer>
          <CancelButton onClick={handleCancelReserva}>Cancelar</CancelButton>
          <Button onClick={handleConfirmReserva}>Confirmar Reserva</Button>
      </ButtonContainer>
    </NuevoContainer>
  );
}

export default AddReserva;

const NuevoContainer = styled.div`
  background-color: white;
  color: black;
  margin-top: 200px;
  margin-bottom: 50px;
  text-align: left;
  padding: 2rem;
  display: block;
  justify-content: center;

  h1 {
    display: block;
    
  }

  .BotonAtras {
    background-color: #7e57c2;
    margin-left: 50rem;
    padding: 0.3rem 2rem;
    color: white;
    border-radius: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
 
  margin-top: 50px;
  margin-bottom: 50px;
  border: solid 0.1px gray;
  border-radius: 10px;
  padding: 1rem;
  background-color: black;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const ContainerForm = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-right: 20px;

  div {
    text-align: left;
  }

  .mainImage {
    margin-bottom: 10px;
  }

  .mainImage img {
    width: 200px;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .imageGallery {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .imageContainer {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .imageContainer img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;
const CancelButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 200px;
margin-top: 50px;
margin-bottom: 50px;
border: none;
border-radius: 10px;
padding: 1rem;
background-color: #b20e0e;
color: white;
font-size: 1rem;
font-weight: 600;
cursor: pointer;
`;
