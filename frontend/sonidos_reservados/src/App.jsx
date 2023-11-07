import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '/src/routes/Home';
import Navbar from './components/Navbar';
import Details from '/src/routes/Details';
import Admin from '/src/routes/Admin';
import Footer from './components/Footer';
import Ingreso from './routes/Ingreso';
import Nosotros from './routes/Nosotros';
import ListaDeProductos from './routes/ListaDeProductos';
import Registro from './components/Registro';
import InicioSesion from './components/InicioSesion';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/register' element={<Registro />} />
				  <Route path='/login' element={<InicioSesion />} />
          <Route path="/details/:id" element={<Details/>}></Route>
          <Route path="/Admin" element={<Admin/>}></Route>
          <Route path="/Admin/ListaDeProductos" element={<ListaDeProductos/>}></Route>
          <Route path="/Ingreso" element={<Ingreso/>}></Route>
          <Route path="/Nosotros" element={<Nosotros/>}></Route>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
