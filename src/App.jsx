import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ItemListContainer from './components/items/itemListContainer/ItemListContainer'
import ItemDetailContainer from './components/items/itemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error from './components/error/Error'
import Reinicio from './components/items/reinicio/Reinicio'
import FinCaso from './components/items/finCaso/FinCaso'
import StockModifier from './components/stock/stockModifier/StockModifier'
import HistorialListContainer from './components/historial/historialListContainer/HistorialListContainer'
import { useState } from 'react'
import { AuthProvider } from './context/authContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from './components/firebase/config'
import Login from './components/logIn/Login'


function App() {

  const [usuarioGlobal, setUsuarioGlobal]= useState(null)

  onAuthStateChanged(auth,(usuarioFirebase)=> {
    if (usuarioFirebase){
      setUsuarioGlobal(usuarioFirebase)
    } else {
      setUsuarioGlobal(null)
}})


  
  if(usuarioGlobal !=null) { 
    
    return (
      <>
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path='/historial' element={<HistorialListContainer introduccion={`Listado completo de reportes` }/>}/>
            <Route path='/' element={<ItemListContainer/>}/>
            <Route path='/reporte/:id' element={<ItemDetailContainer/>}/>
            <Route path='*' element={<Error/>}/>
            <Route path='/stock/stockmodifier/:idStock' element={<StockModifier/>}/>
            <Route path='/reinicio/:id' element={<Reinicio/>}/>
            <Route path='/items/fincaso/:id' element={<FinCaso/>}/>
            <Route path='/historial/:categoria' element={<HistorialListContainer introduccion={`Listado reportes segun equipo` }/>}/>   
        </Routes>
      <Footer/>
        
      </BrowserRouter>
    </AuthProvider>
    </>
  ) }
  else {
    return ( 
      <AuthProvider>
      <Login/>
      </AuthProvider>
    )
  }
}

export default App

