import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import classes from './historialListContainer.module.css'
import Loader from '../../loader/Loader'
import HistorialList from '../historialList/HistorialList';
import HistorialNav from '../historialNav/HistorialNav';

const HistorialListContainer = ({introduccion}) => {

    const [reportes, setReportes]= useState ([]);

    const { categoria } = useParams()

    useEffect(() => {
        const fetchReportes = async () => {
            const querySnapshot = await getDocs(collection(db, 'reportes'));
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setReportes(data);
        };
        fetchReportes();
    }, []);

    const repFiltrado = (categoria !=undefined)?
    reportes.filter(reporte => reporte.datos.equipo === categoria) : reportes


    return (
        <div className={classes.container}>
            <HistorialNav/>
            <h2><u>{introduccion}</u></h2>
            <div className={classes.container__card}>
                {reportes.length === 0 ? <Loader/> : <HistorialList reportes={repFiltrado}/>}
            </div>
        </div>
    );
};

export default HistorialListContainer;