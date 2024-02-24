import React from 'react';
import Item from '../item/Item';
import classes from './itemList.module.css'
import StockListContainer from '../stockListContainer/StockListContainer';

const itemList = ({equipos}) => {
    return (
        <div>
        <section className={classes.listContainer}>
            {equipos.map((equipo)=> (
                <Item 
                    key = {equipo.id}
                    equipo ={equipo}
                />
            ))}
        <StockListContainer/>
        </section>
        </div>
    );
};

export default itemList;