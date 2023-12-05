import React from 'react'
import Form from '../components/Form'
import Categorias from '../components/Categorias'
import Cards from '../components/Cards'
import ProductCalendar from '../components/ProductCalendar'

const Home = () => {
  return (
    <main style={{ width: '100%' }}>
      <ProductCalendar/>
      <Form/>
      <Categorias/>
      <Cards/>    
    </main>
  )
}

export default Home