import React from 'react'
import '/src/styles/Navbar.css';

const Navbar = () => {
    const logo= '/src/assets/soloLogoWhite.png';
    const nombre= '/src/assets/sonidosReservadosTextWhite.png';
  return (
    <header className="header-static">
        <div className="logo">
             <img src={logo} alt="logo" width="80" height="80"></img>
        </div>
        <div className="nombre">
             <img src={nombre} alt="logo" height="60"></img>
        </div>
        <nav className="nav-black" >
            <ul>
                <li>
                    <a href='/'>Crear cuenta</a>
                </li>
                <li>
                    <a href='/'>Iniciar sesion</a>
                </li>
            </ul>
        </nav>
        <nav className="nav-white">
            <ul>
                <li>
                    <a href='/'>Reserva ahora</a>
                </li>
                <li>
                    <a href='/'>Sobre nosotros</a>
                </li>
            </ul>
        </nav>
        
    </header>
  )
}

export default Navbar
