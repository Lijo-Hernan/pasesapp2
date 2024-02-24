import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ItemListContainer from './components/itemListContainer/ItemListContainer'
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer'


function App() {


  return (
    <>

    <Header/>
    <ItemListContainer/>

    <ItemDetailContainer/>
    <Footer/>
    </>
  )
}

export default App

