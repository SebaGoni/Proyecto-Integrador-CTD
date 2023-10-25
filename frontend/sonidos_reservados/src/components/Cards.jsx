import React from 'react';
import styled from "styled-components";
import { data } from '../data';

const Cards = () => {
  return (
    <Recomendaciones>
        <div className='Productos'>
            <h2>RECOMENDACIONES</h2>
            <div>
                <div className='container-items'>
                    {data.map(product =>
                        <div className='item' key={product.id}>
                            <figure>
                                <img src={product.image} alt={product.title} height="400px"/>
                            </figure>
                            <div className='info-product'>
                                <h3>{product.title}</h3>
                            </div>
                        </div>
                    )
                    }                   

                </div>

            </div>

        </div>
    </Recomendaciones>
  )
}

export default Cards

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
    }
    h3{
        margin: 2rem;
        padding: 1rem;
        color:black;
        font-size:1.5rem;
        font-family: 'Concert One', sans-serif;
    }

    


`