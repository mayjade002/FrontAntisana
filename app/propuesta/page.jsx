'use client';
import Link from 'next/link';

export default function Propuesta() {
  return (
    <div style={styles.background}>
      <div style={styles.content}>
        <h1 style={styles.title}>Nuestra Propuesta</h1>

        <p style={styles.text}>
          Desarrollar un sistema de predicción de precipitaciones avanzado que integre datos históricos y actuales con técnicas de inteligencia artificial y simulación hidrológica, permitiendo anticipar y predecir con precisión los niveles de precipitación y emitir alertas tempranas efectivas para prevenir desbordamientos y sequías que afecten a la comunidad, reduciendo así el riesgo de daños y pérdidas humanas y materiales.
        </p>

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
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  content: {
    maxWidth: '800px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  text: {
    fontSize: '1.3rem',
    lineHeight: '1.7',
    marginBottom: '2.5rem',
    textAlign: 'justify',
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
};
