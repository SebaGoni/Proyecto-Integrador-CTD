import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../components/utils/global_context';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';


const Cards = () => {
  const { getProductosAleatorios, productosAleatorios } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      // Llama a la función getProductosAleatorios solo una vez al cargar el componente
      getProductosAleatorios();
      setLoaded(true);
    }
  }, [getProductosAleatorios, loaded]);

  return (
    <Recomendaciones>
      <div className='Productos'>
        <TitleContainer>
          <h2>RECOMENDACIONES</h2>
          <div className='pages'>
            <Link to='/'>
                <AiOutlineArrowLeft className='iconArrow'/>
            </Link>
            <Link to='/'>
                <AiOutlineArrowRight className='iconArrow'/>
            </Link>
          </div>
        </TitleContainer>
        <div className='container-items'>
          {productosAleatorios.map(product => (
            <Link className='link' to={`/details/${product.id}`} key={product.id}>
              <div className='item'>
                <figure>
                  <img src={product.image} alt={product.title} className='cardImage'/>
                </figure>
                <div className='info-product'>
                  <h3>{product.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link className='linkProducts' to={'/products'}>
            <h2 className='titleProducts'>Ver todos los productos</h2>
        </Link>
      </div>
    </Recomendaciones>
  );
};

export default Cards;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid black;
  margin: 2rem;
  padding: 1rem 1rem 0 1rem;
  h2{
    color: black;
    font-family: 'Poppins', sans-serif;
    @media(min-width: 1000px){
      font-size:2rem;
    }
    @media(max-width: 1000px){
      font-size:1.8rem;
      text-align: center;
      
    }
  }
  .pages{
    @media(max-width: 700px){
      display: none;
    }
  }
  .iconArrow{
    margin-right: 2rem;
    font-size: 2.5rem;
    color: black;
    cursor: pointer;
  }
`

const Recomendaciones = styled.div`
    margin: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius:  20px;
    display: block;
    .link{
      text-decoration: none;
    }
    .container-items{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .item{
        border-radius: 20px;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
        flex: 0 0 calc(50% - 50px);
        cursor: pointer;
        text-align: center;
        height: 600px;
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
      height: 400px;
      width: 400px;
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
    }

    .titleProducts:hover{
      background-color: #000000ec;
      
    }
    
`