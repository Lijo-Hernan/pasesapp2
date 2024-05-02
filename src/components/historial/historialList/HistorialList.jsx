import { useState, useEffect } from 'react';
import classes from './historialList.module.css'
import HistorialItem from '../hisptorialItem/HistorialItem'


const HistorialList = ({reportes}) => {

    const [reportesOrdenados, setReportesOrdenados] = useState(reportes);


    useEffect(() => {
        const orderedReports = [...reportes].sort((a, b) => b.fecha - a.fecha );
        setReportesOrdenados(orderedReports);
        }, [reportes]);


    return (
        <section className={classes.listContainer}>
            {reportesOrdenados.map((reporte)=> (
                <HistorialItem 
                    key = {reporte.id}
                    reporte ={reporte}
                />
            ))}
        </section>
    );
};

export default HistorialList;