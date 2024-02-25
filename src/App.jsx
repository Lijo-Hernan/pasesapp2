import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ItemListContainer from './components/itemListContainer/ItemListContainer'
import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {


  return (
    <>
    <BrowserRouter>
      <Header/>
    
    <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/reporte/:id' element={<ItemDetailContainer/>}/>
        {/* <Route path='' element={}/> */}

    </Routes>
    
      {/* <ItemListContainer/>
      <ItemDetailContainer/> */}
      <Footer/>
    
    
    </BrowserRouter>
    </>
  )
}

export default App

