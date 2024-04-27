import React, {useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {Timestamp, updateDoc, getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase/config'
import Loader from '../loader/Loader';
import classes from './reinicio.module.css'

const Reinicio = () => {

    const [eq, setEq]= useState(""); 

    const [cargando, setCargado]=useState(true)

    const navegar = useNavigate()

    const {id} = useParams();

    const eqDoc = doc(db, 'equipos', id)

    useEffect (()=> {
        const fetchEquipo = doc(db, "equipos",id);
        getDoc (fetchEquipo)
        .then ((resp)=> {
            setEq({...resp.data(), id: resp.id})
            setCargado(false)
        }) 
    },[id])

    const {register, handleSubmit } = useForm();

    const reiniciar = (datos)=> {

        updateDoc (eqDoc, {tecnico:datos.apellido, 'reinicio':Timestamp.fromDate(new Date())})
        navegar('/')
        alert("Registro enviado correctamente, muchas gracias" )
    }



    return (
        <div>
            {cargando ? 
            <div className={classes.container}><span className={classes.loader}><Loader/></span></div> 
            :
            <div>
                <h1>Registro de reinicio de {eq.nombre}</h1>
                <form onSubmit={handleSubmit(reiniciar)}>
                            <article className={classes.form__data}>
                                <label htmlFor="apellido">Apellido:{" "}
                                    <input type="text" id="apellido" required placeholder="Ingrese su Apellido" autoComplete="on" {...register("apellido")} />
                                </label>
                            </article>
                            <article className={classes.form__btn}>
                                <button className="btn btn-success btn-lg">Registrar reinicio</button> 
                            </article>
                </form> 
            </div>}
        </div>
    );
};

export default Reinicio;