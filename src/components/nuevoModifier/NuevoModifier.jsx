import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {doc, getDoc, updateDoc, Timestamp} from 'firebase/firestore'
import {db} from '../firebase/config'
import Loader from '../loader/Loader';
import classes from './nuevoModifier.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const NuevoModifier = () => {
    const [stockItem, setStockItem]= useState(null)

    const navegar = useNavigate()

    const {idStock} = useParams();

    const {register, handleSubmit } = useForm();

    const productDoc = doc(db, 'stock', idStock)

    useEffect (()=>{

        getDoc(productDoc)
            .then(queryDocumentSnapshot => {
                if (queryDocumentSnapshot.exists && queryDocumentSnapshot.data()){
                const data = queryDocumentSnapshot.data()
                const adaptProd = {id: queryDocumentSnapshot.id, ...data}
                setStockItem(adaptProd)
            } else{setError(true)}
        })
            .catch(() => {
                console.log('error')
            })

    },[idStock])

    const stockActual = async(data) => {
        alert('El stock se modifico')
        navegar('/')
        await updateDoc (productDoc, {stock:data.stock, fecha:Timestamp.fromDate(new Date()), Apellido:data.apellido})
    }
    
    return (
        <div className={classes.stockContainer} >  
            {stockItem === null ? <Loader/> 
            : 
            <section>     
                <h2>Modifique el valor al stock actual de {stockItem.nombre}</h2>
                <h3>en cantidad de {stockItem.presentacion}</h3>
                    <form onSubmit={handleSubmit(stockActual)}>
                        <article className={classes.form__data}>
                            <label htmlFor="stock">Nuevo Sotck:{" "}
                                <input type="number" id="stock" min="0" required placeholder={`Valor actual: ${stockItem.stock}`} autoComplete="on"{...register("stock")}/>
                            </label>
                            <label htmlFor="apellido">Apellido:{" "}
                                <input type="text" id="apellido" required placeholder="Ingrese su Apellido" autoComplete="on" {...register("apellido")} />
                            </label>
                        </article>
                        <article className={classes.form__btn}>
                            <button className="btn btn-success btn-lg">Actualizar</button> 
                        </article>
                    </form> 
            </section>}
        </div>
    );
};

export default NuevoModifier;