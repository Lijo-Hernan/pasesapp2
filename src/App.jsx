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
import { useState, useEffect } from 'react'
import { AuthProvider } from './context/authContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './components/firebase/config'
import Login from './components/logIn/Login'
import Loader from './components/loader/Loader'


function App() {

  const [usuarioGlobal, setUsuarioGlobal]= useState(null)
  const [cargando, setCargando] = useState(true);

  onAuthStateChanged(auth,(usuarioFirebase)=> {
    if (usuarioFirebase){
      setUsuarioGlobal(usuarioFirebase)
    } else {
      setUsuarioGlobal(null)
}})

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
    setUsuarioGlobal(usuarioFirebase);
    setCargando(false);
  });
  return () => unsubscribe();
}, []);

if(cargando) {
  return <Loader/>
} else {

  if(usuarioGlobal !=null) { 
    
    return (
      <>
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path='/historial' element={<HistorialListContainer introduccion={`Listado completo de reportes` }/>}/>
            <Route path='/' element={<ItemListContainer/>} usuarioGlobal={usuarioGlobal}/>
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
    )
  }
  else {
    return ( 
      <AuthProvider>
      <Login/>
      </AuthProvider>
    )
  }
}}

export default App

