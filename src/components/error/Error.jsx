import React from 'react';
import './error.css'

const Error = () => {
    return (
        <div className='error__cont'>
            <h2 className='error__titulo'>Ups... Nada por aqui</h2>
            <img src="../public/data/error.gif" alt="ERROR" className='error_img' />
        </div>
    );
};

export default Error;