import React from 'react';
import classes from './footer.module.css'
import { Button } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';

const header = () => {
    const auth = useAuth();

    const handleLogOut = ()=> {
        auth.logOut()
    }

    console.log(auth.usuario.email)
    return (
        <footer className={classes.footer}>
            <div className={classes.footer__title}>
                <h3 className={classes.footer__h3}>App y logo creados por Hernán Lijó</h3>            
            </div>
            <h3>{auth.usuario.email}</h3>
            <Button variant="primary" onClick={() => handleLogOut()}>
                Cerrar sesion
            </Button>
        </footer>
    );
};

export default header;