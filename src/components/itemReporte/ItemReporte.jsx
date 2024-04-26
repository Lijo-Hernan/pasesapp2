import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './itemReporte.module.css'

const ItemReporte = ({equipo}) => {


    return (
        <div className = {classes.reporte}>
            <p className={classes.reporte__p}>Fecha de reporte: {equipo.reporte}</p>
            <p className={classes.reporte__p}>Numero de caso: {equipo.caso}</p>
            <p className={classes.reporte__p}>Descripcion: {equipo.descripcion}</p>
            <button className='btn btn-success' >Finalizar caso</button>
        </div>
    );
};

export default ItemReporte;