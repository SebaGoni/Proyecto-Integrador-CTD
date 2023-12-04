import React from 'react';

const phoneNumber = '+542236823388'; // Aquí fija el número de teléfono

const WhatsAppButton = () => {
    const whatsappLink = 'https://wa.me/' + phoneNumber;
  
    const handleClick = () => {
      // Lógica adicional, si es necesaria antes de redirigir a WhatsApp
      // Por ejemplo, validación de número o seguimiento de eventos
    };
  
    return (
      <a href={whatsappLink} target="_blank" onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 100,
        width: 50,
        height: 50,
        backgroundColor: '#000000',
        padding: '10px',
        borderRadius: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <img
            className='img'
            src="https://sonidos-reservados.s3.amazonaws.com/imgFront/wsBtn.png"
            alt="WhatsApp"
            style={{
                zIndex: 100,
                width: 40,
                height: 40,
              }}
        />
      </a>
    );
  };
  
  export default WhatsAppButton;
