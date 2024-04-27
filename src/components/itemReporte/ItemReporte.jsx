import {useState} from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './itemReporte.module.css'
import FinCaso from '../finCaso/FinCaso';

const ItemReporte = ({equipo}) => {

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        // <div className = {classes.reporte}>
        //     <p className={classes.reporte__p}>Fecha de reporte: {equipo.reporte}</p>
        //     <p className={classes.reporte__p}>Numero de caso: {equipo.caso}</p>
        //     <p className={classes.reporte__p}>Descripcion: {equipo.descripcion}</p>
        //     <Link to={`fincaso/${equipo.id}`} className='btn btn-success'>Finalizar caso</Link>
        // </div>
        <>
            <div className={classes.reporte}>
            <p className={classes.reporte__p}>Fecha de reporte: {equipo.reporte}</p>
            <p className={classes.reporte__p}>Numero de caso: {equipo.caso}</p>
            <p className={classes.reporte__p}>Descripcion: {equipo.descripcion}</p>
            <Button variant="success" onClick={handleShow}>
                Finalizar caso
            </Button>
            </div>

            <Offcanvas show={showOffcanvas} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Finalizar caso</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>Contenido del offcanvas...</p>
                {/* <Link to={`fincaso/${equipo.id}`} className="btn btn-success" onClick={handleClose}> */}
                {equipo &&  <FinCaso equipo={equipo} onClick={handleClose} />}
                {/* Finalizar caso */}
                {/* </Link> */}
            </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default ItemReporte;