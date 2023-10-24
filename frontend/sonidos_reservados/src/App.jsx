//import { Admin } from 'mongodb';
import './App.css';
import Home from './routers/Home';
import Details from './routers/Details';
import Administrador from './routers/Administrador';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
  useNavigate
} from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <div className='App'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product/:id' element={<Details/>}></Route>
          <Route path='/administrador' element={<Administrador/>}></Route>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
