import React from 'react';
import classes from './footer.module.css'


const header = () => {

    return (
        <footer className={classes.footer}>
            <div className={classes.footer__title}>
                <h5 className={classes.footer__h3}>App y logo creados por Hernán Lijó</h5>            
            </div>
            <div className={classes.footer__mail}>
                <b>Email:</b><a href="lijo.hernanpablo@gmail.com">lijo.hernanpablo@gmail.com</a>
            </div>
        </footer>
    );
};

export default header;