import { useState } from "react";
import { useForm } from "react-hook-form";
import { Timestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import classes from "./finCaso.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const FinCaso = ({ equipo, onClick }) => {
    const { register, handleSubmit } = useForm();

    const eqDoc = doc(db, "equipos", equipo.id);

    const handleFinishCase = () => {
            onClick();
            // window.location.reload();
        };

    const reinCaso = async (datos)=> {
        // toast.success("El equipo queda operativo nuevamente",{theme:'colored'});
        try {
            await updateDoc (eqDoc, {tecnico:datos.apellido, reporte:Timestamp.fromDate(new Date()), caso:'', descripcion:''})
        
            await Swal.fire({
                title: `Reinicio de ${equipo.nombre} registrado`,
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
        
            handleFinishCase()

        } catch (error) {
            console.error("Error al actualizar el documento:", error);
        }
    }

    return (
        <div className={classes.canvasCont}>
            <h1 className={classes.canvasTitle}>Finalizacion de caso para {equipo.nombre}</h1>
                <form onSubmit={handleSubmit(reinCaso)}>
                    <article className={classes.canvasData}>
                        <label htmlFor="apellido" className={classes.canvasData}>Apellido:{" "}
                            <input type="text" id="apellido" required placeholder="Ingrese su Apellido" autoComplete="on" {...register("apellido")} />
                        </label>
                    </article>
                    <article className={classes.form__btn}>
                        <button className={`btn btn-success ${classes.botonCanvas}`}>Finalizar caso</button>
                    </article>
                    <ToastContainer autoClose={2000}/>
                </form>
            </div>

    );
};

export default FinCaso;
