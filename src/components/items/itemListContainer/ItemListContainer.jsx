import React, {useState,useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import classes from './itemListContainer.module.css'
import Loader from '../../loader/Loader'
import ItemList from '../itemList/ItemList';



const ItemListContainer = () => {

    const [equipos, setequipos]= useState ([]); 

    useEffect (()=> {
        const fetchEquipos = collection(db, "equipos");
        getDocs (fetchEquipos)
        .then ((resp)=> {

            setequipos (
                resp.docs.map ((doc) =>{
                    return {...doc.data() , id: doc.id}
                })
            )
        }) 
    },[])


    return (
        <div className={classes.container}>
            <div className={classes.container__card}>
                {equipos.length == 0 ? <Loader/> 
                : 
                <ItemList equipos={equipos}/>}
            </div>
        </div>
    );
};

export default ItemListContainer;