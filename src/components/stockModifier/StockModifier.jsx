import { useState, useEffect } from 'react';
import ItemCount from '../itemCount/ItemCount'
import { useParams } from 'react-router-dom';
import {doc, getDoc, updateDoc, Timestamp} from 'firebase/firestore'
import {db} from '../firebase/config'
import Loader from '../loader/Loader';
import classes from './stockModifier.module.css'
import 'bootstrap/dist/css/bootstrap.css';


const StockModifier = () => {

    const [stockItem, setStockItem]= useState(null)

    const [cantidad, setCantidad]=useState()

    const {idStock} = useParams();

    const productDoc = doc(db, 'stock', idStock)

    useEffect (()=>{

        getDoc(productDoc)
            .then(queryDocumentSnapshot => {
                if (queryDocumentSnapshot.exists && queryDocumentSnapshot.data()){
                const data = queryDocumentSnapshot.data()
                const adaptProd = {id: queryDocumentSnapshot.id, ...data}
                setStockItem(adaptProd)
            } else{setError(true)}
        })
            .catch(() => {
                console.log('error')
            })

    },[idStock])

    
    const stockActual = async(cuenta, formData) => {
        alert('El stock se modifico')
        await updateDoc (productDoc, {stock:cuenta, fecha:Timestamp.fromDate(new Date())})
    }
    
    const handleOnAdd = (cuenta) =>{
        setCantidad(cuenta)
        stockActual(cuenta) 
    } 

    return (
        <div className={classes.stockContainer} >  
            {stockItem === null ? <Loader/> 
            : 
            <section>     
                <h2>Modifique el valor al stock actual de {stockItem.nombre}</h2>
                <h3>en cantidad de {stockItem.presentacion}</h3>
                <ItemCount {...stockItem} onAdd={handleOnAdd}/> 
            </section>}
        </div>
    );
};

export default StockModifier;