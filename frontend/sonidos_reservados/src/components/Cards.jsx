import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalContext } from '../components/utils/global_context';

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
        <h2>RECOMENDACIONES</h2>
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
      </div>
    </Recomendaciones>
  );
};

export default Cards;



const Recomendaciones = styled.div`
    margin: 2rem;
    padding: 1rem;
    background-color: white;
    display: block;
    h2{
        margin: 2rem;
        padding: 1rem;
        color: black;
        border-bottom: solid;
        font-family: 'Concert One', sans-serif;
        font-size: 2rem;
    }
    .link{
      text-decoration: none;
    }
    .container-items{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .item{
        border-radius: 20px;
        justify-content: center;
        align-items: center;
        border-bottom: solid gray;
        flex: 0 0 calc(50% - 50px);
        margin: 5px;
        cursor: pointer;
        width: 600px;
        height: 600px;
    }
    h3{
        margin: 2rem;
        padding: 1rem;
        color:black;
        font-size:1.5rem;
        font-family: 'Concert One', sans-serif;
    }

    .cardImage{
      height: 400px;
      width: 400px;
      object-fit: cover;
    }
    
`