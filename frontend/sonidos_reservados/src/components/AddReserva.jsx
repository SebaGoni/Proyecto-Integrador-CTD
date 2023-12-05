import styled from 'styled-components';
import Swal from 'sweetalert2';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../components/utils/global_context';

function AddReserva() {
  
  const storedData = localStorage.getItem('reservaData');
  const parsedData = JSON.parse(storedData);

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

  return (
    <NuevoContainer>
      <ContainerForm>
        <div>
          <h1>Confirmación de Reserva</h1>
          <p>Producto id: {parsedData ? parsedData.idProducto : 'N/A'}</p>
          {datosProducto && datosProducto.image && (
            <img
              src={datosProducto.image}
              alt="Imagen del producto"
              style={{ width: '100px', height: '100px' }}
            />
          )}
          <p>Nombre: {datosProducto ? datosProducto.title : 'N/A'}</p>
          <p>Fecha de inicio: {parsedData ? parsedData.fechaInicio : 'N/A'}</p>
          <p>Fecha de fin: {parsedData ? parsedData.fechaFin : 'N/A'}</p>
        </div>
      </ContainerForm>
      <Button onClick={handleConfirmReserva}>Confirmar Reserva</Button>
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
  @media (max-width: 786px) {
    margin-top:45vh;
  }

  h1 {
    display: block;
    width: 1200px;
  }

  .BotonAtras {
    background-color: #7e57c2;
    margin-left: 50rem;
    padding: 0.3rem 2rem;
    color: white;
    border-radius: 30px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: auto;
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
  .input-row {
    margin: auto;
    width: 900px;
    margin: 1rem;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;

    input {
      margin: 1rem;
      padding: 0.3rem;
      width: 70%;
    }
    textarea {
      margin: 1rem;
      padding: 0.3rem;
      width: 70%;
      height: 100px;
    }
  }
`;
