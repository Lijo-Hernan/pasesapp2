import React from 'react';
import ItemReporte from '../itemReporte/ItemReporte'
import 'bootstrap/dist/css/bootstrap.css';
import classes from './item.module.css'
import { Link } from 'react-router-dom';

const Item = ({equipo}) => {

    let estado;

    if (equipo.reporte === "" && equipo.descripcion === "") {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/checkMark.png?alt=media&token=6146dce1-56c3-4eeb-9dc5-389099690f6d' 
        alt='checkMark' />;
    }else {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/xMark.png?alt=media&token=8144ca63-bdb0-40cc-98d6-8530def2715c' 
        alt='xMArk' />;
    }


    return (
    <>
        <article className={classes.item__card}>
            <h2 className={classes.item__titulo}>{equipo.nombre}</h2>
                {equipo.reporte === "" ?
                    <div className={classes.item__inner}>
                        <Link to={`reporte/${equipo.id}`} className='btn btn-danger'>Reportar un problema</Link>
                        <span className={classes.item__span}>
                            <p className={classes.item__p}>Fecha de reinicio: {equipo.reinicio}</p>
                            <p className={classes.item__p}>Técnico: {equipo.tecnico}</p>
                        </span>
                        <Link to='' className='btn btn-primary'>Reportar reincio</Link>
                    </div>
                    : <ItemReporte equipo={equipo}/>}
            <span className={classes.item__estado}>{estado}</span>
        </article>
    </>
    );
};

export default Item;