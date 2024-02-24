import React from 'react';
import ItemReporte from '../itemReporte/ItemReporte'
import 'bootstrap/dist/css/bootstrap.css';
import classes from './item.module.css'

const Item = ({equipo}) => {

    let estado;

    if (equipo.reporte === "" && equipo.descripcion === "") {
        estado = <img className={classes.estado} src='../public/data/checkMark.png' alt='checkMark' />;
    }else {
        estado = <img className={classes.estado} src='../public/data/xMArk.png' alt='xMArk' />;
    }


    return (
    <>
        <article className={classes.item__card}>
            <h2 className={classes.item__titulo}>{equipo.nombre}</h2>
                {equipo.reporte === "" ?
                    <div className={classes.item__inner}>
                        <button className='btn btn-danger'>Reportar un problema</button>
                        <span className={classes.item__span}>
                            <p className={classes.item__p}>Fecha de reinicio: {equipo.reinicio}</p>
                            <p className={classes.item__p}>Técnico: {equipo.tecnico}</p>
                        </span>
                        <button className='btn btn-primary'>Reportar reincio</button>
                    </div>
                    : <ItemReporte equipo={equipo}/>}
            <span className={classes.item__estado}>{estado}</span>
        </article>
    </>
    );
};

export default Item;