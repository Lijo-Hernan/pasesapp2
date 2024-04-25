import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ItemListContainer from './components/itemListContainer/ItemListContainer'
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer'
import StockModifier from './components/stockModifier/StockModifier'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error from './components/error/Error'


function App() {


  return (
    <>
    <BrowserRouter>
      <Header/>
    
    <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/reporte/:id' element={<ItemDetailContainer/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='/stockModifier/:idStock' element={<StockModifier/>}/>
    </Routes>
      <Footer/>
    
    
    </BrowserRouter>
    </>
  )
}

export default App

