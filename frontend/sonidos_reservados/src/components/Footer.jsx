import React from 'react';
import styled from "styled-components";

const logoFooterColor = 'https://sonidos-reservados.s3.amazonaws.com/imgFront/SonidosreservadosFooterV2.png'
const Footer = () => {
  return (
    <BlackFooter>
        <div className='foot-container'>
            <img className='LogoFooter' src={logoFooterColor} alt='Logo de colores' height="240px"/>
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
    width: 105%;
    margin-left: -10px;
    margin-right: -10px;
    .LogoFooter{
        margin-top: 1rem;
        padding: 1rem;
    }
    p{
        margin-left:1.5rem;
    }
    @media(min-width: 1000px){
          font-size:.7rem;
          font-style: italic;
        }
        @media(max-width: 1000px){
          font-size:0.4rem;
          text-align: center;
        }

`
