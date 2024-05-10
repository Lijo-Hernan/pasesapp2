import React, { useState, useEffect } from 'react';
import classes from './login.module.css'
import { Stack, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from '../../context/authContext';

const Login = () => {
    const auth = useAuth();
    const iniciarTiempoSesion = auth.iniciarTiempoSesion;

    const [registrado, setRegistrado] = useState(true);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [apellido, setApellido] = useState('');

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
            auth.registrar(correo, password, apellido);
        }
    }

    const handleGoogle = () => {
        auth.logInGoogle().then(() => {
        }).catch((error) => {
            console.error("Error al iniciar sesión con Google:", error);
        });
    };

    return (
        <>
        <div className={classes.login__body}>
            <Container className={classes.form__container}>
                <span className={classes.form__img}>
                <img src='https://firebasestorage.googleapis.com/v0/b/pasesapp-d01af.appspot.com/o/EscudoPiroSinFondo.png?alt=media&token=2486eaa3-05a0-414e-a419-524473e218ce' 
                    alt="Pirovano" className={classes.img}/>
                    <h2 className={classes.intro}>Sistema de pases de guardia, tomografia computada</h2>
                </span>
                <Stack className={classes.form__group}>
                    <section className={classes.login}>
                        <h2>{registrado ? "Iniciar sesión" : "Registrarse"}</h2>
                        <Form onSubmit={submitHandler} className={classes.form__section}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Dirección de Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                <Form.Text className="text-muted">
                                    No se compartirá su información.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {registrado ? "Iniciar sesión" : "Registrarse"}
                            </Button>
                    </Form>
                    </section>
                    <section className={classes.opciones}>
                        <h2 className={classes.bienvenida}>Bienvenido</h2>
                        <hr className={classes.linea}/>
                    <span className={classes.botones}>
                        <Button variant="primary" onClick={handleGoogle}>
                            Acceder con Google
                        </Button>
                        <Button variant="primary" onClick={() => setRegistrado(!registrado)}>
                            {registrado ? "¿No tenes cuenta? Regístrate" : "¿Tienes cuenta? Inicia sesión"}
                        </Button>
                    </span>
                    </section>
                </Stack>
            </Container>
        </div>
        </>
    );
};

export default Login;