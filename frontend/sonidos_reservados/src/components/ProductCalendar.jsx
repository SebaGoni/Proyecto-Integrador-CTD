import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from '../components/utils/global_context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import styled from "styled-components";
import { MdCancel } from "react-icons/md";

Modal.setAppElement('#root');

const BannerReserva = 'https://sonidos-reservados.s3.amazonaws.com/imgFront/musicians-stage-lights.jpg';
const ProductCalendar = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fechasReservadas, setFechasReservadas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { userRol } = useContext(GlobalContext);
  const { getReservaData } = useContext(GlobalContext);
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    obtenerProductos();
  }, [searchTerm]);
  
  useEffect(() => {
    if (!searchTerm.trim()) {
      setProductos([]);
      return;
    }
  
    obtenerProductos();
  }, [searchTerm]);
  
  

  const obtenerProductos = async () => {
    try {
      if (!searchTerm.trim() || searchTerm.trim().length < 2) {
        return;
      }
  
      const response = await fetch(
        `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos/buscar?palabrasClave=${searchTerm}`
      );
      const data = await response.json();
  
      if (response.ok) {
        setProductos(data);
      } else {
        console.error("Error al obtener productos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleProductSelection = async (productoSeleccionado) => {
    setSelectedProduct(productoSeleccionado);
    setProductos([productoSeleccionado]);
  
    try {
      const response = await fetch(`http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/reservas/producto/${productoSeleccionado.id}`);
      const data = await response.json();
      console.log("Fechas desde el servidor:", data);
    
      if (response.ok) {
        const fechasReservadas = data.map((fecha) => new Date(fecha));
        setFechasReservadas(fechasReservadas);
      } else {
        console.error("Error al obtener las fechas reservadas");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const disableReservedDates = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");

    if (fechasReservadas.length === 0) {
      //const today = moment().format("YYYY-MM-DD");
      return formattedDate;
    }
    

    return !fechasReservadas.some((fecha) => {
      const formattedReservedDate = moment(fecha).add(1, 'day').format("YYYY-MM-DD");
      return formattedReservedDate === formattedDate;
    });
  };

  const handleReserveClick = () => {
    if (selectedProduct && startDate && endDate) {
      // Validar el rol del usuario antes de permitir la reserva
      if (userRol === 'USER') {
        // Realizar la reserva si el rol es USER
        localStorage.setItem('reservaData', JSON.stringify({ idProducto: selectedProduct.id, fechaInicio: startDate, fechaFin: endDate }));
        window.location.href = "/newReservation";
      } else {
        // Mostrar mensaje con SweetAlert si el rol no es USER
        Swal.fire({
          title: 'Acceso no autorizado',
          text: 'Debes iniciar sesión para realizar reservas',
          icon: 'warning',
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor selecciona fechas',
        icon: 'warning',
      });
    }s
  };

  return (
    <ReservaContainer>
      <div className='banner'>
        <a href='/'>
          <img src={BannerReserva} alt="Banner" height="445"></img>
        </a>
      </div>
      <button className="btnReserva" onClick={openModal}>RESERVA TU INSTRUMENTO</button>
      <Modal  style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              borderRadius: '20px',
              marginRight: '-50%',
              marginTop: '30px',
              transform: 'translate(-50%, -50%)',
              color: 'black',
              textAlign: 'center',
              width: '1000px',
              height: '300px',
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}>
      <input
        style={{
          width: "100%",
          padding: "5px 25px 5px 7px",
          boxSizing: "border-box"
        }}
        type="text"
        placeholder="Buscar Producto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          style={{
            position: "absolute",
            top: "50%",
            right: "5px",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "2px"
          }}
          onClick={() => setSearchTerm("")}
        >
          <MdCancel style={{ marginRight: "10px",
            padding: "8px 18px",
            background: "#b20e0e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            fontFamily: 'Poppins',
            fontWeight: 600, }}/>
        </button>
      )}
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {productos.map((producto) => (
        <li key={producto.id} onClick={() => handleProductSelection(producto)}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src={producto.image} alt={producto.title} style={{ width: '50px', height: '50px', marginRight: '20px', cursor: 'pointer' }} />
            <div style={{ cursor: 'pointer' }}>{producto.title}</div>
          </div>
        </li>
      ))}
    </ul>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  
    <button onClick={closeModal} style={{
            marginRight: "10px",
            padding: "8px 18px",
            background: "#b20e0e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            fontFamily: 'Poppins',
            fontWeight: 600,
          }}>Cerrar</button>
      <DatePicker
        showIcon
        icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 48 48"
            >
              <mask id="ipSApplication0">
                <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                  <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                  <path
                    fill="#fff"
                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                  ></path>
                </g>
              </mask>
              <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipSApplication0)"
              ></path>
            </svg>
          }
        selectsRange
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
        onChange={(update) => {
          const [start, end] = update;
          setStartDate(start);
          setEndDate(end);
        }}
        minDate={new Date()}
        filterDate={disableReservedDates}
        placeholderText="Rango de fechas"
      />
      <button onClick={handleReserveClick}style={{
            marginLeft: "10px",
            padding: "8px 18px",
            background: "#3F51B5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            fontFamily: 'Poppins',
            fontWeight: 600,
          }}>Reservar</button>
    </div>
      </Modal>
    </ReservaContainer>
  );
}

export default ProductCalendar;

const ReservaContainer = styled.div`
  display: flex;
  height:450px;
  align-items: center;
  background-color: black; 
  margin-left:-10px;
  width: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  @media (min-width: 786px){
    margin-top: 17vh; 
  }
  @media (max-width: 786px){
    margin-top: 40vh; 
  }
  .banner{
    justify-content: left;
    margin-left: 5%;
  }
  .btnReserva{
    position: absolute;
    cursor: pointer;
    text-align: center;
    border-radius: 20px;
    color: white;
    background-color: rgba(0, 0, 0, 0.4) ;
    border: solid 1px;
    border-color: rgba(255, 255, 255, 0.7);
    padding: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 3px;
    box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
    
    @media (max-width: 900px) {
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
    }
    @media (min-width: 900px) {
      margin-left: 60%;
      margin-top: 30px;
  }
}
`