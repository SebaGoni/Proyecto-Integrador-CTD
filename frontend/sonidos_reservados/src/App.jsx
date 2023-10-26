import './App.css';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Categorias from './components/Categorias';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Navbar/>
      <Form/>
      <Categorias/>
      <Cards/>
      <Footer/>
    </>
  )
}

export default App
