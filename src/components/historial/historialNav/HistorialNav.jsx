import { useEffect, useState } from 'react';
import classes from './historialNav.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query} from 'firebase/firestore'
import { db } from '../../firebase/config'

const HistorialNav = () => {

    const [categorias, setCategorias] = useState([])

    const navegar = useNavigate()

    useEffect(() => {
        const categoriesCollection = query(collection(db, 'equipos'), orderBy('nombre'))
        
        getDocs(categoriesCollection)
            .then(querySnapshot => {
                const categoriesAdapted = querySnapshot.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data}
                })
                setCategorias(categoriesAdapted)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <header className={classes.header}>
            <span className={classes.header__cont}>
                <nav className={classes.nav}>
                    <div className={classes.navbar__list}>
                        <Link to={`/historial`} className={classes.navbar__btn}>Todos los reportes</Link>
                        {categorias.map(cat => {
                            return <Link key={cat.id} to={`/historial/${cat.nombre}`} className={classes.navbar__btn}>
                                    {cat.nombre}</Link>
                        })}
                    </div>
                </nav>
            </span>
        </header>
    );
};

export default HistorialNav;