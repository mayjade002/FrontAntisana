'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function Propuesta() {
  const [charts, setCharts] = useState({});
  const [lluviaPrediccion, setLluviaPrediccion] = useState(null);
  const [sequiaPrediccion, setSecaPrediccion] = useState(null);
  const [loading, setLoading] = useState(true);

  const archivos = [
    { archivo: 'P55-Antisana_Diguchi_Precipitación-Mensual.csv', titulo: 'Precipitación Mensual - Diguchi' },
    { archivo: 'P43-Antisana_Limboasi_Precipitación-Mensual.csv', titulo: 'Precipitación Mensual - Limboasi' },
    { archivo: 'P42-Antisana_Ramón_Huañuna_Precipitación-Mensual.csv', titulo: 'Precipitación Mensual - Ramón Huañuna' },
    { archivo: 'H55-Río_Antisana_AC_Nivel_de_agua-Mensual.csv', titulo: 'Nivel de Agua - Río Antisana AC' },
    { archivo: 'H44-Antisana_DJ_Diguchi_Nivel_de_agua-Mensual.csv', titulo: 'Nivel de Agua - DJ Diguchi' }
  ];

  useEffect(() => {
    const datosLluvia = [
      { mes: 'Ene', probabilidad: 20 },
      { mes: 'Feb', probabilidad: 30 },
      { mes: 'Mar', probabilidad: 50 },
      { mes: 'Abr', probabilidad: 80 },
      { mes: 'May', probabilidad: 70 },
      { mes: 'Jun', probabilidad: 60 }
    ];
    const datosSeca = [
      { mes: 'Ene', probabilidad: 80 },
      { mes: 'Feb', probabilidad: 70 },
      { mes: 'Mar', probabilidad: 60 },
      { mes: 'Abr', probabilidad: 30 },
      { mes: 'May', probabilidad: 40 },
      { mes: 'Jun', probabilidad: 50 }
    ];
    setLluviaPrediccion({ tendencia: datosLluvia, porcentaje: 70 });
    setSecaPrediccion({ tendencia: datosSeca, porcentaje: 65 });

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
      setLoading(false);
    };
    fetchCharts();
  }, []);

  useEffect(() => {
    if (Object.keys(charts).length === 0) return;

    if (!window.Plotly) {
      const script = document.createElement("script");
      script.src = "https://cdn.plot.ly/plotly-3.0.1.min.js";
      script.async = true;
      script.onload = () => ejecutarScripts();
      document.head.appendChild(script);
    } else {
      ejecutarScripts();
    }

    function ejecutarScripts() {
      const chartDivs = document.querySelectorAll('[id^="plotly-chart"]');
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
          Esta propuesta nace del análisis de datos recopilados por sensores ubicados estratégicamente en la cuenca del Antisana. Nuestro objetivo es anticipar eventos extremos mediante un sistema de predicción de precipitaciones, permitiendo la prevención de desbordamientos y sequías que afectan directamente a las comunidades.
        </p>

        <p style={styles.text}>
          Estas gráficas representan el análisis mensual de la precipitación y nivel de agua de distintas estaciones en el Antisana. Nos permiten identificar patrones, anomalías y sustentar la necesidad de implementar un sistema predictivo automatizado con alertas tempranas.
        </p>

        {loading ? (
          <p style={styles.loading}>🔄 Cargando gráficas...</p>
        ) : (
          <>
            <h2 style={styles.subtitle}>📊 Análisis de Precipitación</h2>
            <section style={styles.flexRow}>
              {Object.entries(charts)
                .filter(([titulo]) => titulo.includes('Precipitación'))
                .map(([titulo, html], index) => (
                  <div key={titulo} style={{ ...styles.chartCard, flex: '1 1 32%' }}>
                    <h3 style={styles.chartTitle}>{titulo}</h3>
                    <div id={`plotly-chart-prec-${index}`} dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
                ))}
            </section>

            <p style={styles.text}>
              Los gráficos de precipitación mensual reflejan el comportamiento de las lluvias en tres estaciones clave de monitoreo del Antisana. En la estación <strong>P42 Ramón Huañuna</strong> se observa una fuerte variabilidad interanual, con picos superiores a los 300 mm desde 2015, posiblemente relacionados con fenómenos como El Niño. La estación <strong>P43 Limboasi</strong> muestra una serie más continua y estable entre 2008 y 2024, con máximos como el de julio de 2023 (230.6 mm), evidenciando un patrón estacional marcado. Finalmente, <strong>P55 Diguchi</strong> presenta valores más moderados y consistentes, entre 40 y 150 mm, pero con eventos intensos aislados como en 2016 y 2021, asociados a fenómenos de convección intensa como la ZCIT.
            </p>
            <h2 style={styles.subtitle}>🌊 Análisis de Nivel de Agua</h2>
            <section style={styles.flexRow}>
              {Object.entries(charts)
                .filter(([titulo]) => titulo.includes('Nivel de Agua'))
                .map(([titulo, html], index) => (
                  <div key={titulo} style={{ ...styles.chartCard, flex: '1 1 48%' }}>
                    <h3 style={styles.chartTitle}>{titulo}</h3>
                    <div id={`plotly-chart-nivel-${index}`} dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
                ))}
            </section>
          </>
        )}
        
        <h1 style={{ ...styles.subtitle, marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          🧱 Prototipo
        </h1>


        <h2 style={styles.subtitle}>🔍 Predicciones Hídricas</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <section style={{ ...styles.chartCard, backgroundColor: '#ffffff', color: '#000000', flex: '1 1 48%' }}>
            <h3 style={styles.panelTitle}>🌧️ Predicción de Lluvias</h3>
            <p style={styles.panelAlert}>⚠️ Se prevé aumento del nivel del agua en julio con un 70% de probabilidad.</p>
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

          <section style={{ ...styles.chartCard, backgroundColor: '#ffffff', color: '#000000', flex: '1 1 48%' }}>
            <h3 style={styles.panelTitle}>🔥 Predicción de Sequía</h3>
            <p style={styles.panelAlert}>⚠️ Se pronostica descenso del caudal en julio con un 65% de probabilidad de sequía.</p>
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
  chartCard: {
    backgroundColor: '#2a4f8d',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  chartTitle: {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  alert: {
    fontSize: '1rem',
    color: '#ffc107',
    marginBottom: '0.8rem',
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
  flexRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'space-between',
  },
  panelTitle: {
    color: '#1a237e',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  panelAlert: {
    color: '#ef6c00',
    marginBottom: '1rem'
  }
};
