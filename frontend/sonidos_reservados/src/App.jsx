import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Home from '/src/routes/Home';
import Navbar from './components/Navbar';
import Details from '/src/routes/Details';
import Admin from '/src/routes/Admin';
import Footer from './components/Footer';
import Ingreso from './routes/Ingreso';
import Nosotros from './routes/Nosotros';
import ListaDeProductos from './routes/ListaDeProductos';
import NuevoProducto from './routes/NuevoProducto';
import Registro from './components/Registro';
import { GlobalContext } from './components/utils/global_context';
import Productos from './routes/Productos';
import Usuarios from './routes/Usuarios';
import InfoUsuario from './routes/InfoUsuario';
import Reservas from './routes/Reservas';
import NuevaReserva from './routes/NuevaReserva';
import Favoritos from './routes/Favoritos';

function App() {

  const { userRol } = useContext(GlobalContext);
  console.log(userRol);

  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/register' element={<Registro />} />
          <Route path="/login" element={<Ingreso/>}></Route>
          <Route path="/products" element={<Productos/>}></Route>
          <Route path="/details/:id" element={<Details/>}></Route>
          <Route path="/newReservation" element={<NuevaReserva/>}></Route>
          <Route path="/reservations" element={<Reservas/>}></Route>
          <Route path="/about" element={<Nosotros/>}></Route>
          <Route path="/account" element={<InfoUsuario/>}></Route>
          <Route path="/favorites" element={<Favoritos/>}></Route>
          {userRol === "ADMIN" &&(
            <>
              <Route path="/admin" element={<Admin/>}></Route>
              <Route path="/admin/productList" element={<ListaDeProductos/>}></Route>
              <Route path="/admin/userList" element={<Usuarios/>}></Route>
              <Route path="/admin/newProduct" element={<NuevoProducto/>}></Route>
            </>
          )}        
        </Routes>
      <Footer/>
    </>
  )
}

export default App
