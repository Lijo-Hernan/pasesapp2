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


function App() {


  return (
    <>
    <BrowserRouter>
      <Header/>
    <Routes>
        <Route path='/historial' element={<HistorialListContainer/>}/>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/reporte/:id' element={<ItemDetailContainer/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='/stock/stockmodifier/:idStock' element={<StockModifier/>}/>
        <Route path='/reinicio/:id' element={<Reinicio/>}/>
        <Route path='/items/fincaso/:id' element={<FinCaso/>}/>
    </Routes>
      <Footer/>
    
    
    </BrowserRouter>
    </>
  )
}

export default App

