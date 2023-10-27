import React from 'react'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import Categorias from '../components/Categorias'
import Cards from '../components/Cards'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <main>
      <Form/>
      <Categorias/>
      <Cards/>    
    </main>
  )
}

export default Home