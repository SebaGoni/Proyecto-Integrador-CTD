import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../components/utils/global_context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaRegHeart, FaHeart, FaFacebookSquare, FaInstagram, FaWhatsapp, FaShareAlt, FaTwitterSquare   } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Productos = () => {
  const { productos, agregarProductoFavorito, eliminarProductoFavorito, token, productosFavoritos, reservas, getReservas, categorias, getCategorias } = useContext(
    GlobalContext
  );
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [localRatings, setLocalRatings] = useState({});
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customMessage, setCustomMessage] = useState('');

  const filterProducts = () => {
    const filteredByCategory = selectedCategory.length
      ? productos.filter((product) => isCategorySelected(product.categoria.nombre))
      : productos;

    const filteredByDateAndCategory = filterProductsByDate(filteredByCategory);

    return filteredByDateAndCategory;
  };

  const filterProductsByDate = (items) => {
    if (!startDate || !endDate) {
      return items;
    }

    const fechasReservadas = reservas.filter((reserva) => {
      const reservaInicio = new Date(reserva.fechaInicio);
      const reservaFin = new Date(reserva.fechaFin);
      return startDate <= reservaFin && endDate >= reservaInicio;
    });

    const productosReservados = fechasReservadas.map((reserva) => reserva.producto.id);
    const productosReservadosFiltrados = items.filter((producto) => !productosReservados.includes(producto.id));

    return productosReservadosFiltrados;
  };

  const isCategorySelected = (category) => selectedCategory.includes(category);

  const finalFilteredItems = filterProducts();

  const indexOfLastItem2 = currentPage * itemsPerPage;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;
  const currentItems2 = finalFilteredItems.slice(indexOfFirstItem2, indexOfLastItem2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCategorias()
    getReservas()
  }, [reservas, categorias]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDateClick = () => {
    setStartDate('');
    setEndDate('');
  };

  const obtenerValoraciones = async (productId) => {
      const response = await fetch(
        `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/valoraciones/producto/${productId}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const average = calcularPromedio(data);
        setLocalRatings((prevRatings) => ({ ...prevRatings, [productId]: average }));
      }
  };

  const calcularPromedio = (ratings) => {
    const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
    return sum / ratings.length;
  };

  const renderStars = (averageRating) => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.round(averageRating)) {
        starIcons.push(<AiFillStar key={i} className='star' />);
      } else {
        starIcons.push(<AiOutlineStar key={i} className='star' />);
      }
    }
    return <div className='stars'>{starIcons}</div>;
  };

  useEffect(() => {
    currentItems2.forEach((product) => obtenerValoraciones(product.id));
  }, [currentItems2]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const estaEnFavoritos = (productId) => {
    return productosFavoritos.some((producto) => producto.id === productId);
  };

  const handleEliminarFavorito = (idProducto) => {
    eliminarProductoFavorito(idProducto);
  };

  const handleAgregarFavorito = (producto) => {
    agregarProductoFavorito(producto);
  };

  const handleCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    if (event.target.checked) {
      // If the checkbox is checked, add the category to the selected categories
      setSelectedCategory((prevCategories) => [...prevCategories, selectedValue]);
    } else {
      // If the checkbox is unchecked, remove the category from the selected categories
      const updatedCategories = selectedCategory.filter((category) => category !== selectedValue);
      setSelectedCategory(updatedCategories);
    }
    setCurrentPage(1);
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
    const productUrl = encodeURIComponent(`http://localhost:8080/details/${productId}`);
    const instagramUrl = `https://www.instagram.com/share?url=${productUrl}`;
    window.open(instagramUrl, '_blank');
  };

  const shareOnFacebook = (productId, customMessage) => {
    const encodedMessage = encodeURIComponent(customMessage || ''); // Encodificar el mensaje personalizado
    const productUrl = encodeURIComponent(`https://sonidos-reservados.vercel.app`); // Agregar el ID del producto si es necesario
    const facebookUrl = `https://www.facebook.com/sharer.php?u=${productUrl}&quote=${encodedMessage}`;
    window.open(facebookUrl, '_blank');
  };
  
  const shareOnWhatsApp = () => {
    const productPageUrl = window.location.href
    const additionalText = "Holaaaa"
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${additionalText} ${productPageUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const productUrl = encodeURIComponent('URL_DEL_PRODUCTO');
    const twitterUrl = `https://twitter.com/intent/tweet?url=${productUrl}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <>
        <Filter>
        <div className='divFilters'>
          <label className='titleFilter'>Filtrar por categoría</label>
          <div className='divCategorias'>
          {categorias.map((category) => (
            <CheckboxContainer key={category.nombre}>
              <label htmlFor={category.nombre}>{category.nombre}</label>
              <input
                type='checkbox'
                id={category.nombre}
                value={category.nombre}
                checked={isCategorySelected(category.nombre)}
                onChange={handleCheckboxChange}
              />
            </CheckboxContainer>
          ))}
          </div>
          <label className='titleFilter'>Filtrar por fecha disponible</label>
          <div className='divFechas'>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              monthsShown={2}
              onChange={handleDateChange}
              className='datePicker'
              placeholderText='Seleccionar fechas'
            />
            <button className='btnFecha' onClick={handleDateClick}>Quitar fecha</button>
          </div>
        </div>
      </Filter>
      <Pagination itemsPerPage={itemsPerPage} totalItems={finalFilteredItems.length} paginate={paginate} currentPage={currentPage} />
      <ProductosStyle>
        <div className='productos'>
          <div className='container-items'>
            {currentItems2.map((product) => (
              <div className='item' key={product.id}>
                <Link className='link' to={`/details/${product.id}`} key={product.id}>
                  <figure>
                    <img src={product.image} alt={product.title} className='cardImage' />
                  </figure>
                  <h3>{product.title}</h3>
                </Link>
                {localRatings[product.id] && renderStars(localRatings[product.id])}
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
                {showShareButtons && selectedProduct === product && (
                  <div className='shareButtons'>
                    <img src={product.image} alt={product.title} className='productImage' />
                    <h4 className='productTitle'>{product.title}</h4>
                    <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} placeholder="Escribe tu mensaje personalizado"
                            rows={4} cols={50}
                    />
                    <div className='divIcons'>
                      <FaFacebookSquare className='icons' onClick={() => shareOnFacebook(product.id)} />
                      <FaInstagram className='icons'  onClick={() => shareOnInstagram(product.id)} />
                      <FaWhatsapp className='icons'  onClick={() => shareOnWhatsApp(product.id)} />
                      <FaTwitterSquare className='icons' onClick={() => shareOnTwitter(product.id)} />
                    </div>
                    <button className='closeButton' onClick={closeShareButtons}>Cerrar</button>
                  </div>
                )}
              </div>
              
            ))}
          </div>
        </div>
      </ProductosStyle>
    </>
  );
};

export default Productos;
    

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: #ffffff;
  font-weight: 600;
  width: 200px;
  gap: 10px;
  background-color: #3F51B5;
  padding: 10px;
  border-radius: 10px;
  input {
    cursor: pointer;
    width: 15px;
    height: 15px;
    border: none;
  }
`;

const Filter = styled.div`
  background-color: white;
  margin: 250px 2rem 2rem 2rem;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 786px) {
    margin-top: 45vh;
  }
  
  .divFilters{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
  .titleFilter{
    color: #3F51B5;
    font-weight: 600;
    font-size: 20px;
  }
  .datePicker{
    outline: none;
    border: #3F51B5 solid 3px;
    padding: 10px;
    text-align: center;
    color: #3F51B5;
    cursor: pointer;
  }
  .datePicker::placeholder{
    font-weight: 600;
    color: #3F51B5;
  }
  .divCategorias {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

  }
  .divFechas{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .btnFecha{
    font-weight: 600;
    background-color: transparent;
    outline: none;
    border: #b20e0e solid 3px;
    padding: 10px;
    text-align: center;
    color: #b20e0e;
    cursor: pointer;

    @media (max-width: 786px) {
        flex-direction: column;
        align-items: stretch; 
        
    }

  }
`
const ProductosStyle = styled.div`
    margin: 5vh 2rem 2rem 2rem;
    background-color: white;
    border-radius:  20px;
    display: block;
    .filter{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
    }
    .link {
      color: #000000;
      border-bottom: 1px solid transparent; 
    }
    .stars {
      position: absolute;
      top: 45px;
      left: 40px;
      color: #3F51B5;
      font-size: 20px;
    }
    .heartIconFilled{
      position: absolute;
      top: 40px;
      right: 40px;
      color: #3F51B5;
      font-size: 40px;
      cursor: pointer;
    }
    .container-items{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .item{
        position: relative;
        border-radius: 20px;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
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
    h3{
        margin: 2rem;
        padding: 1rem;
        color:black;
        font-family: 'Poppins', sans-serif;
        @media(min-width: 1000px){
          font-size:1.5rem;
        }
        @media(max-width: 1000px){
          font-size:1.3rem;
        }
    }

    .cardImage{
      height: 200px;
      width: 200px;
      object-fit: cover;
      @media(min-width: 1000px){
        
        }
      @media(max-width: 1000px){
        width: 50vw;  
        }
    }

    .linkProducts{
      text-decoration: none;
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
  .iconShare {
    cursor: pointer;
    color: #3F51B5;
    font-size: 30px;
}
`