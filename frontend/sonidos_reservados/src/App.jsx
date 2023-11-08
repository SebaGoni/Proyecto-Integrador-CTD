import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import Home from '/src/routes/Home';
import Navbar from './components/Navbar';
import Details from '/src/routes/Details';
import Admin from '/src/routes/Admin';
import Footer from './components/Footer';
import Ingreso from './routes/Ingreso';
import Nosotros from './routes/Nosotros';
import ListaDeProductos from './routes/ListaDeProductos';
import Registro from './components/Registro';
import { GlobalContext } from './components/utils/global_context';


function App() {

  const { userRol } = useContext(GlobalContext);
  console.log(userRol);

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/register' element={<Registro />} />
          <Route path="/login" element={<Ingreso/>}></Route>
          <Route path="/details/:id" element={<Details/>}></Route>
          {userRol === "ADMIN" &&(
            <>
              <Route path="/admin" element={<Admin/>}></Route>
              <Route path="/admin/productList" element={<ListaDeProductos/>}></Route>
            </>
          )}
          <Route path="/about" element={<Nosotros/>}></Route>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
