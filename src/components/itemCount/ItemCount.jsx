import React, {useState} from 'react';
import classes from './itemCount.module.css'
import 'bootstrap/dist/css/bootstrap.css';

const ItemCount = ({initial, stock, onAdd}) => {

let [cuenta, setCuenta] = useState(25)

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
            <div className={classes.contador}>
                <button className='btn btn-primary' onClick={baja} >-</button>
                <p className={classes.contador__p}>{cuenta}</p>
                <button className='btn btn-primary' onClick={sube} >+</button>
            </div>
            <div className={classes.cart__cont}>
                <button className={`${classes.cart__boton} 'btn btn-primary'`} onClick={()=>onAdd(cuenta)}><p className={classes.boton__p}>Agregar al carrito</p></button> 
            </div>
        </>
    );
};

export default ItemCount;