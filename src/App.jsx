import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ItemListContainer from './components/itemListContainer/ItemListContainer'
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error from './components/error/Error'
import NuevoModifier from './components/nuevoModifier/NuevoModifier'
import Reinicio from './components/reinicio/Reinicio'
import FinCaso from './components/finCaso/FinCaso'
// import StockModifier from './components/stockModifier/StockModifier'


function App() {


  return (
    <>
    <BrowserRouter>
      <Header/>
    
    <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/reporte/:id' element={<ItemDetailContainer/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='/nuevoModifier/:idStock' element={<NuevoModifier/>}/>
        <Route path='/reinicio/:id' element={<Reinicio/>}/>
        <Route path='/fincaso/:id' element={<FinCaso/>}/>
        {/* <Route path='/stockModifier/:idStock' element={<StockModifier/>}/> */}
    </Routes>
      <Footer/>
    
    
    </BrowserRouter>
    </>
  )
}

export default App

