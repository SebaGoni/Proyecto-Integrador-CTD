import React, {useState, useContext} from 'react';
import styled from "styled-components";
import BurgerButton from './BurgerButton';
import { GlobalContext } from './utils/global_context';

const Navbar = () => {

    const { userRol, token, email, lastname, firstname, username, logout } = useContext(GlobalContext);
    console.log(firstname);
    const [clickedInitials, setClickedInitials] = useState(false);
    const handleClickInitials = () => {
        setClickedInitials(!clickedInitials)
    }
    const iconsr= '/src/assets/soloLogoWhite.png';
    const nombre= '/src/assets/sonidosReservadosTextWhite.png';

    const initials = `${firstname?.toUpperCase().charAt(0) || ''}${lastname?.toUpperCase().charAt(0) || ''}`;
  return (
    <>
        {/* <NavContainer>
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
        </NavContainer> */}
        <NavContainer>
            <div className='logo'>
                <a href='/'>
                    <img src={iconsr} alt="logo" width="60" height="60"></img>
                    <img src={nombre} alt="sonidos-reservador" height="45"></img>
                </a>
            </div>
            {!token && (
                <div className='divAccount'>
                    <a className='titleLogin' href='/register'>CREAR CUENTA</a>
                    <a className='titleLogin' href='/login'>INICIAR SESION</a>
                </div>
            )}
            {token && userRol === 'USER' &&(
                <div>
                   <div className='divInitials'>
                        <h2 classname='initials' onClick={handleClickInitials}>{initials}</h2>
                    </div>
                    {clickedInitials && (
                        <h2 className='logout' onClick={logout}>CERRAR SESIÓN</h2>
                    )}
                </div>
            ) || token && userRol === 'ADMIN' && (
                <div>
                    <div className='divInitials'>
                        <h2 classname='initials' onClick={handleClickInitials}>{initials}</h2>
                    </div>
                    {clickedInitials && (
                        <>
                            <h2 className='logout' onClick={logout}>CERRAR SESIÓN</h2>
                            <a className='linkAdmin' href="/admin">ADMINISTRACIÓN</a>
                        </>
                    )}  
                </div>
            )}
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
    padding: 1rem 0 1rem 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    .logo{
        margin-left: 10px;
    }
    .divAccount{
        margin-right: 10px;
    }
    .titleLogin{
        color: white;
        font-size: 20px;
        font-weight: 500;
        text-decoration: none;
        padding: 8px;
    }
    .divInitials{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        width: 50px;
        border-radius: 100%;
        color: black;
        padding: .1px 10px;
        margin-right: 10px;
    }
    .initials{
        color: black;
    }
    .logout{
        cursor: pointer;
        background-color: white;
        padding: 5px 8px;
        border-radius: 20px;
        color: black;
        position: absolute;
        top: 80px;
        right: 10px;
        font-size: 20px;
        font-weight: 500;
    }
    .linkAdmin{
        background-color: white;
        padding: 5px 8px;
        border-radius: 20px;
        color: black;
        position: absolute;
        right: 10px;
        top: 140px;
        font-size: 20px;
        font-weight: 500;
        text-decoration: none;
    }
    `


