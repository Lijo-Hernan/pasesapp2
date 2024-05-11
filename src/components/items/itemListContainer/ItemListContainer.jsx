import React, {useState,useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import classes from './itemListContainer.module.css'
import { Button } from 'react-bootstrap';
import Loader from '../../loader/Loader'
import ItemList from '../itemList/ItemList';
import { useAuth } from '../../../context/authContext';


const ItemListContainer = () => {

    const auth = useAuth();

    const [equipos, setequipos]= useState ([]); 

    const handleLogOut = ()=> {
        auth.logOut()
    }

    let nombreParaMostrar

    if (auth.usuario.displayName) {
        nombreParaMostrar=auth.usuario.displayName
    }else {
        nombreParaMostrar=auth.usuario.email
    }

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
            <span className={classes.usuario}>    
                <h5>Usuario: {nombreParaMostrar}</h5>
                <Button variant="primary" onClick={() => handleLogOut()}>
                Cerrar sesion
                </Button>
            </span>
            <div className={classes.container__card}>
                {equipos.length == 0 ? <Loader/> 
                : 
                <ItemList equipos={equipos}/>}
            </div>
        </div>
    );
};

export default ItemListContainer;