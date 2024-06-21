import React from 'react';
import Item from '../item/Item';
import classes from './itemList.module.css'
import StockListContainer from '../../stock/stockListContainer/StockListContainer';

const itemList = ({equipos}) => {
    return (
        <div className={classes.listContainer}>
        <section >
            {equipos.map((equipo)=> (
                <Item 
                    key = {equipo.id}
                    equipo ={equipo}
                />
            ))}
        </section>
        <StockListContainer/>
        </div>
    );
};

export default itemList;