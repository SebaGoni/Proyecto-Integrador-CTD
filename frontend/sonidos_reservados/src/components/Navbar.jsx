import React, {useState} from 'react';
import styled from "styled-components";
import BurgerButton from './BurgerButton';


const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    console.log(clicked);
    const handleClick = () => {
        setClicked(!clicked)
    }
    const iconsr= '/src/assets/soloLogoWhite.png';
    const nombre= '/src/assets/sonidosReservadosTextWhite.png';
  return (
    <>
        <NavContainer>
            <div className='logo'>
                <a href='/'>
                    <img src={iconsr} alt="logo" width="60" height="60"></img>
                    <img src={nombre} alt="sonidos-reservador" height="50"></img>
                </a>
            </div>
            <div className= {`links ${clicked ? "active": "" }`}>
                <a onClick={handleClick} href='/'>Crear Cuenta</a>
                <a onClick={handleClick} href='/'>Iniciar Sesion</a>
            </div>
            <div className='burger'>
                <BurgerButton clicked={clicked} handleClick={handleClick}/>
            </div>
            <BgDiv className={`initial ${clicked ? ' active' : ''}`}></BgDiv>
        </NavContainer>
    </>
  )
}

export default Navbar
    
const NavContainer = styled.nav`
    .logo{
        margin-left: 1rem;
        cursor: pointer;
    }
    padding: 1rem;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
        font-family: 'Concert One', sans-serif;
        order-left: .1px solid #2F4F4F;
        color: white;
        text-decoration: none;
        padding: 0 0 0 1.2rem;
    }
    .burger{
        @media(min-width: 900px){
            display: none;
        }
    }
    .links{
        position: absolute;
        top: -700px;
        left: -2000px;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        transition: all .6s ease;
        a{
            font-family: 'Concert One', sans-serif;
            color: #3F51B5;
            front-size: 0.8rem;
            display:block;
        }
        @media(min-width: 900px){
            position: initial;
            margin: 0;
            a{
                font-size: 1.5rem;
                color: white;
                margin: 0 2rem;
                display: inline;
            }
        }
    }
    .links.active{
        width: 100%;
        display: block;
        position: absolute;
        margin-left: auto;
        margint-right: auto;
        top: 30%;
        left: 0;
        right: 0;
        text-align: center;
        a{
            font-family: 'Concert One', sans-serif;
            color: #222;
            font-weight: bold;
            font-size: 2rem;
            margin-top: 1.5rem;
            display:block;
        }
    }
`;

const BgDiv = styled.div`
    position: absolute;
    background-color: #DCDCDC;
    opacity: 0.9;
    top: -700px;
    left: -2000px;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: all .6s ease;
    &.active{
        border-radius: 0 0 80% 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 80%;
        z-index: -3;    
    }

`



