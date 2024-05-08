import React, { useState, useEffect } from 'react';
import { Stack, Container, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';





const Login = () => {
    const auth = useAuth();

    const [registrado, setRegistrado] = useState(false);
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
        auth.logInGoogle();
    };

    return (
        <>
            <Container>
                <Stack gap={3}>
                    <h1>{registrado ? "Iniciar sesión" : "Registrarse"}</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Dirección de Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            <Form.Text className="text-muted">
                                No se compartirá su información.
                            </Form.Text>
                        </Form.Group>
                        {/* {!registrado &&
                            <Form.Group className="mb-3" controlId="apellido">
                                <Form.Label>Apellido y Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Apellido y Nombre" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </Form.Group>
                        } */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {registrado ? "Iniciar sesión" : "Registrarse"}
                        </Button>
                    </Form>
                    <Button variant="primary" onClick={handleGoogle}>
                        Acceder con Google
                    </Button>
                    <Button variant="primary" onClick={() => setRegistrado(!registrado)}>
                        {registrado ? "¿No tienes cuenta? Regístrate" : "¿Tienes cuenta? Inicia sesión"}
                    </Button>
                </Stack>
            </Container>
        </>
    );
};

export default Login;