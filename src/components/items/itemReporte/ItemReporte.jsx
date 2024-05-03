import {useState} from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './itemReporte.module.css'
import FinCaso from '../finCaso/FinCaso';


const ItemReporte = ({equipo}) => {

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    let numCaso = (equipo.caso) ? equipo.caso : "No se solicito servicio tecnico"

    
    let formattedDate = "No se declaro fecha de falla";

    if (equipo.reporte && equipo.reporte.seconds) {
        const date = new Date(equipo.reporte.seconds * 1000);
        formattedDate = date.toLocaleString();
    }

    return (
        <>

            <div className={classes.reporte}>
                <p className={classes.reporte__p}>Fecha de reporte: {formattedDate}</p>
                <p className={classes.reporte__p}>Numero de caso: {numCaso}</p>
                <p className={classes.reporte__p}>Descripcion: {equipo.descripcion}</p>
                <span className={classes.boton}>
                    <Button variant="success" onClick={handleShow}>
                        Finalizar caso
                    </Button>
                </span>
            </div>

            <Offcanvas show={showOffcanvas} onHide={handleClose} className={classes.canvasBody}>
            <Offcanvas.Body>
                {equipo &&  <FinCaso equipo={equipo} onClick={handleClose} />}
            </Offcanvas.Body>
            </Offcanvas>
        

        </>
    );
};

export default ItemReporte;