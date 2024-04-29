import {useState} from 'react';
import ItemReporte from '../itemReporte/ItemReporte'
import { Offcanvas, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './item.module.css'
import { Link } from 'react-router-dom';
import NuevoReinicio from '../nuevoReinicio/NuevoReinicio';

const Item = ({equipo}) => {

    let estado;

    if (equipo.descripcion === "") {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/checkMark.png?alt=media&token=6146dce1-56c3-4eeb-9dc5-389099690f6d' 
        alt='checkMark' />;
    }else {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/xMark.png?alt=media&token=8144ca63-bdb0-40cc-98d6-8530def2715c' 
        alt='xMArk' />;
    }

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);


    let formattedDate = "Sin fecha de reinicio";

    if (equipo.reinicio && equipo.reinicio.seconds) {
        const date = new Date(equipo.reinicio.seconds * 1000);
        formattedDate = date.toLocaleString();
    }


    return (
    <>
        <article className={classes.item__card}>
            <h2 className={classes.item__titulo}>{equipo.nombre}</h2>
                {equipo.descripcion === "" ?
                    <div className={classes.item__inner}>
                        <Link to={`reporte/${equipo.id}`} className='btn btn-danger'>Reportar un problema</Link>
                        <span className={classes.item__span}>
                            <p className={classes.item__p}>Fecha de reinicio: {formattedDate}</p>
                            <p className={classes.item__p}>Técnico: {equipo.tecnico}</p>
                        </span>
                        <Button variant="primary" onClick={handleShow}>
                            Reportar Reinicio
                        </Button>
                        {/* <Link to={`reinicio/${equipo.id}`} className='btn btn-primary'>Reportar reincio</Link> */}
                    </div>
                    : <ItemReporte equipo={equipo}/>}
            <span className={classes.item__estado}>{estado}</span>
        </article>
        <Offcanvas show={showOffcanvas} onHide={handleClose} className={classes.canvasBody}>
            {/* <Offcanvas.Header closeButton>
                <Offcanvas.Title>Reporte de Reinicio para {equipo.nombre}</Offcanvas.Title>
            </Offcanvas.Header> */}
            <Offcanvas.Body>
                {/* <Link to={`fincaso/${equipo.id}`} className="btn btn-success" onClick={handleClose}> */}
                {equipo &&  <NuevoReinicio equipo={equipo} onClick={handleClose} />}
                {/* Finalizar caso */}
                {/* </Link> */}
            </Offcanvas.Body>
            </Offcanvas>

    </>
    );
};

export default Item;
