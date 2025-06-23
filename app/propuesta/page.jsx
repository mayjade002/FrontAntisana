'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export default function PrototipoInteractivo() {
  const [lluviaPrediccion, setLluviaPrediccion] = useState(null);
  const [sequiaPrediccion, setSecaPrediccion] = useState(null);
  const [charts, setCharts] = useState({});
  const [loading, setLoading] = useState(true);

  const archivos = [
    {
      archivo: 'P55-Antisana_Diguchi_Precipitación-Mensual.csv',
      tipo: 'bar',
      titulo: 'Precipitación Mensual - Diguchi'
    },
    {
      archivo: 'P43-Antisana_Limboasi_Precipitación-Mensual.csv',
      tipo: 'bar',
      titulo: 'Precipitación Mensual - Limboasi'
    },
    {
      archivo: 'P42-Antisana_Ramón_Huañuna_Precipitación-Mensual.csv',
      tipo: 'bar',
      titulo: 'Precipitación Mensual - Ramón Huañuna'
    },
    {
      archivo: 'H55-Río_Antisana_AC_Nivel_de_agua-Mensual.csv',
      tipo: 'trend',
      titulo: 'Nivel de Agua - Río Antisana AC'
    },
    {
      archivo: 'H44-Antisana_DJ_Diguchi_Nivel_de_agua-Mensual.csv',
      tipo: 'trend',
      titulo: 'Nivel de Agua - DJ Diguchi'
    }
  ];

  const datosLluvia = [
    { mes: 'Ene', probabilidad: 20 },
    { mes: 'Feb', probabilidad: 30 },
    { mes: 'Mar', probabilidad: 50 },
    { mes: 'Abr', probabilidad: 80 },
    { mes: 'May', probabilidad: 70 },
    { mes: 'Jun', probabilidad: 60 },
  ];

  const datosSeca = [
    { mes: 'Ene', probabilidad: 80 },
    { mes: 'Feb', probabilidad: 70 },
    { mes: 'Mar', probabilidad: 60 },
    { mes: 'Abr', probabilidad: 30 },
    { mes: 'May', probabilidad: 40 },
    { mes: 'Jun', probabilidad: 50 },
  ];

  useEffect(() => {
    setLluviaPrediccion({ tendencia: datosLluvia, porcentaje: 70 });
    setSecaPrediccion({ tendencia: datosSeca, porcentaje: 65 });

    const fetchCharts = async () => {
      const results = {};
      for (const item of archivos) {
        try {
          const endpoint = item.tipo === 'bar'
            ? `http://localhost:8000/bar/${item.archivo}`
            : `http://localhost:8000/trend/${item.archivo}`;
          const res = await fetch(endpoint);
          const data = await res.json();
          results[item.titulo] = `data:image/png;base64,${data.image}`;
        } catch (err) {
          console.error('Error cargando gráfico:', item.archivo, err);
        }
      }
      setCharts(results);
      setLoading(false);
    };
    fetchCharts();
  }, []);

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.title}>Nuestra Propuesta</h1>

        <p style={styles.text}>
          Esta propuesta nace del análisis de datos recopilados por sensores ubicados estratégicamente en la cuenca del Antisana. Nuestro objetivo es anticipar eventos extremos mediante un sistema de predicción de precipitaciones, permitiendo la prevención de desbordamientos y sequías que afectan directamente a las comunidades.
        </p>

        <h2 style={styles.subtitle}>¿Por qué mostrar estas gráficas?</h2>
        <p style={styles.text}>
          Estas gráficas representan el análisis mensual de la precipitación y nivel de agua de distintas estaciones en el Antisana. Nos permiten identificar patrones, anomalías y sustentar la necesidad de implementar un sistema predictivo automatizado con alertas tempranas.
        </p>

        <h2 style={styles.subtitle}>💡 Prototipo</h2>

        <h2 style={styles.subtitle}>📊 Análisis de Precipitación</h2>
        {loading ? <p style={styles.loading}>🔄 Cargando gráficas...</p> : (
          <div style={styles.rowContainer}>
            {Object.entries(charts).filter(([titulo]) => titulo.includes('Precipitación')).map(([titulo, src]) => (
              <div key={titulo} style={{ ...styles.chartCard, backgroundColor: '#234e70' }}>
                <h3 style={styles.chartTitle}>{titulo}</h3>
                <img src={src} alt={titulo} style={styles.chartImageSmall} />
              </div>
            ))}
          </div>
        )}

        <h2 style={styles.subtitle}>🌊 Análisis de Nivel de Agua</h2>
        {loading ? <p style={styles.loading}>🔄 Cargando gráficas...</p> : (
          <div style={styles.rowContainer}>
            {Object.entries(charts).filter(([titulo]) => titulo.includes('Nivel de Agua')).map(([titulo, src]) => (
              <div key={titulo} style={{ ...styles.chartCard, backgroundColor: '#2a2f4a' }}>
                <h3 style={styles.chartTitle}>{titulo}</h3>
                <img src={src} alt={titulo} style={styles.chartImageSmall} />
              </div>
            ))}
          </div>
        )}

        <h2 style={styles.subtitle}>🔍 Predicciones Hídricas</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <section style={{ ...styles.panel, flex: '1 1 48%' }}>
            <h3 style={styles.chartTitle}>🌧️ Predicción de Lluvias</h3>
            <p style={styles.alert}>⚠️ Se prevé aumento del nivel del agua en julio con un 70% de probabilidad.</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lluviaPrediccion?.tendencia || []}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="probabilidad" stroke="#2196f3" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section style={{ ...styles.panel, flex: '1 1 48%' }}>
            <h3 style={styles.chartTitle}>🔥 Predicción de Sequía</h3>
            <p style={styles.alert}>⚠️ Se pronostica descenso del caudal en julio con un 65% de probabilidad de sequía.</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sequiaPrediccion?.tendencia || []}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="probabilidad" stroke="#ef5350" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </div>

        <h2 style={styles.subtitle}>💰 Presupuesto Estimado</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Elemento</th>
              <th>Costo Estimado (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Sensores de precipitación y nivel</td><td>$4,500</td></tr>
            <tr><td>Estaciones de transmisión (GSM/LoRa)</td><td>$2,000</td></tr>
            <tr><td>Servidor y almacenamiento local</td><td>$1,200</td></tr>
            <tr><td>Desarrollo del sistema (software)</td><td>$3,500</td></tr>
            <tr><td>Implementación y pruebas</td><td>$1,000</td></tr>
            <tr><td>Capacitación y documentación</td><td>$800</td></tr>
            <tr><td><strong>Total estimado</strong></td><td><strong>$13,000</strong></td></tr>
          </tbody>
        </table>

        <Link href="/">
          <button style={styles.button}>Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  background: {
    background: 'linear-gradient(to bottom right, #14213d, #1a2a6c)',
    minHeight: '100vh',
    color: 'white',
    padding: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.8rem',
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: 'bold',
    color: '#ffb703',
  },
  subtitle: {
    fontSize: '2rem',
    margin: '2rem 0 1rem',
    color: '#00e1ff',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.7',
    textAlign: 'justify',
  },
  loading: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: '1rem',
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  chartCard: {
    flex: '1 1 calc(33% - 1rem)',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'center',
  },
  chartTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  chartImageSmall: {
    width: '100%',
    borderRadius: '6px',
    border: '2px solid white',
  },
  panel: {
    backgroundColor: '#263859',
    padding: '1.5rem',
    borderRadius: '10px',
    marginBottom: '2rem',
  },
  alert: {
    backgroundColor: '#ff9800',
    color: 'black',
    padding: '0.7rem',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    backgroundColor: '#ffffff20',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#00bcd4',
    color: 'white',
    padding: '1rem 2rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
  },
};
