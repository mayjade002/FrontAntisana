'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Propuesta() {
  const [charts, setCharts] = useState({});

  const archivos = [
    {
      archivo: 'P55-Antisana_Diguchi_Precipitación-Mensual.csv',
      titulo: 'Precipitación Mensual - Diguchi'
    },
    {
      archivo: 'P43-Antisana_Limboasi_Precipitación-Mensual.csv',
      titulo: 'Precipitación Mensual - Limboasi'
    },
    {
      archivo: 'P42-Antisana_Ramón_Huañuna_Precipitación-Mensual.csv',
      titulo: 'Precipitación Mensual - Ramón Huañuna'
    },
    {
      archivo: 'H55-Río_Antisana_AC_Nivel_de_agua-Mensual.csv',
      titulo: 'Nivel de Agua - Río Antisana AC'
    },
    {
      archivo: 'H44-Antisana_DJ_Diguchi_Nivel_de_agua-Mensual.csv',
      titulo: 'Nivel de Agua - DJ Diguchi'
    }
  ];

  // 1. Cargar HTML interactivo de cada gráfico
  useEffect(() => {
    const fetchCharts = async () => {
      const results = {};
      for (const item of archivos) {
        try {
          const endpoint = `http://localhost:8000/interactive/${item.archivo}`;
          const res = await fetch(endpoint);
          const html = await res.text();
          results[item.titulo] = html;
        } catch (err) {
          console.error('Error cargando gráfico:', item.archivo, err);
        }
      }
      setCharts(results);
    };
    fetchCharts();
  }, []);

  // 2. Ejecutar scripts de Plotly cuando los gráficos ya estén en el DOM
  useEffect(() => {
  if (Object.keys(charts).length === 0) return;

  // Verificar si Plotly ya está cargado
  if (!window.Plotly) {
    const script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-3.0.1.min.js"; // la misma versión que genera el backend
    script.async = true;
    script.onload = () => ejecutarScripts();
    document.head.appendChild(script);
  } else {
    ejecutarScripts();
  }

  function ejecutarScripts() {
    const chartDivs = document.querySelectorAll('[id^="plotly-chart-"]');
    chartDivs.forEach(div => {
      const scripts = div.querySelectorAll("script");
      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        newScript.type = oldScript.type || "text/javascript";
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.replaceWith(newScript);
      });
    });
  }
}, [charts]);

return (
    <div style={styles.background}>
      <div style={styles.content}>
        <h1 style={styles.title}>Nuestra Propuesta</h1>

        <p style={styles.text}>
          Desarrollar un sistema de predicción de precipitaciones que integre datos históricos, permitiendo anticipar y predecir con precisión los niveles de precipitación y emitir alertas tempranas efectivas para prevenir desbordamientos y sequías que afecten a la comunidad, reduciendo así el riesgo de daños y pérdidas humanas y materiales.
        </p>

        <h2 style={styles.subtitle}>¿Por qué mostrar estas gráficas?</h2>
        <p style={styles.text}>
          Estas gráficas representan el análisis mensual de la precipitación y del nivel de agua en dos zonas clave del sistema hídrico del Antisana. Las estaciones de monitoreo muestran cómo varía la cantidad de lluvia y el nivel del agua entre meses y años, revelando patrones estacionales, eventos extremos y anomalías hidrometeorológicas. Esta información sustenta la necesidad de un sistema predictivo que permita alertar a tiempo sobre posibles riesgos como crecidas, desbordamientos o sequías.
        </p>

        <h2 style={styles.subtitle}>Análisis Interactivo de Precipitación y Nivel de Agua</h2>
        <div style={styles.rowContainer}>
          {Object.entries(charts).map(([titulo, html], index) => (
            <div key={titulo} style={styles.chartCard}>
              <h3 style={styles.chartTitle}>{titulo}</h3>
              <div id={`plotly-chart-${index}`} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          ))}
        </div>

        <h2 style={styles.subtitle}>Presupuesto Estimado del Sistema</h2>
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
    background: 'linear-gradient(to bottom right, #1e3c72, #2a5298)',
    minHeight: '100vh',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
  },
  content: {
    maxWidth: '1100px',
    width: '100%',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.9rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  text: {
    fontSize: '1.3rem',
    lineHeight: '1.7',
    marginBottom: '2rem',
    textAlign: 'justify',
  },
  rowContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '2.5rem',
  },
  chartCard: {
    flex: '1 1 calc(48% - 1rem)',
    backgroundColor: '#2a4f8d',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00bcd4',
    color: 'white',
    padding: '0.9rem 1.8rem',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    backgroundColor: '#ffffff20',
    borderCollapse: 'collapse',
    color: 'white',
    marginBottom: '2rem',
  },
  th: {
    border: '1px solid white',
    padding: '0.8rem',
    backgroundColor: '#1e3c72',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid white',
    padding: '0.8rem',
  },
};
