import React from 'react'
import styled from 'styled-components'

const Nosotros = () => {
  return (
    <main>
        <UsContainer>
            <h2>Equipo 5</h2>
            <p>Integrantes que participaron en el sprint y roles que asumieron:</p>
            <ul>
                <li>Camila Michelle Yeber (Scrum Master)</li>
                <li>Alan Oliva (TL Backend)</li>
                <li>Daniel Pomareda (TL Infraestructura)</li>
                <li>Amy Montenegro (TL Frontend/ Ref UX-UI)</li>
                <li>Sebastian Goñi (TL Backend)</li>
                <li>Gastón Cordoba Redondo (TL Frontend)</li>
                <li>Facundo Maqueda (TL BBDD)</li>
                <li>Facundo Recabarren (TL Frontend)</li>
            </ul> 
        </UsContainer>
             
    </main>
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
    li{
      margin: auto;
      padding: .3rem;
      list-style-type: none;
      border-bottom: solid .2px #e7e7e7;
      width: 400px;
    }
    `