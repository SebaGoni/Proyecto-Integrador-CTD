import React from 'react';
import styled from "styled-components";

const logoFooterColor = '/src/assets/sonidosReservadosColors.png'
const Footer = () => {
  return (
    <BlackFooter>
        <div className='foot-container'>
            <img className='LogoFooter' src={logoFooterColor} alt='Logo de colores' height="200px"/>
            <p>©2023. Copyright Sonidos Reservados DH</p>
        </div>    
    </BlackFooter>
  )
}

export default Footer

const BlackFooter = styled.div`
    background-color: black;
    color: white;
    height: 350px;
    bottom: 1px;
    font-family: 'Poppins', sans-serif;
    width: 100%;
    .LogoFooter{
        margin-top: 1rem;
        padding: 1rem;
    }
    p{
        margin-left:1rem;
    }
    @media(min-width: 1000px){
          font-size:1.2rem;
        }
        @media(max-width: 1000px){
          font-size:0.8rem;
          text-align: center;
        }

`
