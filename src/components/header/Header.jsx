import React from 'react';
import classes from './header.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const header = () => {
    return (
        <header className={classes.header}>
            <Link to='/' className={classes.header__link}><img src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/EscudoPiroSinFondo.png?alt=media&token=2486eaa3-05a0-414e-a419-524473e218ce' 
            alt="Pirovano" className={classes.header__img}/></Link>
            <div className={classes.header__title}>
                <h2 className={classes.header__h1}>Servicio Tomografia Computada</h2>
                <h3 className={classes.header__h2}>Pases de Guardia</h3>
            </div>
            <Link to='/historial' className={classes.header__boton}><b>Historial de Reportes</b></Link>            
        </header>
    );
};

export default header;