import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import classes from './itemCount.module.css'
import 'bootstrap/dist/css/bootstrap.css';

const ItemCount = ({stock, onAdd}) => {

let [cuenta, setCuenta] = useState(stock)

const sube = () => {
        setCuenta(cuenta +1)
}
const baja = () => {
    if (cuenta > 0){
        setCuenta(cuenta -1)
    }
}

    return (
        <>
            <article className={classes.container}>   
                <div className={classes.contador}>
                    <button className='btn btn-primary' onClick={baja} >-</button>
                    <p className={classes.contador__p}>{cuenta}</p>
                    <button className='btn btn-primary' onClick={sube} >+</button>
                </div>
                <div className={classes.cart__cont}>
                    <Link to='/' className={`${classes.cart__boton} 'btn btn-primary'`} onClick={()=>onAdd(cuenta)}><p className={classes.boton__p}>Actualizar</p></Link> 
                </div> 
            </article>
        </>
    );
};

export default ItemCount;