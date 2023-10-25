import React from 'react';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from "axios";

const Cards = () => {
    const [productos, setProductos] = useState([]);
    const [tablaProductos, setTablaProductos]= useState([]);
    const petitionGet=()=>{
        axios.get('src/instrumentos.json')
        .then(response=>{
            console.log(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        petitionGet();
      },[])
  return (
    <Recomendaciones>
        <div className='Productos'>
            <h2>RECOMENDACIONES</h2>
            <div>

            </div>

        </div>
    </Recomendaciones>
  )
}

export default Cards

const Recomendaciones = styled.div`
    margin: auto;
    width: 100vw;
    padding: 1rem;
    background-color: white;
    h2{
        margin: 2rem;
        padding: 1rem;
        color: black;
        border-bottom: solid;
        font-family: 'Concert One', sans-serif;
        font-size: 2rem;

    }
    


`