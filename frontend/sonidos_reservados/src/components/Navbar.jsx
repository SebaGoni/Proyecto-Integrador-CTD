import React, {useState, useContext} from 'react';
import styled from "styled-components";
import { GlobalContext } from './utils/global_context';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { userRol, token, email, lastname, firstname, username, logout } = useContext(GlobalContext);
    console.log(firstname);
    const [clickedInitials, setClickedInitials] = useState(false);
    const handleClickInitials = () => {
        setClickedInitials(!clickedInitials)
    }
    const iconsr= 'https://sonidos-reservados.s3.amazonaws.com/imgFront/SonidosreservadosV2.png';

    const initials = `${firstname?.toUpperCase().charAt(0) || ''}${lastname?.toUpperCase().charAt(0) || ''}`;
  return (
    <>
        <NavContainer>
            <div className='logo'>
                <a href='/'>
                    <img src={iconsr} alt="logo" height="80"></img>
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
                   <div className='divInitials'>
                        <h2 className='initials' onClick={handleClickInitials}>{initials}</h2>
                    </div>
                    {clickedInitials && (
                        <>
                            <h2 className='logout' onClick={logout}>CERRAR SESIÓN</h2>
                            <Link to='/account'>
                                <h2 className='perfil'>PERFIL</h2>
                            </Link>
                        </>
                    )}
                </div>
            ) || token && userRol === 'ADMIN' && (
                <div className='divUser'>
                    <p>{firstname}</p>
                    <div className='divInitials'>
                        
                        <h2 className='initials' onClick={handleClickInitials}>{initials}</h2>
                    </div>
                    {clickedInitials && (
                        <>
                            <h2 className='logout' onClick={logout}>CERRAR SESIÓN</h2>
                            <a className='linkAdmin' href="/admin">ADMINISTRACIÓN</a>
                            <Link to='/account'>
                                <h2 className='perfil'>PERFIL</h2>
                            </Link>
                        </>
                    )}  
                </div>
            )}
        </NavContainer>
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
    z-index: 10;
    .logo{
        margin-left: 10px;
    }
    .divAccount{
        margin-right: 10px;
    }
    .titleLogin{
        color: white;
        font-size: 18px;
        font-weight: 800;
        text-decoration: none;
        padding: 8px;
        margin: 0 1rem 1rem 1rem;
        padding-top: .5rem;
    }
    .divUser{
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            margin-right:1rem;
            letter-spacing: 1px;
            font-weight: 600;
            font-size: 1.2rem;
        }

    }
    .divInitials{
        justify-content: center;
        align-items: center;
        background:#3F51B5;
        background-image: linear-gradient(#7E57C2 50%, #3F51B5);
        width: 50px;
        border-radius: 100%;
        color: white;
        padding: .1px 10px;
        margin-right: 10px;
        cursor: pointer;
    }
    .logout{
        margin: 0;
        cursor: pointer;
        background:#3F51B5;
        padding: 6px 12px;
        border-radius: 20px;
        color: white;
        position: absolute;
        top: 150px;
        right: 10px;
        font-size: 20px;
        font-weight: 500;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
    }
    .perfil{
        margin: 0;
        cursor: pointer;
        background:#3F51B5;
        padding: 6px 12px;
        border-radius: 20px;
        color: white;
        position: absolute;
        top: 100px;
        right: 10px;
        font-size: 20px;
        font-weight: 500;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
    }
    .linkAdmin{
        background:#3F51B5;
        padding: 6px 12px;
        border-radius: 20px;
        color: white;
        position: absolute;
        right: 10px;
        top: 200px;
        font-size: 20px;
        font-weight: 500;
        text-decoration: none;
        box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
    }
`
const BgDiv = styled.nav`
    position: absolute;
    width: 102%;
    top: 112px;
    margin-left: -10px;
    background-color: white;
    @media (min-width: 786px){
        ul{
            display: flex;
            align-items: center;
            gap: 15px;
        }
        li{
            list-style: none;
        }
        a{
            text-decoration: none;
            padding-left: 1rem;
            font-size: .9rem;
            font-weight: 600;
            letter-spacing: 1px;
            color: black;
        }
    }
    @media (max-width: 786px) {
        width:102%;
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
            font-weight: 700;
            letter-spacing: 1px;
            color: black;
        
    }
    }
`


