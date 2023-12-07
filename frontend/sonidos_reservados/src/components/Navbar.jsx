import React, {useState, useContext} from 'react';
import styled from "styled-components";
import { GlobalContext } from './utils/global_context';
import { Link } from 'react-router-dom';
const logoFooterColor = 'https://sonidos-reservados.s3.amazonaws.com/imgFront/SonidosreservadosFooterV2.png'

const Navbar = () => {

    const { userRol, token, email, lastname, firstname, username, logout } = useContext(GlobalContext);
    const [clickedInitials, setClickedInitials] = useState(false);
    const handleClickInitials = () => {
        setClickedInitials(!clickedInitials)
    }
    const iconsr= 'https://sonidos-reservados.s3.amazonaws.com/imgFront/SonidosreservadosV2.png';
    const iconLogin = 'https://sonidos-reservados.s3.amazonaws.com/imgFront/login.png';
    const iconRegister= 'https://sonidos-reservados.s3.amazonaws.com/imgFront/register.png';

    const initials = `${firstname?.toUpperCase().charAt(0) || ''}${lastname?.toUpperCase().charAt(0) || ''}`;
  return (
        <NavContainer>
            <div className='containerNav'>
                <div className='logo'>
                    <a href='/'>
                        <img className='logoNavbar' src={iconsr} alt="logo" height="60"></img>
                    </a>
                </div>
                {!token && (
                    <div className='divAccount'>
                        <a className='titleLogin' href='/register'>CREAR CUENTA</a>
                        <a className='titleLogin' href='/login'>INICIAR SESIÓN</a>
                        <div className='iconLogin'>
                            <a className= 'registerIcon' href='/register'>
                                <img src={iconRegister} alt="register" height="40"></img>
                            </a>
                            <a className= 'loginIcon' href='/login'>
                                <img src={iconLogin} alt="login" height="40"></img>
                            </a>
                        </div>
                    </div>
                )}
                {token && userRol === 'USER' &&(
                    <div className='divUser'>
                        <p className='firstname'>{firstname}</p>
                    <div className='divInitials' onClick={handleClickInitials}>
                            <h2 className='initials'>{initials}</h2>
                        </div>
                        {clickedInitials && (
                            <div className='divCampos'>
                                <Link to='/account'>
                                    <h2 className='perfil'>PERFIL</h2>
                                </Link>
                                <h3 className='logout' onClick={logout}>CERRAR SESIÓN</h3>
                            </div>
                        )}
                    </div>
                ) || token && userRol === 'ADMIN' && (
                    <div className='divUser'>
                        <p className='firstname'>{firstname}</p>
                        <div className='divInitials' onClick={handleClickInitials}>
                            <h2 className='initials'>{initials}</h2>
                        </div>
                        {clickedInitials && (
                            <div className='divCampos'>
                                <Link to='/account'>
                                    <h2 className='perfil'>PERFIL</h2>
                                </Link>
                                <a className='linkAdmin' href="/admin">ADMINISTRACIÓN</a>
                                <h3 className='logout' onClick={logout}>CERRAR SESIÓN</h3>
                            </div>
                        )}  
                    </div>
                )}
            </div>
            <BgDiv>
                <ul>
                    <li><a href='/about'>CONOCE AL EQUIPO</a></li>
                    {token && (
                        <>
                            <li><a href='/reservations'>MIS  RESERVAS</a></li>
                            <li><a href='/favorites'>MIS  FAVORITOS</a></li>
                        </>
                    )}
                </ul>
            </BgDiv>
    </NavContainer>
    )
}

export default Navbar


const NavContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: auto;
    padding: 1rem 0 1rem 0;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 10;
    .containerNav{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .logo{
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .divAccount{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        font-size: 1.1rem;
        font-weight: 500;
        letter-spacing: 1px;
    }
    .titleLogin{
        color: white;
        text-decoration: none;
        padding: 8px;
        margin-right: 1.2rem;
        @media (max-width: 900px) {
            display:none;
        }
    }
    .titleLogin:hover{
        color:#7E57C2;
    }
    .iconLogin{
        display: flex;
        margin-right: 2rem;
        gap: 30px;
        @media (min-width: 900px) {
            display:none;
        }
    }
    .registerIcon,
    .loginIcon {
        transition: transform 0.3s ease;
    }
    .registerIcon:hover{
        transform: scale(1.1); 
    }
    .loginIcon:hover{
        transform: scale(1.1); 
    }
    .registerIcon:active,
    .loginIcon:active {
        transform: translateY(5px);
        margin: 0 1rem 1rem 1rem;
        padding-top: .5rem;
    }
    .divUser{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        p{
            margin-right:1rem;
            letter-spacing: 1px;
            font-weight: 500;
            font-size: 1.2rem;
        }
    }
    .divInitials{
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
        background:#3F51B5;
        background-image: linear-gradient(#7E57C2 50%, #3F51B5);
        width: 50px;
        border-radius: 100%;
        color: white;
        padding: .1px 10px;
        cursor: pointer;
    }
    .initials{
        text-align: center;
    }
    .logout{
        margin: 0;
        cursor: pointer;
        color: white;
        font-size: 15px;
        font-weight: 500;
    }
    .perfil{
        margin: 0;
        cursor: pointer;
        color: white;
        font-size: 15px;
        font-weight: 500;
    }
    .linkAdmin{
        margin: 0;
        cursor: pointer;
        color: white;
        font-size: 15px;
        font-weight: 500;
    }
    .divCampos{
        z-index: 10;
        position: absolute;
        top: 100px;
        padding: 8px;
        background:#3F51B5;
        background-image: linear-gradient(#7E57C2 50%, #3F51B5);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-direction: column;
        border-radius: 20px;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        @media (max-width: 600px) {
            right: 30px;
        }
    }
    .firstname{
        display: block;
        @media (max-width: 600px) {
            display: none;
        }
    }
    .LogoFooter{
        display: none;
        @media (max-width: 600px) {
            display: block;
            width: 80px;
            height: 80px;
        }
    }
    .logoNavbar{
        @media (max-width: 600px) {
           width: 250px;
           height: 40px;
        }
    }
`
const BgDiv = styled.nav`
    z-index: -1;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-bottom: 5px;
    background-color: black;
    padding-left: 4rem;
    @media (max-width: 600px) {
        z-index: -1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 5px;
        background-color: black;
        padding: 0;
    }
    a:hover{
        color: #7E57C2;
    }
    ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 20px;
        padding: 0;
        @media (max-width: 600px) {
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 20px;
            padding: 0;
        }
    }
    li{
        list-style: none;
        border: none;
        text-align: center;
    }
    a{
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: 500;
        color: #ffffff94; 
        @media (max-width: 600px) {
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 500;
            color: white; 
        }
    }
    
`




