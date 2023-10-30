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

const BlackFooter= styled.div`
    background-color: black;
    color: white;
    height: 350px;
    margin-left: -10px;
    margin-right: -10px;
    bottom: 1px;
    .LogoFooter{
        margin-top: 1rem;
        padding: 1rem;
    }
    p{
        margin-left:1rem;
    }

`
