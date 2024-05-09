import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../components/firebase/config";
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
        onAuthStateChanged
} from "firebase/auth";

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
                // console.log("no hay usuario")
                setUsuario(null)
            }else {
                setUsuario(currentUser)
            }
        })
        return ()=>suscripto()
    },[])

    const registrar = async (email, password, apellido) => {
        const resp = await createUserWithEmailAndPassword(auth, email, password, apellido);
    };

    const logIn = async (email, password) => {
        const resp = await signInWithEmailAndPassword(auth, email, password);
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

