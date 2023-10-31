import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalContext } from '../components/utils/global_context';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Cards = () => {

  const { productos } = useContext(GlobalContext);
  const [shuffledData, setShuffledData] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray(productos);
    const firstTenRandom = shuffled.slice(0, 10);
    setShuffledData(firstTenRandom);
  }, [productos]);

  return (
    <Recomendaciones>
      <div className='Productos'>
        <h2>RECOMENDACIONES</h2>
            <div className='container-items'>
                {shuffledData.map(product => (
                <Link className='link' to={`/details/${product.id}`}>
                  <div className='item' key={product.id}>
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