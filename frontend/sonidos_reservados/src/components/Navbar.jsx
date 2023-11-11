import React, {useState, useContext} from 'react';
import styled from "styled-components";
import BurgerButton from './BurgerButton';
import { GlobalContext } from './utils/global_context';

const Navbar = () => {

    const { userRol, token, email, lastname, firstname, username, logout } = useContext(GlobalContext);
    console.log(firstname);
    const [clicked, setClicked] = useState(false);
    const [clickedInitials, setClickedInitials] = useState(false);
    const handleClick = () => {
        setClicked(!clicked)
    }
    const handleClickInitials = () => {
        setClickedInitials(!clickedInitials)
    }
    const iconsr= '/src/assets/soloLogoWhite.png';
    const nombre= '/src/assets/sonidosReservadosTextWhite.png';

    const initials = `${firstname?.toUpperCase().charAt(0) || ''}${lastname?.toUpperCase().charAt(0) || ''}`;
  return (
    <>
        <NavContainer>
            <div className='logo'>
                <a href='/'>
                    <img src={iconsr} alt="logo" width="60" height="60"></img>
                    <img src={nombre} alt="sonidos-reservador" height="45"></img>
                </a>
            </div>
            {!token && (
                <div className= {`links ${clicked ? "active": "" }`}>
                    <a onClick={handleClick} href='/register'>CREAR CUENTA</a>
                    <a onClick={handleClick} href='/login'>INICIAR SESION</a>
                </div>
            )}
            {token && userRol === 'USER' &&(
                <div className= {`links ${clicked ? "active": "" }`}>
                    <h2>{initials}</h2>
                    <h2 onClick={logout}>CERRAR SESIÓN</h2>
                </div>
            ) || token && userRol === 'ADMIN' && (
                <div className= {`links ${clicked ? "active": "" }`}>
                    <h2>{initials}</h2>
                    <h3 onClick={logout}>CERRAR SESIÓN</h3>
                    <a href="/admin">ADMINISTRACIÓN</a>
                </div>
            )}
            
            <div className='burger'>
                <BurgerButton clicked={clicked} handleClick={handleClick}/>
            </div>
            <BgDiv className={`initial ${clicked ? ' active' : ''}`}>
                <ul>
                    <li><a onClick={handleClick} href='/'>RESERVA AHORA</a></li>
                    <li><a onClick={handleClick} href='/Nosotros'>SOBRE NOSOTROS</a></li>
                </ul>
            </BgDiv>
        </NavContainer>
    
    </>
  )
}

export default Navbar


const NavContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    padding-right: 2rem;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    .logo{
        cursor: pointer;
        @media(min-width: 1000px){
            margin-left: 1rem;
        }
        @media(max-width: 1000px){
            margin-left: .1rem;
        }
    }
    a{
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
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            color: #3F51B5;
            font-size: 1.2rem;
            display:block;
        }

        @media(min-width: 900px){
            position: initial;
            margin: 0;
            a{
                font-size: 1.2rem;
                color: white;
                margin: 0 1.5rem;
                display: inline;
            }

        }
    }
    .links.active{
        width: 100%;
        display: block;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        top: 120%;
        left: 0;
        right: 0;
        text-align: center;
        a{
            font-family: 'Poppins', sans-serif;
            color: #222;
            font-weight: bold;
            font-size: 2rem;
            margin-top: 1.5rem;
            display:block;
        }
    }
    ul li {
    display: block;
  }

  @media (max-width: 900px) {
    ul li {
      display: none; 
    }
  }
`;

const BgDiv = styled.div`

    position: absolute;
    background-color: white;
    top: 95px;
    left: 0px;
    width: 100%;
    height: 60px;
    z-index: -1;
    transition: all .6s ease;
    &.active{
        border-radius: 0 0 40% 0;
        top: 10vh;
        left: 0;
        width: 100%;
        height: 250%;
        z-index: -10;    
    }
    @media(min-width: 900px){
    ul{
        color: black;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        list-style-type: none;
        display: flex;
        font-size: 1.2rem;
    }
    li{
        margin-left: 1.5rem;
    }
    @media (max-width: 900px) {
    ul {
      display: none;
    }
  }
}`


