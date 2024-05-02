import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../itemDetail/ItemDetail';
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../../firebase/config'
import classes from './itemDetailContainer.module.css'
import Loader from '../../loader/Loader';

const ItemDetailContainer = () => {

    const [eq, setEq]= useState (null); 

    const {id} = useParams();


    useEffect (()=> {
        const fetchEquipo = doc(db, "equipos",id);
        getDoc (fetchEquipo)
        .then ((resp)=> {
            setEq({...resp.data(), id: resp.id})
        }) 
    },[id])

    return (
        <div>
            <div className={classes.detailContainer}>
            <section className={classes.detailContainer__card}>
                {eq ? <ItemDetail eq={eq}/> 
                : <div className={classes.container}><span className={classes.loader}><Loader/></span></div> }
            </section>
        </div>
            
        </div>
    );
};

export default ItemDetailContainer;