import React, {useState,useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../firebase/config'
import ItemList from '../itemList/ItemList';
import classes from './itemListContainer.module.css'


const ItemListContainer = ({intro}) => {

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
                {equipos.length == 0 ? <h3>Cargando...</h3> 
                : 
                <ItemList equipos={equipos}/>}
            </div>
        </div>
    );
};

export default ItemListContainer;