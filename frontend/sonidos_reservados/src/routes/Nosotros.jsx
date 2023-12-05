import React from 'react'
import styled from 'styled-components'

const Nosotros = () => {
  return (
        <UsContainer>
            <h2>Equipo 5</h2>
            <p>Integrantes que participaron en el sprint y roles que asumieron:</p>
            <ul>
                <li>Sebastian Goñi (TL Backend)</li>
                <li>Facundo Recabarren (TL Frontend)</li>
                <li>Daniel Pomareda (TL Testing)</li>
                <li>Amy Montenegro (TL Ref UX-UI)</li>
            </ul> 
        </UsContainer>      
  )
}

export default Nosotros
const UsContainer = styled.div`
    border-radius:20px;
    margin: 200px 100px 100px 100px;
    height: 400px;
    background-color: white;
    color: black;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
    @media (max-width: 786px) {
      margin-top: 45vh;
      height: 80vh;  
      font-size: 1.5rem;
    }
    li{
      margin: auto;
      padding: .3rem;
      list-style-type: none;
      border-bottom: solid .2px #e7e7e7;
      width: 400px;
      @media (max-width: 786px) {
      width: 45vw;  
      margin-left: -.8rem;
      text-align: start;
    }
    }
    `