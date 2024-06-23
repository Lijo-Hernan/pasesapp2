import React, { useState, useEffect } from 'react';
import { Stack, Container, Form, Offcanvas, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from '../../context/authContext';
import Recupero from './recupero/Recupero';
import classes from './login.module.css'



const Login = () => {
    const auth = useAuth();

    const [registrado, setRegistrado] = useState(true);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [apellido, setApellido] = useState('');

    const logo = <img className={classes.logo} src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/logoGoo.png?alt=media&token=764ba6d3-b867-46aa-9911-96c226f83129' 
                    alt='google'/>

    useEffect(() => {
        setCorreo('');
        setPassword('');
        setApellido('');
    }, [registrado]);

    async function submitHandler(e) {
        e.preventDefault();
        if (registrado) {
            auth.logIn(correo, password);
        } else {
            auth.registrar(correo, password);
        }
    }

    const handleGoogle = () => {
        auth.logInGoogle().then(() => {
        }).catch((error) => {
            console.error("Error al iniciar sesión con Google:", error);
        });
    };

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);


    return (
        <>
        <div className={classes.login__body}>
            <Container className={registrado ? classes.form__container : classes.form__reg}>
                <span className={classes.form__img}>
                <img src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/EscudoPiroSinFondo.png?alt=media&token=2486eaa3-05a0-414e-a419-524473e218ce' 
                    alt="Pirovano" className={classes.img}/>
                <span className={classes.intro}><h2> Sistema de pases de guardia</h2><h3> TOMOGRAFIA COMPUTADA</h3></span>
                </span>
                <Stack className={classes.form__group}>
                    <section className={classes.login}>
                        <h2>{registrado ? "Iniciar sesión" : "Registrarse"}</h2>
                        <Form onSubmit={submitHandler} className={classes.form__section}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Dirección de Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                <Form.Text className={classes.form__p}>
                                    No se compartirá su información.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant={registrado ? "primary" : "warning"} type="submit">
                                {registrado ? "Iniciar sesión" : "Registrarse"}
                            </Button>
                    </Form>
                    </section>
                    <section className={classes.opciones}>
                        <h2 className={classes.bienvenida}>Bienvenido</h2>
                        <hr className={classes.linea}/>
                    <span className={classes.botones}>
                        <Button variant="primary" onClick={handleGoogle}>
                        Acceder con Google  {logo}
                        </Button>
                        <Button variant={registrado ? "primary" : "warning"} onClick={() => setRegistrado(!registrado)}>
                            {registrado ? "¿No tenes cuenta? Regístrate" : "¿Tienes cuenta? Inicia sesión"}
                        </Button>
                        <Button variant="primary" onClick={handleShow}>
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </span>
                    </section>
                </Stack>
            </Container>
        </div>

        <Offcanvas show={showOffcanvas} onHide={handleClose} className={classes.canvasBody}>
            <Offcanvas.Body>
                <Recupero/>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
};

export default Login;