import React, {useState,useEffect} from 'react';
import classes from './stockListContainer.module.css'
import StockList from '../stockList/StockList'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import Loader from '../../loader/Loader'

const StockListContainer = () => {

    const [stocks, setstocks]= useState ([]); 

    useEffect (()=> {
        const fetchStock = collection(db, "stock");
        getDocs (fetchStock)
        .then ((resp)=> {
            setstocks (
                resp.docs.map ((doc) =>{
                    return {...doc.data() , id: doc.id}
                })
            )
        }) 
    },[])
    
    return (
        <div className={classes.stockContainer}>
            <h1 className={classes.stockContainer__intro}>Control de Stock</h1>
            <div className={classes.stockContainer__card}>
                {stocks.length == 0 ? <div className={classes.loader__cont}><span><Loader/></span></div> 
                : 
                <StockList stocks={stocks}/>}
            </div>
        </div>
    );
};

export default StockListContainer;