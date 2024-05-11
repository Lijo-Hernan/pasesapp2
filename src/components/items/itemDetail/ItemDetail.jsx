import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './itemDetail.module.css';
import {useForm} from "react-hook-form";
import {collection, addDoc, Timestamp, updateDoc, getDoc, doc} from 'firebase/firestore'
import {db} from '../../firebase/config'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useAuth } from '../../../context/authContext';


const ItemDetail = ({eq}) => {
    const [apellido, setApellido] = useState('');
    // const [eqRep, setEqRep] =useState('');

    const auth = useAuth();

    const navegar = useNavigate()

    const {id} = useParams();
    
    const handleChange = (event) => {
        const textoMayusculas = event.target.value.toUpperCase();
        setApellido(textoMayusculas);
    };

    const {register, formState:{errors}, handleSubmit, watch} = useForm();

    const reportado = watch('pregunta')

    const eqDoc = doc(db, 'equipos', id)

    let nombreParaMostrar

    if (auth.usuario.displayName) {
        nombreParaMostrar=auth.usuario.displayName
    }else {
        nombreParaMostrar=auth.usuario.email
    } 

    useEffect (()=>{

        getDoc(eqDoc)
            .then(queryDocumentSnapshot => {
                if (queryDocumentSnapshot.exists && queryDocumentSnapshot.data()){
                const data = queryDocumentSnapshot.data()
                const adaptEq = {id: queryDocumentSnapshot.id, ...data}
                // setEqRep(adaptEq)
            } else{setError(true)}
        })
            .catch(() => {
                console.log('error')
            })

    },[eq])

const onSubmit = (datos)=> {
    const reporte =collection (db,'reportes')
    addDoc (reporte, {datos, fecha:Timestamp.fromDate(new Date()), logReporte: nombreParaMostrar} );
    updateDoc (eqDoc, {descripcion:datos.descripcion, 'reporte':Timestamp.fromDate(new Date()), ingreso:datos.ingreso, caso:datos.caso, logReporte: nombreParaMostrar});

    Swal.fire({
        title: `Se registra evento para ${eq.nombre}`,
        icon: 'success',
        confirmButtonText: 'Cerrar',
        background: 'green',
        color: 'white',
        confirmButtonColor:'red',
        width:'25em'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href='/'
        }
});
}

    return (

        <div className={classes.detail__card}>
                <h2 className={classes.item__titulo}>Reporte de falla de {eq.nombre}</h2>
            <div className={classes.seccionDatos}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <span className={classes.inputEquipo}>
                    <label htmlFor="equipo"></label>
                    <input type="text" id='equipo'{...register('equipo')} defaultValue={eq.nombre} />
                </span>
                <span>
                    <label htmlFor="ingreso">Fecha de la falla: </label>
                    <input type="date" id='ingreso' {...register('ingreso', {required:true})}/>
                    {errors.fecha?.type === 'required' && <p>Este campo es obligatorio</p>}
                </span>
                <span>
                    <label htmlFor="descripcion">Descripciòn: </label>
                    <textarea id='descripcion' {...register('descripcion', {required:true})} />
                    {errors.descripcion?.type === 'required' && <p>Este campo es obligatorio</p>}
                </span>
                <span>
                    <label htmlFor="apellido">Apellido: </label>
                    <input type="text" id='apellido'{...register('apellido', {required:true})} value={apellido} onChange={handleChange} />
                    {errors.apellido?.type === 'required' && <p>Este campo es obligatorio</p>}
                </span>
                <span>
                    <label htmlFor="pregunta">Se reporto a servicio tencnico?</label>
                    <input type="checkbox" id="pregunta" {...register ('pregunta')} className={classes.checkbox}/>
                </span> 
                <span>
                    <label htmlFor="caso">Numero de caso: </label>
                    <input type="text" id='caso' placeholder='caso' {...register('caso')}/>
                </span>

                <button type='submit' className={`btn btn-warning ${classes.datos__boton}`}>Enviar</button>
            </form>
                <section className={classes.datosServicio}>
                    <h2 className={classes.datos__titulo}>Datos del eqiupo relevantes para solicitar servicio técnico</h2>
                    <p className={classes.datos__p}>Telefono de servicio tecnico: {eq.telefono}</p>
                    <p className={classes.datos__p}>eMail: {eq.email}</p>
                    <p className={classes.datos__p}>Número de serie: {eq.serie}</p>
                </section>
            </div>
        </div>

    );
};

export default ItemDetail;