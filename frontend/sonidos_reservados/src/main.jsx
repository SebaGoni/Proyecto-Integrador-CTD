import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { GlobalProvider } from "./components/utils/global_context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <GlobalProvider>  
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GlobalProvider>
  </Router>
)
