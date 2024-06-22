import {useState} from 'react';
import ItemReporte from '../itemReporte/ItemReporte'
import { Offcanvas, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './item.module.css'
import { Link } from 'react-router-dom';
import Reinicio from '../reinicio/Reinicio';

const Item = ({equipo}) => {

    let estado;

    if (equipo.descripcion === "") {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/tildeSinFondo.png?alt=media&token=6bfda763-b451-4128-bc5b-c4837592ed24' 
        alt='checkMark' />;
    }else {
        estado = <img className={classes.estado} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/xsinFondo.png?alt=media&token=8955479b-fd5e-4792-b7ba-8511e6b98361' 
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
            <span className={classes.item__titulo}>
                <h2 className={classes.in__titulo}>{equipo.nombre}</h2>
                <span className={classes.item__estado}>{estado}</span>
            </span>
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
                    </div>
                    : <ItemReporte equipo={equipo}/>}
        </article>
        <Offcanvas show={showOffcanvas} onHide={handleClose} className={classes.canvasBody}>

            <Offcanvas.Body>

                {equipo &&  <Reinicio equipo={equipo} onClick={handleClose} />}

            </Offcanvas.Body>
            </Offcanvas>

    </>
    );
};

export default Item;
