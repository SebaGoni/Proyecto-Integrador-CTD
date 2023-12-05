import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ReservasUsuario = () => {
  const [reservas, setReservas] = useState([]);
  const userId = JSON.parse(localStorage.getItem('id')); // Obtener el ID del usuario desde localStorage

  const [puntuadas, setPuntuadas] = useState(() => {
    const storedPuntuadas = localStorage.getItem('puntuadas');
    return storedPuntuadas ? JSON.parse(storedPuntuadas) : {};
  });

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await fetch(`http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/reservas/usuario/${userId}`);
        const data = await response.json();
  
        if (response.ok) {
          setReservas(data);
          data.forEach((reserva) => {
            if (reserva.fechaFin && new Date(reserva.fechaFin) < new Date()) {
              finalizarReserva(reserva.id, reserva.producto.id);
            }
          });
        } else {
          console.error('Error al obtener las reservas del usuario');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };
  
    if (userId) {
      obtenerReservas();
    }
  }, [userId]);
  

  const finalizarReserva = async (reservaId, idProducto) => {
    try {
      const storedToken = localStorage.getItem('token');
      const idUsuario = JSON.parse(localStorage.getItem('id'));
      
      const url = `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/reservas/${reservaId}?idProducto=${idProducto}&idUsuario=${idUsuario}&estadoReserva=FINALIZADA`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
        },
      });
  
      if (response.ok) {
        console.log('Reserva finalizada:', reservaId);
        // Puedes actualizar el estado o hacer algo adicional si es necesario
      } else {
        throw new Error('Error al finalizar la reserva');
      }
    } catch (error) {
      console.error('Error al finalizar la reserva:', error);
    }
  };

  const puntuarProducto = async (reservaId, productoId, index) => {
    try {
      // Verificar si la reserva está finalizada para permitir puntuar
      const reserva = reservas.find((reserva) => reserva.id === reservaId);
      if (!reserva || reserva.estadoReserva !== 'FINALIZADA') {
        console.log('La reserva no está finalizada. No se puede puntuar.');
        return;
      }

      // Resto del código...
      const storedToken = localStorage.getItem('token');
      const idUsuario = JSON.parse(localStorage.getItem('id'));

      // Abre una ventana emergente para la puntuación
      const rating = prompt('Puntuar el producto (1 a 5):');
      const comentario = prompt('Agregar comentario:');

      // Construye el objeto para enviar a la API
      const data = {
        usuario: { id: idUsuario },
        producto: { id: productoId },
        reserva: { id: reservaId },
        rating: Number(rating),
        comentario,
      };

      const response = await fetch('http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/valoraciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Puntuación realizada con éxito.');
        const newPuntuadas = { ...puntuadas, [index]: true };
        setPuntuadas(newPuntuadas);
        localStorage.setItem('puntuadas', JSON.stringify(newPuntuadas));
      } else {
        console.error('Error al puntuar el producto.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <NuevoContainer>
      <h1>Reservas Realizadas</h1>
      <ReservasList>
        {reservas.map((reserva, index) => (
          <Reserva key={reserva.id}>
            <img
              src={reserva.producto.image}
              alt="Imagen del producto"
              style={{ width: '100px', height: '100px' }}
            />
            <p>Id de la reserva: {reserva.id}</p>
            <p>Nombre del Producto: {reserva.producto.title}</p>
            <p>Fecha de inicio: {reserva.fechaInicio}</p>
            <p>Fecha de fin: {reserva.fechaFin}</p>
            <p>Estado de la Reserva: {reserva.estadoReserva}</p>
            {reserva.estadoReserva === 'FINALIZADA' && (
              <button
              onClick={() => {
                if (!puntuadas[index]) {
                  puntuarProducto(reserva.id, reserva.producto.id, index);
                }
              }}
              style={{
                backgroundColor: '#4CAF50',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
                margin: '5px',
              }}
              >
                {puntuadas[index] ? 'Producto ya puntuado' : 'Puntuar Producto'}
              </button>
            )}
          </Reserva>
        ))}
      </ReservasList>
    </NuevoContainer>
    
  );
};

export default ReservasUsuario;

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

const ReservasList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Reserva = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;
