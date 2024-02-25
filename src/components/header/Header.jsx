import React from 'react';
import classes from './header.module.css'
import logo from "../../../public/data/EscudoPiroSinFondo.png"
import { Link } from 'react-router-dom';

const header = () => {
    return (
        <header className={classes.header}>
            <Link to='/' className={classes.header__link}><img src= {logo} alt="Pirovano" className={classes.header__img}/></Link>
            <div className={classes.header__title}>
                <h1 className={classes.header__h1}>Servicio Tomografia Computada</h1>
                <h2 className={classes.header__h2}>Pases de Guardia</h2>            
            </div>
        </header>
    );
};

export default header;