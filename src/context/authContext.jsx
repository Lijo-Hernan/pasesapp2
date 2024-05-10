import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../components/firebase/config";
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
        onAuthStateChanged
} from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.css';
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
    };

    const logIn = async (email, password) => {
    //     try {
    //         const resp = await signInWithEmailAndPassword(auth, email, password);
    //     } catch (error){
    //         alert("Error de inicio de sesión:")       
    // }
    try {
        const { userCredential } = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
        console.error("Error:", error);
    
        const errorCode = error.code;
        const errorMessage = error.message;
    
        if (errorCode === 'auth/user-not-found') {
            alert("Usuario no registrado.");
        } else if (errorCode === 'auth/invalid-login-credentials') {
            Swal.fire({
                title: `Error de credenciales`,
                text: 'Verifique sus datos o registrese ',
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

    const logInGoogle = async () => {
        const respGoogle = new GoogleAuthProvider();
        return await signInWithPopup(auth, respGoogle);
    };

    const logOut = async () => {
        const resp = await signOut(auth);
        window.location.href='/'
    };

    const iniciarTiempoSesion = () => {
        
        // const tiempoEspera = 3 * 3600 * 1000;
        const tiempoEspera = 120000; // 2 min  en milisegundos
        
        const tiempoSesion = setInterval(() => {
            const user = firebase.auth().currentUser;
            if (user) {
                logOut();
            } else {
                clearInterval(tiempoSesion);
            }
        }, tiempoEspera);
    };

    return (
        <authContext.Provider value={
            { registrar, logIn, logInGoogle, logOut, iniciarTiempoSesion, usuario }
        }>
            {children}
        </authContext.Provider>
    );
}

