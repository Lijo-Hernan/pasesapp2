import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const Item = ({stock}) => {

    let imagenPAraMostrar;

    if (stock.stock < stock.minimo) {
        imagenPAraMostrar = <img className='imagenParaMostrar' src='../public/data/cleanX.png' alt='cleanX' />;
    } else if (stock.stock >= stock.maximo) {
        imagenPAraMostrar = <img className='imagenParaMostrar' src='../public/data/cleanCheck.png' alt='cleanCheck' />;
    }else {
        imagenPAraMostrar = <img className='imagenParaMostrar' src='../public/data/warning.png' alt='warning' />;
    }


    return (
    <>
        <article className='stockItem__card'>
            <p className='stockItem__titulo'>{stock.nombre} : <span className='stockNumber'>{stock.stock}</span>  {stock.presentacion} 
            {imagenPAraMostrar} 
            </p>
            <button className='btn btn-primary'>Corregir</button>
        </article>
    </>
    );
};

export default Item;