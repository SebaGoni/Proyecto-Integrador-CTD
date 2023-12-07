import React from 'react';
import styled from 'styled-components';

const phoneNumber = '+51958307951'; // Aquí fija el número de teléfono

const WhatsAppButton = () => {
    const whatsappLink = 'https://wa.me/' + phoneNumber;
  
    const handleClick = () => {
      // Lógica adicional, si es necesaria antes de redirigir a WhatsApp
      // Por ejemplo, validación de número o seguimiento de eventos
    };
  
    return (
      <Wpp href={whatsappLink} target="_blank" onClick={handleClick}
      >
        <img
            className='img'
            src="https://sonidos-reservados.s3.amazonaws.com/imgFront/wsBtn.png"
            alt="WhatsApp"
            
        />
      </Wpp>
    );
  };
  
  export default WhatsAppButton;

  const Wpp = styled.a`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 100;
    width: 50px;
    height: 50px;
    background-color: #000000;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;

  @media (max-width: 430px) {
    width: 30px;
    height: 30px;
  }

  img {
    z-index: 100;
    width: 30px;
    height: 30px;
    @media (max-width: 430px) {
    width: 20px;
    height: 20px;
    }
  }
  `
