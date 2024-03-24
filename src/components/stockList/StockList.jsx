import React from 'react';
import StockItem from '../stockItem/StockItem'

const ItemList = ({stocks}) => {

    return (
        <section className='stockListContainer'>
            {stocks.map((stock)=> (
                <StockItem 
                    key = {stock.id}
                    stock ={{...stock}}
                />
            ))}
        </section>
    );
};

export default ItemList;