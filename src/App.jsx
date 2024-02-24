import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
// import ItemListContainer from './components/itemListContainer/ItemListContainer'
// import ItemDetailContainer from './components/itemDetailContainer/ItemDetailContainer'


function App() {

  const [count, setCount] = useState(0)

  return (
    <>

    <Header/>
    {/* <ItemListContainer/> */}
          {/* <div>
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div> */}
    {/* <ItemDetailContainer/> */}
    <Footer/>
    </>
  )
}

export default App

