import { useForm } from "react-hook-form";
import { Timestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import classes from "./finCaso.module.css";
import Swal from 'sweetalert2'
import { useAuth } from '../../../context/authContext';

const FinCaso = ({ equipo, onClick }) => {

    const auth = useAuth();

    const { register, handleSubmit } = useForm();

    const eqDoc = doc(db, "equipos", equipo.id);


    let nombreParaMostrar

    if (auth.usuario.displayName) {
        nombreParaMostrar=auth.usuario.displayName
    }else {
        nombreParaMostrar=auth.usuario.email
    }

    const handleFinishCase = () => {
            onClick();
        };

    const reinCaso = async (datos)=> {
        try {
            await updateDoc (eqDoc, {tecnico:datos.apellido, reporte:Timestamp.fromDate(new Date()), caso:'', descripcion:'', logfinDeCaso:nombreParaMostrar, logReporte:''})
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
                        <label htmlFor="apellido" className={classes.canvasData}>Verifique su Apellido:{" "}
                            <input type="text" id="apellido" required placeholder="Ingrese su Apellido" autoComplete="on" {...register("apellido")} />
                        </label>
                    </article>
                    <article className={classes.form__btn}>
                        <button className={`btn btn-success ${classes.botonCanvas}`}>Finalizar caso</button>
                    </article>
                </form>
            </div>

    );
};

export default FinCaso;
