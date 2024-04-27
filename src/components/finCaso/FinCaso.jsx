import { useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {Timestamp, updateDoc, getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase/config'
import classes from './finCaso.module.css'


const FinCaso = ({equipo, onClick}) => {

    const navegar = useNavigate()

    const {register, handleSubmit } = useForm();
    
    const eqDoc = doc(db, 'equipos', equipo.id)

    const handleFinishCase = () => {
            onClick(); 
            window.location.reload();
        };

    const reinCaso = (datos)=> {
        updateDoc (eqDoc, {tecnico:datos.apellido, reporte:Timestamp.fromDate(new Date()), caso:'', descripcion:''})
        handleFinishCase()
        alert("Registro enviado correctamente, muchas gracias" )
    }

    return (
        <div>
            <h1>Finalizacion de caso para {equipo.nombre}</h1>
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
            </div>
        
    );
};

export default FinCaso;