import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../components/firebase/config";
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
        onAuthStateChanged,
        sendPasswordResetEmail,
        sendEmailVerification,
} from "firebase/auth";
import Swal from 'sweetalert2'

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);

    if (!context) {
        console.log("error de contexto");
    }
    
    return context;
};

export function AuthProvider ({children}) {

    const [usuario, setUsuario] = useState("")

    useEffect(()=>{
        const suscripto = onAuthStateChanged(auth, (currentUser)=>{
            if(!currentUser){
                setUsuario(null)
            }else {
                setUsuario(currentUser)
            }
        })
        return ()=>suscripto()
    },[])

    const registrar = async (email, password) => {
        const resp = await createUserWithEmailAndPassword(auth, email, password);
        const user = resp.user;
        await sendEmailVerification(user);
        await auth.signOut();
        Swal.fire({
            title: `Registro exitoso`,
            text: 'Revisa tu correo e iniciá sesion',
            icon: 'success',
            confirmButtonText: `<a style={color:'white'}href="/">Cerrar</a>`,
            background: 'green',
            color: 'white',
            confirmButtonColor:'black',
            width:'20em'
        })
        
    };

    const logIn = async (email, password) => {
    try {
        const resp = await signInWithEmailAndPassword(auth, email, password);
        const user = resp.user;

        if(user.emailVerified){
        iniciarTiempoSesion()
        } else {
            await auth.signOut();
            Swal.fire({
                title: `Email no verificado`,
                text: 'Revisa tu correo',
                icon: 'error',
                confirmButtonText: `<a style={color:'white'}href="/">Cerrar</a>`,
                background: 'red',
                color: 'white',
                confirmButtonColor:'black',
                width:'20em'
            })
        }
    } catch (error) {
    
        const errorCode = error.code;
        const errorMessage = error.message;
    
        if (errorCode === 'auth/user-not-found') {
            alert("Usuario no registrado.");
            
        } else if (errorCode === 'auth/invalid-login-credentials') {
            Swal.fire({
                title: `Error de credenciales`,
                text: 'Verificá tus datos o registrate ',
                icon: 'error',
                confirmButtonText: `<a style={color:'white'}href="/">Cerrar</a>`,
                background: 'red',
                color: 'white',
                confirmButtonColor:'black',
                width:'20em'
            })
        } else {
            Swal.fire({
                title: `Demasiados fallos de logueo`,
                text: 'Intente nuevamente más tarde.',
                icon: 'error',
                confirmButtonText: `<a style={color:'white'}href="/">Cerrar</a>`,
                background: 'red',
                color: 'white',
                confirmButtonColor:'black',
                width:'20em'
            })
        }
        }
};

const handlePassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        Swal.fire({
            title: `Se envió mail con exito`,
            text: 'Verificá tu casilla de correo no deseado',
            icon: 'success',
            confirmButtonText: `Cerrar`,
            background: 'green',
            color: 'white',
            confirmButtonColor:'blue',
            width:'20em'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href='/'
            }})

        } catch (error) {
        console.error(error);
        Swal.fire({
            title: `Error al enviar el correo electrónico de recuperación de contraseña.`,
            icon: 'error',
            confirmButtonText: `Cerrar`,
            background: 'red',
            color: 'white',
            confirmButtonColor:'black',
            width:'20em'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href='/'
            }})
        }
}

    const logInGoogle = async () => {
        const respGoogle = new GoogleAuthProvider();
        return await signInWithPopup(auth, respGoogle);
    };

    const logOut = async () => {
        const resp = await signOut(auth);
        window.location.href='/'
    };

    const iniciarTiempoSesion = () => {
        
        const tiempoEspera = 3 * 3600 * 1000; // 3 horas en milisegundos
        // const tiempoEspera = 120000; // 2 min  en milisegundos
        
        const tiempoSesion = setInterval(() => {
            const user = auth.currentUser;
            if (user) {
                logOut();
            } else {
                clearInterval(tiempoSesion);
            }
        }, tiempoEspera);
    };

    return (
        <authContext.Provider value={
            { registrar, logIn, logInGoogle, logOut, iniciarTiempoSesion, handlePassword, usuario }
        }>
            {children}
        </authContext.Provider>
    );
}

