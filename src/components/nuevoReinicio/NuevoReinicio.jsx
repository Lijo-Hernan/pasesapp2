import { useForm } from 'react-hook-form';
import {Timestamp, updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase/config'
import classes from './nuevoReinicio.module.css'
import Swal from 'sweetalert2'


const NuevoReinicio = ({equipo, onClick}) => {

    const {register, handleSubmit } = useForm();
    
    const eqDoc = doc(db, 'equipos', equipo.id)

    const handleFinishCase = () => {
            onClick(); 
        };

    const reinicio = async (datos) => {
        try {
            await updateDoc(eqDoc, { tecnico: datos.apellido, reinicio: Timestamp.fromDate(new Date()) });
        
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
        handleFinishCase();
        } catch (error) {
            alert("Error al actualizar el documento");
        }
    };

    return (
        <div className={classes.canvasCont}>
            <h1 className={classes.canvasTitle}>Reporte de Reinicio para {equipo.nombre}</h1>
                <form onSubmit={handleSubmit(reinicio)}>
                    <article className={classes.canvasData}>
                        <label htmlFor="apellido" className={classes.canvasData}>Apellido:{" "}
                            <input type="text" id="apellido" required placeholder="Ingrese su Apellido" autoComplete="on" {...register("apellido")} />
                        </label>
                    </article>
                    <article className={classes.form__btn}>
                        <button className={`btn btn-success ${classes.botonCanvas}`}>Reinicio</button> 
                    </article>
                </form> 
            </div>
        
    );
};

export default NuevoReinicio;