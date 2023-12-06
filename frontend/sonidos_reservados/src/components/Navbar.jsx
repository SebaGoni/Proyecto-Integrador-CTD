import React, {useState, useContext} from 'react';
import styled from "styled-components";
import { GlobalContext } from './utils/global_context';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { userRol, token, email, lastname, firstname, username, logout } = useContext(GlobalContext);
    const [clickedInitials, setClickedInitials] = useState(false);
    const handleClickInitials = () => {
        setClickedInitials(!clickedInitials)
    }
    const iconsr= 'https://sonidos-reservados.s3.amazonaws.com/imgFront/SonidosreservadosV2.png';

    const initials = `${firstname?.toUpperCase().charAt(0) || ''}${lastname?.toUpperCase().charAt(0) || ''}`;
  return (
        <NavContainer>
            <div className='logo'>
                <a href='/'>
                    <img src={iconsr} alt="logo" height="80"></img>
                </a>
            </div>
            <div className='logoxs'>
                <a href='/'>
                    <img src={iconsr} alt="logo" height="55"></img>
                </a>
            </div>
            {!token && (
                <div className='divAccount'>
                    <a className='titleLogin' href='/register'>CREAR CUENTA</a>
                    <a className='titleLogin' href='/login'>INICIAR SESIÓN</a>
                </div>
            )}
            {token && userRol === 'USER' &&(
                <div className='divUser'>
                    <p>{firstname}</p>
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
                    <p>{firstname}</p>
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
            <BgDiv>
                <ul>
                    <li><a href='/about'>SOBRE  NOSOTROS</a></li>
                    {token && (
                        <>
                            <li><a href='/reservations'>MIS  RESERVAS</a></li>
                            <li><a href='/favorites'>MIS  FAVORITOS</a></li>
                        </>
                    )}
                </ul>
            </BgDiv>
        </NavContainer>
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
    </>
  )
}

export default Navbar


const NavContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 1rem 0 1rem 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    z-index: 10;
    border-bottom: solid white .5px;
    @media (max-width: 900px) {
            height: 80px;
          }
    @media (max-width: 480px) {
            flex-wrap: wrap;
            height: 150px;
            justify-content: center;
          }
    
//////////////////////////////////////////////////////////
    .logo{
        margin-left: 10px;
        @media (max-width: 900px) {
            display: none;
          }
    }
    .logoxs{
        @media (min-width: 900px) {
            display: none;
          }
    }
    .divAccount{
        margin-right: 10px;
        font-size: 1.1rem;
        font-weight: 500;
        letter-spacing: 1px;
    }
    a:hover{
            color:#7E57C2;
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
    }
`
//////////////////////////////////////////////////////////
const BgDiv = styled.nav`
    position: relative;
    top:10vh;
    height: 65px;
    width: 100vw;
    left: -1vw;
    background-color: black;
    a:hover{
            color: #7E57C2;
    }
    ul{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 30px;
        width: 85vw;
        margin:auto;
    }
    li{
        list-style: none;
        border: none;
        text-align: center;
    }
    li:hover{
        box-shadow: 0px 3px 1px rgb(255,255,255,0.5);
    }
    a{
        text-decoration: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 1px;
        color: white;
        
    }
    @media (max-width: 786px) {
        width:102%;
        height: 280px;

        ul{
            display: block;
            align-items: center;
            gap: 15px;
        }
        li{
            list-style: none;
            padding: 1.5rem;
            margin:auto;
            border-bottom: solid #d9d9d9 1px;
            width: 80%;
            margin-left:-5px;
        }
        a{
            text-decoration: none;
            font-size: 1.5rem;
            font-weight: 500;
            letter-spacing: 1px;
            color: white;
        }
    }
    @media (max-width: 430px) {
        margin-top: 15vh;
        width: 101vw;
        margin-left: -2vw;
        a{
        font-size: 20px;
        }
    }
`




