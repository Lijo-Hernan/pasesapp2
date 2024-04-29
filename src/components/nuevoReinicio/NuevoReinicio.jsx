import { useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {Timestamp, updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase/config'
import classes from './nuevoReinicio.module.css'


const NuevoReinicio = ({equipo, onClick}) => {

    const navegar = useNavigate()

    const {register, handleSubmit } = useForm();
    
    const eqDoc = doc(db, 'equipos', equipo.id)

    const handleFinishCase = () => {
            onClick(); 
            window.location.reload();
        };

    // const reinicio = (datos)=> {
    //     updateDoc (eqDoc, {tecnico:datos.apellido, reinicio:Timestamp.fromDate(new Date())})
    //     alert("Registro enviado correctamente, muchas gracias" )
    //     handleFinishCase()
    // }

    const reinicio = async (datos) => {
        try {
            await updateDoc(eqDoc, { tecnico: datos.apellido, reinicio: Timestamp.fromDate(new Date()) });
            alert("Registro enviado correctamente, muchas gracias");
            handleFinishCase();
        } catch (error) {
            console.error("Error al actualizar el documento:", error);
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