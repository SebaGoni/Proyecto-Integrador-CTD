import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from '/src/routes/Home';
import Details from '/src/routes/Details';
import Admin from '/src/routes/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/details/:id" element={<Details/>}></Route>
        <Route path="/Admin" element={<Admin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
