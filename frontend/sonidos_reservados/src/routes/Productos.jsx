import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../components/utils/global_context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const Productos = () => {
  const { productos, agregarProductoFavorito, eliminarProductoFavorito, token, productosFavoritos } = useContext(
    GlobalContext
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);
  const [localRatings, setLocalRatings] = useState({});

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

  useEffect(() => {
    currentItems.forEach((product) => obtenerValoraciones(product.id));
  }, [currentItems]);

  return (
    <ProductosStyle>
      <Pagination itemsPerPage={itemsPerPage} totalItems={productos.length} paginate={paginate} currentPage={currentPage} />
      <div className='productos'>
        <div className='container-items'>
          {currentItems.map((product) => (
            <div className='item' key={product.id}>
              <figure>
                <img src={product.image} alt={product.title} className='cardImage' />
              </figure>
              <div className='info-product'>
                <Link className='link' to={`/details/${product.id}`} key={product.id}>
                  <h3>{product.title}</h3>
                </Link>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </ProductosStyle>
  );
};

export default Productos;
    
    
    
    const ProductosStyle = styled.div`
        margin: 2rem;
   
    background-color: white;
    border-radius:  20px;
    display: block;
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
        
    `