import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ReservasUsuario = () => {
  const [reservas, setReservas] = useState([]);
  const userId = JSON.parse(localStorage.getItem('id'));
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroFinalizado, setFiltroFinalizado] = useState('');
  const [reservasMostradas, setReservasMostradas] = useState([]);

  const [puntuadas, setPuntuadas] = useState(() => {
    const storedPuntuadas = localStorage.getItem('puntuadas');
    return storedPuntuadas ? JSON.parse(storedPuntuadas) : {};
  });

  const reservasFiltradas = () => {
    let reservasFiltradas = [...reservas];
  
    if (filtroFecha === 'recientes') {
      reservasFiltradas = reservasFiltradas.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
    } else if (filtroFecha === 'antiguas') {
      reservasFiltradas = reservasFiltradas.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
    }
  
    if (filtroFinalizado === 'finalizada') {
      reservasFiltradas = reservasFiltradas.filter((reserva) => reserva.estadoReserva === "FINALIZADA");
    } else if (filtroFinalizado === 'pendiente') {
      reservasFiltradas = reservasFiltradas.filter((reserva) => reserva.estadoReserva !== "FINALIZADA");
    }
  
    return reservasFiltradas;
  };
  

  useEffect(() => {
    const reservasMostradas = reservasFiltradas();
    setReservasMostradas(reservasMostradas);
  }, [reservas, filtroFecha, filtroFinalizado]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <h2>RESERVAS REALIZADAS</h2>
      <div className='filters'>
        <select value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)}>
          <option value="recientes">Recientes</option>
          <option value="antiguas">Antiugas</option>
        </select>
        <select value={filtroFinalizado} onChange={(e) => setFiltroFinalizado(e.target.value)}>
          <option value="all">Todas</option>
          <option value="finalizada">Finalizadas</option>
          <option value="pendiente">Pendientes</option>
        </select>
      </div>
      <ReservasList>
        {reservasMostradas.map((reserva, index) => (
          <Reserva key={reserva.id}>
            <figure>
              <img
                src={reserva.producto.image}
                alt="Imagen del producto"
                className='cardImage'
              />
            </figure>
            <div className='infoProduct'>
              <p className='titleProduct'>{reserva.producto.title}</p>
              <div className='divInfo'>
                <p className='dateReserva'>{reserva.fechaInicio} / {reserva.fechaFin}</p>
                <p className='stateTitle'>RESERVA <span className='stateReserva'>{reserva.estadoReserva}</span></p>
              </div>
              {reserva.estadoReserva === 'FINALIZADA' && (
                <button
                onClick={() => {
                  if (!puntuadas[index]) {
                    puntuarProducto(reserva.id, reserva.producto.id, index);
                  }
                }}
                className='btn'
                >
                  {puntuadas[index] ? <span className='productoPuntuado'>Producto ya puntuado</span> : <span className='productoNoPuntuado'>Puntuar producto</span>}
                </button>
              )}
            </div>
          </Reserva>
        ))}
      </ReservasList>
    </NuevoContainer>
    
  );
};

export default ReservasUsuario;

const NuevoContainer = styled.div`
  position: relative;
  background-color: white;
  color: black;
  margin: 12rem 2rem 2rem;
  padding: 2rem;
  border-radius:  20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  
  h2{ 
      color: black;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      letter-spacing: 3px;
      margin: 1.5rem;
      padding:1rem;
      border-bottom: solid gray 1px;
      @media(min-width: 1000px){
        font-size:2.2rem;
      }
      @media(max-width: 1000px){
        font-size:2.2rem;
        text-align: center;  
      }
      @media (max-width: 430px){
        font-size: 1.2rem; 
      }
    }
  .filters{
    position: absolute;
    top: 60px;
    right: 40px;
    display: flex;
    gap: 10px;
    margin: 0 0 1.5rem 1.5rem;
    padding:1rem;
    @media(max-width: 1000px){
        position: static;
        justify-content: center;
        align-items: center;
        margin: 0 0 1.5rem 0;
    }
    select{
      outline: none;
      border: #3F51B5 solid 3px;
      text-align: center;
      color: #3F51B5;
      cursor: pointer;
      font-weight: 600;
      padding: 5px;
      transition: border 0.3s ease;
    }
  }
  .filters select:hover{
    border: #7e57c2 solid 3px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
`;

const Reserva = styled.div`
  position: relative;
  padding: 1rem 0;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.5);
  -webkit-box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.5);
  flex: 0 0 calc(50% - 50px);
  text-align: center;
  height: 400px;
  width: 300px;
  @media(max-width: 1000px){
      width: 500px;
  }
  .infoProduct{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
  }
  .titleProduct{
    color: black;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    margin: 0;
    letter-spacing: 1px;
    @media(max-width: 600px){
        font-size: .8rem;
    }
  }
  .divInfo{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 1rem 0;
  }
  .dateReserva{
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
    color: #3f51b5;
    width: fit-content;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    border: 3px solid;
    border-image: linear-gradient(#7E57C2 50%, #3F51B5);
    border-image-slice: 1;
    @media(max-width: 600px){
        font-size: .8rem;
    }
  }
  .cardImage{
      height: 150px;
      width: 150px;
      object-fit: cover;
      @media(max-width: 1000px){
        width: 400px;
        margin: 0;
        object-fit: contain;
        }
        @media(max-width: 600px){
        width: 50vw;
        margin: 0;
        object-fit: contain;
        }
        
    }
    .stateTitle{
      margin: 0;
      font-family: 'Poppins', sans-serif;
      color: #3f51b5;
      font-weight: 600;
      @media(max-width: 600px){
        font-size: .8rem;
    }
    }
    .stateReserva{
      color: #7E57C2;
      font-style: italic;
    }
    .btn{
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 10px 0;
      @media(max-width: 600px){
        font-size: .8rem;
    }
    }
    .productoNoPuntuado{
      width: 100%;
      background-color: #3f51b5;
      padding: 10px 20px;
      color: white;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      border-radius: 10px;
      transition: background-color 0.3s ease;
    }
    .productoNoPuntuado:hover{
      background-color: #7E57C2;
    }
    .productoPuntuado{
      width: 100%;
      cursor: no-drop;
      background-color: transparent;
      border: #3f51b5 solid 3px;
      padding: 10px 20px;
      color: #3f51b5;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      border-radius: 10px;
    }
`;
