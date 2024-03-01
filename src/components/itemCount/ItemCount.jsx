import React, {useState} from 'react';
import { BsCart3 } from "react-icons/bs";
import classes from './itemCount.module.css'
import 'bootstrap/dist/css/bootstrap.css';

const ItemCount = ({initial, stock, onAdd}) => {

let [cuenta, setCuenta] = useState(initial)

const sube = () => {
    if (cuenta < stock){
        setCuenta(cuenta +1)
    }
}
const baja = () => {
    if (cuenta > 1){
        setCuenta(cuenta -1)
    }
}

    return (
        <>
            <div className={classes.contador}>
                <button className='btn btn-primary' onClick={baja} disabled={cuenta== initial}>-</button>
                <p className={classes.contador__p}>{cuenta}</p>
                <button className='btn btn-primary' onClick={sube} disabled={cuenta==stock}>+</button>
            </div>
            <div className={classes.cart__cont}>
                <button className={`${classes.cart__boton} 'btn btn-primary'`} disabled={stock==0} onClick={()=>onAdd(cuenta)}><p className={classes.boton__p}>Agregar al carrito</p>
                <BsCart3 className={classes.boton__img}/></button> 
            </div>
        </>
    );
};

export default ItemCount;