import React, { useState }from 'react';
import { useAuth } from '../../../context/authContext';
import classes from './recupero.module.css'

const Recupero = () => {

    const auth = useAuth();

    const [email, setEmail] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        auth.handlePassword(email);
    }

    return (
        <div className={classes.canvasCont}>
                <h3 className={classes.canvasTitle}>Introducí tu correo electrónico para buscar tu cuenta.</h3>
            <form onSubmit={handleSubmit}>
                <article className={classes.canvasData}>
                <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" value={email} placeholder='email' id='email' onChange={(event) => setEmail(event.target.value)} />
                </article>
                <span className={classes.form__btn}>
                    <button type="submit" className={`btn btn-success ${classes.botonCanvas}`}>Enviar</button>
                </span>
            </form>
        </div>
    );
};

export default Recupero;