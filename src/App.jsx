import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Navbar from './components/Navbar'
import Login from './Login'


function App() {
  return (
    <>

      <Router>
      <Navbar/>
        <Routes>
        <Route path='/login' element={<Login/>}/>
       
        <Route path='/' element={<ProductList/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
