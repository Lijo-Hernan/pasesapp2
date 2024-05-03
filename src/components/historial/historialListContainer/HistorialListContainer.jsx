import React, {useState,useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import classes from './historialListContainer.module.css'
import Loader from '../../loader/Loader'
import HistorialList from '../historialList/HistorialList';
import HistorialNav from '../historialNav/HistorialNav';

const HistorialListContainer = () => {

    const [reportes, setReportes]= useState ([]); 

    useEffect (()=> {
        const fetchReportes = collection(db, "reportes");
        getDocs (fetchReportes)
        .then ((resp)=> {

            setReportes (
                resp.docs.map ((doc) =>{
                    return {...doc.data() , id: doc.id}
                })
            )
        }) 
    },[])


    return (
        <div className={classes.container}>
            <HistorialNav/>
            <div className={classes.container__card}>
                {reportes.length == 0 ? <Loader/> 
                : 
                <HistorialList reportes={reportes}/>}
            </div>
        </div>
    );
};

export default HistorialListContainer;