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
import ListaDeCategorias from './routes/ListaDeCategorias';
import ListaDeCaracteristicas from './routes/ListaDeCaracteristicas';
import NuevaCategoria from './routes/NuevaCategoria';
import NuevaCatacteristica from './routes/NuevaCatacteristica';

function App() {

  const { userRol } = useContext(GlobalContext);


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
              <Route path="/admin/categoriesList" element={<ListaDeCategorias/>}></Route>
              <Route path="/admin/characteristicsList" element={<ListaDeCaracteristicas/>}></Route>
              <Route path="/admin/newCharacteristic" element={<NuevaCatacteristica/>}></Route>
              <Route path="/admin/userList" element={<Usuarios/>}></Route>
              <Route path="/admin/newProduct" element={<NuevoProducto/>}></Route>
              <Route path="/admin/newCategorie" element={<NuevaCategoria/>}></Route>
            </>
          )}        
        </Routes>
      <Footer/>
    </>
  )
}

export default App
