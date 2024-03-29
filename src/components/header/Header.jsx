import React from 'react';
import './header.css'
import logo from "../../../public/data/EscudoPiroSinFondo.png"

const header = () => {
    return (
        <header className='header'>
            <a href="/" className="header__cont"><img src= {logo} alt="Pirovano" className='header__img'/></a>
            <div className='header__title'>
                <h1 className="header__h1">Servicio Tomografia Computada</h1>
                <h2 className='header__h2'>Pases de Guardia</h2>            
            </div>
        </header>
    );
};

export default header;