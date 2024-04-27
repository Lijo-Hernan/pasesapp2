import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {Timestamp, updateDoc, getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase/config'
import Loader from '../loader/Loader';
import classes from './finCaso.module.css'


const FinCaso = () => {

    const [cargando, setCargado]=useState(true)
    const [eq, setEq]= useState(""); 

    const navegar = useNavigate()

    const {register, handleSubmit } = useForm();

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


    const reinCaso = (datos)=> {

        updateDoc (eqDoc, {tecnico:datos.apellido, 'reporte':Timestamp.fromDate(new Date()), caso:"", descripcion:""})
        navegar('/')
        alert("Registro enviado correctamente, muchas gracias" )
    }

    return (
        <div>
            {cargando ? 
            <div className={classes.container}><span className={classes.loader}><Loader/></span></div> 
            :
            <div>
                <h1>Finalizacion de caso para {eq.nombre}</h1>
                <form onSubmit={handleSubmit(reinCaso)}>
                            <article className={classes.form__data}>
                                <label htmlFor="apellido">Apellido:{" "}
                                    <input type="text" id="apellido" required placeholder="Ingrese su Apellido" autoComplete="on" {...register("apellido")} />
                                </label>
                            </article>
                            <article className={classes.form__btn}>
                                <button className="btn btn-success btn-lg">Finalizar caso</button> 
                            </article>
                </form> 
            </div>}
        </div>
    );
};

export default FinCaso;