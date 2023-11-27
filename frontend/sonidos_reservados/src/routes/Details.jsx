import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../components/utils/global_context';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const Details = () => {
  const { getProductosById } = useContext(GlobalContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const [averageRating, setAverageRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      getProductosById(id)
        .then((productData) => {
          setProduct(productData);
          obtenerValoraciones(id);
        })
        .catch((error) => {
          console.error('Error al obtener el detalle del producto', error);
        });
    }
  }, [id, getProductosById]);

  const obtenerValoraciones = (productId) => {
    fetch(`http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/valoraciones/producto/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const ratings = data.map((valoracion) => valoracion.rating);
          const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          const average = sum / ratings.length;
          setAverageRating(average);
        }
      })
      .catch((error) => {
        console.error('Error al obtener las valoraciones', error);
      });
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  const renderStars = (averageRating) => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(averageRating)) {
        starIcons.push(<AiFillStar key={i} className='star' />);
      } else {
        starIcons.push(<AiOutlineStar key={i} className='star' />);
      }
    }
    return (
      <div className='stars'>
        <span className='rating-number'>{Math.round(averageRating)}/5</span>
        {starIcons}
      </div>
    );
  };

  const handleStarClick = () => {
    console.log('Click en el rating');
    fetch(`http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/valoraciones/producto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRatings(data);
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error('Error al obtener las valoraciones', error);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
  };

  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const handleImageChange = (increment) => {
    setCurrentImageIndex((prevIndex) => (prevIndex + increment + product.imagenes.length) % product.imagenes.length);
  };

  return (
    <>
    <DetailContainer>
      <div className='divTitle'>
        <h2 className='title'>{product.title}</h2>
        <Link to='/'>
          <AiOutlineArrowLeft className='iconArrow' />
        </Link>
      </div>
      <div className='divBody'>
        <div className='divBodyImagenes'>
          <div className='img-container'>
            <img className='img1' src={product.image} alt='' />
          </div>
          <div className='divImages'>
            {product?.imagenes && (
              <>
                <div className='divSectionImages1'>
                  {product.imagenes.slice(0, 2).map((img, index) => (
                    <img className='img2' key={index} src={img} alt='' />
                  ))}
                </div>
                <div className='divSectionImages2'>
                  {product.imagenes.slice(2, 4).map((img, index) => (
                    <img className='img2' key={index} src={img} alt='' />
                  ))}
                </div>
              </>
            )}
            <button onClick={openModal2} className='verComentarios'>Ver mas imagenes</button>
            <Modal
              style={{
                content: {
                  top: '60%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  borderRadius: '20px',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'black',
                  textAlign: 'center',
                  width: '500px'
                },
              }}
              isOpen={modalIsOpen2}
              onRequestClose={closeModal2}
            >
              <div className='modal-slider'>
          <AiOutlineArrowLeft onClick={() => handleImageChange(-1)} style={{ fontSize: '30px', backgroundColor: '#3F51B5', padding: '5px', color: 'white', borderRadius: '10px', cursor: 'pointer' }}/>
            <img src={product.imagenes[currentImageIndex]} alt='' style={{ width: '20rem',  height: '20rem', objectFit: 'cover', padding: '15px' }}/>
          <AiOutlineArrowRight onClick={() => handleImageChange(1)} style={{ fontSize: '30px', backgroundColor: '#3F51B5', padding: '5px', color: 'white', borderRadius: '10px', cursor: 'pointer' }}/>
        </div>
        <button onClick={closeModal2} style={{ backgroundColor: '#3F51B5', color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'Poppins', fontSize: '1rem', fontWeight: 600, padding: '10px 30px', cursor: 'pointer' }}>Cerrar</button>
            </Modal>
          </div>
        </div>
      </div>
      <div className='divBodyText'>
        <h2>
          CONOCE UN POCO DE ESTE INSTRUMENTO DE <span style={{ fontStyle: 'italic', color: '#3F51B5' }}>{product.categoria.nombre}</span>
        </h2>
        <p className='description'>{product.description}</p>
        <h2>CARACTERÍSTICAS DEL PRODUCTO</h2>
        <div className='caractDiv'>
          {product.caracteristicas.map((caract, index) =>(
            <div className='caracteristicas' key={index}>
              <h3 className='caractTitle'>{caract.nombre.toUpperCase()}</h3>
              <img className='caractImg' src={caract.image} alt="" />
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <h2>VALORACIONES DEL PRODUCTO</h2>
          {renderStars(averageRating)}
          <button className='verComentarios' onClick={handleStarClick}>Ver comentarios</button>
          <Modal
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              borderRadius: '20px',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              color: 'black',
              textAlign: 'center'
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <ul style={{ padding: 0, listStyle: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
            <hr />
            {ratings.map((rating, index) => (
              
                <li style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'start', alignItems: 'start' }} key={index}>
                  <p><span style={{ fontWeight: 'bold' }}>Usuario</span><span> {rating.reserva.usuario.username}</span></p>
                  <p><span style={{ fontWeight: 'bold' }}>Rating</span><span> {rating.rating}</span></p>
                  <p><span style={{ fontWeight: 'bold' }}>Comentario</span><span> "{rating.comentario}"</span></p>
                  <p><span style={{ fontWeight: 'bold' }}>Fecha de valoración</span><span> {new Date(rating.timestamp).toLocaleDateString()}</span></p>
                </li>
              
            ))}
            <hr />
          </ul>
          <button onClick={closeModal} style={{ backgroundColor: '#3F51B5', color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'Poppins', fontSize: '1rem', fontWeight: 600, padding: '10px 30px', cursor: 'pointer' }}>Cerrar</button>
        </Modal>
        </div>
        <h2 className='price'>Precio por hora: ${product.price}.00</h2>
      </div>
      
    </DetailContainer>
    </>
  );
};

export default Details;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 27vh;
    margin-left: 2rem;
    margin-right: 2rem;
    gap: 2rem;
    font-family: 'Poppins', sans-serif;
    @media(max-width: 786px){
            text-align: center;
            justify-content: center;
        }
    .divTitle{
      background-color: white;
      border-radius: 60px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width:786px) {
        margin-top: 20vh;
      }
    }
    .caractDiv{
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      @media(max-width: 786px){
            justify-content: center;
        }
    }
    .caracteristicas{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
    }
    .caractTitle{
      font-size: 12px;
      @media(max-width: 786px){
            text-align: center;
        }
    }
    .caractImg{
      width: 70px;
      background-color: #3F51B5;
      padding: 15px;
      border-radius: 20px;
    }
   
    .star {
      color: #3F51B5;
    }

    .verComentarios{
      margin-top: 30px;
      background-color: #3F51B5;
      color: white;
      border: none;
      border-radius: 10px;
      font-family: 'Poppins', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      padding: 10px 30px;
      cursor: pointer;
    }
    .title{
      margin-left: 2rem;
      color: black;
      @media(max-width: 500px){
            font-size: 20px;
        }
    }
    .iconArrow{
      margin-right: 2rem;
      font-size: 2rem;
      color: black;
      cursor: pointer;
    }
    ////////////////////////////////////////////////////////////////////////
    .divBody {
      position: relative;
      background-color: white;
      border-radius: 60px;
      width: 100%;
      display: flex;
      justify-content: center; /* Centrar horizontalmente */
      align-items: center; /* Centrar verticalmente */
      flex-wrap: wrap; /* Para que los elementos internos puedan envolver si es necesario */
    }
    .divBodyImagenes{
      display: flex;
      justify-content: center; /* Centrar horizontalmente */
      align-items: center; /* Centrar verticalmente */
      flex-wrap: wrap; /* Para que los elementos internos puedan envolver si es necesario */
      padding: 30px;
    }

    .img-container {
      position: relative;
      width: fit-content;
      padding: 1rem;
    }

    .rating {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
    }

    .rating-number {
      color: white;
      margin-right: 10px;
      padding: 10px; 
      border-radius: 8px; 
      background-color: #3F51B5;
    }

    .divBodyImages{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding: 2rem 0 2rem 0;
      height: 100%;
      width: 100%;
      @media(max-width: 1100px){
            flex-direction: column;
        }
    }

    .img1{
      width: 500px;
      height: 400px;
      object-fit: cover;
      @media(max-width: 600px){
        width: 300px;
        height: 300px;
        }
      @media(max-width: 480px){
        width: 250px;
        height: 250px;
        }
    }

    .divImages{
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .img2{
      object-fit: cover;
      width: 245px;
      height: 245px;
      margin-right: 5px;
      margin-left: 5px;
      @media(max-width: 600px){
        width: 200px;
        height: 200px;
        }
      @media(max-width: 480px){
        width: 150px;
        height: 150px;
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////
    .divBodyText{
      background-color: #D9D9D9;
      border-radius: 60px;
      margin: 1rem;
      width: 96%;
      color: #7E57C2;
      display: flex;
      flex-direction: column;
      padding: 2rem;
      font-size: 1.2rem;
    }
    h3{
      color:black;
      font-style: italic;
    }

    .description{
      color: black;
      font-size: 1.2rem;
    }

    .price{
      color:  #3F51B5;
      text-align: right;
      margin-right: 4rem;
    }
`;

