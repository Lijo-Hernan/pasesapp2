import 'bootstrap/dist/css/bootstrap.css';
import classes from './historialItem.module.css'


const HistorialItem = ({reporte}) => {

    let formattedDate = "Sin fecha de reporte";

    if (reporte.fecha && reporte.fecha.seconds) {
        const date = new Date(reporte.fecha.seconds * 1000);
        formattedDate = date.toLocaleString();
    }

    let numCaso ="No se solicito servicio tecnico"
    if (reporte.datos.caso !=undefined){
        numCaso=reporte.datos.caso
    }

    return (
    <>
        <article className={classes.item__card}>
            <h2 className={classes.item__titulo}>{reporte.datos.equipo}</h2>
                    <div className={classes.item__inner}>
                        <span className={classes.item__span}>
                            <p className={classes.item__p}>Fecha de reporte: {formattedDate}</p>
                            <p className={classes.item__p}>Numero de Caso: {numCaso}</p>
                            <p className={classes.item__p}>Descripcion: {reporte.datos.descripcion}</p>
                            <p className={classes.item__p}>Técnico: {reporte.datos.apellido}</p>
                        </span>
                    </div>
        </article>
    </>
    );
};

export default HistorialItem;