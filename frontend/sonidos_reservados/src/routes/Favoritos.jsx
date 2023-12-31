import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../components/utils/global_context';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaRegHeart, FaHeart, FaFacebookSquare, FaInstagram, FaWhatsapp, FaShareAlt, FaTwitterSquare } from "react-icons/fa";
import styled from 'styled-components';

const Favoritos = () => {

    const { productosFavoritos, eliminarProductoFavorito, agregarProductoFavorito, token } = useContext(GlobalContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showShareButtons, setShowShareButtons] = useState(false);
    const [customMessage, setCustomMessage] = useState('');

  
    const calcularPromedio = (ratings) => {
      const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
      return sum / ratings.length;
    };
  
    const estaEnFavoritos = (productId) => {
      return productosFavoritos.some(producto => producto.id === productId);
    };

    const handleEliminarFavorito = (idProducto) => {
      eliminarProductoFavorito(idProducto);
    };
  
    const handleAgregarFavorito = (producto) => {
      agregarProductoFavorito(producto);
    };

    const openShareButtons = (product) => {
      setSelectedProduct(product);
      setShowShareButtons(true);
      setCustomMessage('');
    };
  
    const closeShareButtons = () => {
      setSelectedProduct(null);
      setShowShareButtons(false);
      setCustomMessage('');
    };
  
    const shareOnInstagram = (productId) => {
      const productUrl = encodeURIComponent(`http://sonidos-reservados-front.s3-website-us-east-1.amazonaws.com/details/${productId}`);
      const instagramUrl = `https://www.instagram.com/share?url=${productUrl}`;
      window.open(instagramUrl, '_blank');
    };
  
    const shareOnFacebook = (productId) => {
      const encodedMessage = encodeURIComponent(customMessage || ''); // Encodificar el mensaje personalizado
      const productUrl = encodeURIComponent(`http://sonidos-reservados-front.s3-website-us-east-1.amazonaws.com/details/${productId}`); // Agregar el ID del producto si es necesario
      const facebookUrl = `https://www.facebook.com/sharer.php?u=${productUrl}&quote=${encodedMessage}`;
      window.open(facebookUrl, '_blank');
    };
    
    const shareOnWhatsApp = (productId, customMessage) => {
      const productPageUrl = `http://sonidos-reservados-front.s3-website-us-east-1.amazonaws.com/details/${productId}`;
      const additionalText = customMessage ? encodeURIComponent(customMessage) : '';
      const whatsappUrl = `https://wa.me/?text=${additionalText}%20${productPageUrl}`;
      window.open(whatsappUrl, '_blank');
  };
  
  
    const shareOnTwitter = (productId) => {
      const productUrl = encodeURIComponent(`http://sonidos-reservados-front.s3-website-us-east-1.amazonaws.com/details/${productId}`);
      const twitterUrl = `https://twitter.com/intent/tweet?url=${productUrl}`;
      window.open(twitterUrl, '_blank');
    };

  return (
    <Recomendaciones>
      <div className='productos'>
        <h2>PRODUCTOS FAVORITOS</h2>
        <div className='container-items'>
          {productosFavoritos.map(product => (
            <div className='item' key={product.id}>
            <figure>
              <img src={product.image} alt={product.title} className='cardImage' />
            </figure>
            <div className='info-product'>
              <Link className='link' to={`/details/${product.id}`} key={product.id}>
                <h3>{product.title}</h3>
              </Link> 
            </div>
            {token && (
              <>
                {estaEnFavoritos(product.id) ? (
                  <FaHeart className='heartIconFilled' onClick={() => handleEliminarFavorito(product.id)} />
                ) : (
                  <FaRegHeart className='heartIconFilled' onClick={() => handleAgregarFavorito(product)} />
                )}
              </>
            )}
              <ShareButtonContainer>
                <FaShareAlt className='iconShare' onClick={() => openShareButtons(product)} />
              </ShareButtonContainer>
              {/* Ventana de compartir */}
              {showShareButtons && selectedProduct === product && (
                <div className='shareButtons'>
                  <img src={product.image} alt={product.title} className='productImage' />
                  <h4 className='productTitle'>{product.title}</h4>
                  <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} placeholder="Escribe tu mensaje personalizado" rows={4} cols={50} />
                  {/* Botones para compartir */}
                  <div className='divIcons'>
                      <FaFacebookSquare className='icons' onClick={() => shareOnFacebook(product.id)} />
                      <FaInstagram className='icons'  onClick={() => shareOnInstagram(product.id)} />
                      <FaWhatsapp className='icons'  onClick={() => shareOnWhatsApp(product.id, customMessage)} />
                      <FaTwitterSquare className='icons' onClick={() => shareOnTwitter(product.id)} />
                  </div>
                  <button className='closeButton' onClick={closeShareButtons}>Cerrar</button>
                </div>
              )}
          </div>
          ))}
        </div>
      </div>
  </Recomendaciones>
  )
}

export default Favoritos

const Recomendaciones = styled.div`
    margin: 12rem 2rem 2rem;
    padding: 1rem;
    background-color: white;
    border-radius:  20px;
    display: block;
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
    .link {
      color: #000000;
      border-bottom: 1px solid transparent; 
      text-decoration: none;
    }
    .stars {
      position: absolute;
      top: 45px;
      left: 40px;
      color: #3F51B5;
      font-size: 20px;
      @media (max-width: 430px) {
        font-size: 15px;
      }
    }
    .heartIconFilled{
      position: absolute;
      top: 40px;
      right: 40px;
      color: #3F51B5;
      font-size: 40px;
      cursor: pointer;
      transition: transform 0.3s ease;
      @media (max-width: 430px) {
        font-size: 30px;
      }
    }
    .heartIconFilled:hover{
      transform: scale(1.05); 
    }
    .container-items{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .item{
        position: relative;
        padding-top: 4.5rem;
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
        @media(min-width: 1000px){
          width: 40vw; 
          margin:1rem;
        }
        @media(max-width: 1000px){
          width: 70vw;
          margin:auto;
        }
    }
    .info-product{
      margin: 0;
      @media(max-width: 1000px){
          margin-top: 30px;
        }
      @media(max-width: 600px){
        margin-top: 0;
      }
    }
    h3{
        margin: 2rem;
        padding: 1rem;
        color:black;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        letter-spacing: 1px;
        @media(min-width: 1000px){
          font-size:1.5rem;
        }
        @media(max-width: 1000px){
          font-size:1rem;
        }
    }

    .cardImage{
      height: 220px;
      width: 220px;
      object-fit: cover;
      @media(max-width: 1000px){
        width: 500px;
        margin: 0;
        object-fit: contain;
        }
        @media(max-width: 600px){
        width: 50vw;
        margin: 0;
        object-fit: contain;
        }
        
    }

    .linkProducts{
      text-decoration: none;
    }
    .productTitle{
      color: #ffffff;
    }
    .divIcons{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
    .icons{
      font-size: 30px;
      cursor: pointer;
    }
    .titleProducts{
      text-align: center;
      border-radius: 20px;
      color: white;
      background-color: black;
      transition: background-color 300ms ease-in-out;
      padding: 20px;
    }

    .titleProducts:hover{
      background-color: #000000ec;
    }
    .shareButtons{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px; /* Ancho de la ventana */
    height: 400px; /* Alto de la ventana */
    padding: 20px;
    background-color: #3f51b5; /* Fondo blanco con transparencia */
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    @media (max-width: 430px) {
      width: 300px;
      height: 400px; 
    }
    textarea{
      @media (max-width: 430px) {
        width: 250px;
      
      }
    }
    } 
    .closeButton{
      padding: 10px 20px;
      width: 200px;
      border: none;
      border-radius: 5px;
      background-color: #ffffff;
      color: #3f51b5;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
    }
    .IconRedes{
    width: 30px;
    height: 30px;
    cursor: pointer;
    }
    .productImage{
    width: 100px;
    height: 100px;
    object-fit: cover;
    }
    `
    
    const ShareButtonContainer = styled.div`
    position: absolute;
    top: 45px;
    right: 95px;
    transition: transform 0.3s ease;
    &:hover{
      transform: scale(1.05);
    }
      @media (max-width: 430px) {
        top: 43px;
        right: 90px;
      }
    .iconShare {
      cursor: pointer;
      color: #3F51B5;
      font-size: 30px;
      @media (max-width: 430px) {
        font-size: 25px;
      }
  }
`