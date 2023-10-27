import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '/src/routes/Home';
import Navbar from './components/Navbar';
import Details from '/src/routes/Details';
import Admin from '/src/routes/Admin';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
        <Route path="/Admin" element={<Admin/>}></Route>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
