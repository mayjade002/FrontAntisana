'use client';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Home() {
  return (
    <div style={styles.page}>
      {/* Carrusel de pantalla completa */}
      <section style={styles.fullscreenCarousel}>
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={3500}
          showStatus={false}
          emulateTouch
          showArrows={false}
          stopOnHover={false}
          transitionTime={900}
        >
          <div>
            <img src="/antisana.jpg" alt="Antisana 1" style={styles.carouselImage} />
            <p className="legend">Vista panorámica del volcán</p>
          </div>
          <div>
            <img src="/antisana2.jpg" alt="Antisana 2" style={styles.carouselImage} />
            <p className="legend">Glaciares milenarios</p>
          </div>
          <div>
            <img src="/antisana1.jpg" alt="Antisana 3" style={styles.carouselImage} />
            <p className="legend">Reserva ecológica</p>
          </div>
        </Carousel>
      </section>

      {/* Sección Ubicación */}
      <section style={styles.section}>
        <h2 style={styles.titleDecorado}>📍 ¿Dónde está el Antisana?</h2>

        <div style={styles.infoGrid}>
          <div style={styles.infoBox}>
            <p style={styles.text}>🗻 <strong>Altura:</strong> 5.758 m s. n. m.</p>
            <p style={styles.text}>🌎 <strong>Ubicación:</strong> Cordillera Oriental de los Andes</p>
            <p style={styles.text}>💧 <strong>Importancia:</strong> Fuente hídrica vital para Quito</p>
            <p style={styles.text}>🌿 <strong>Conservación:</strong> En la Reserva Ecológica Antisana</p>
          </div>

          <div style={styles.mapCard}>
            <iframe
              title="Ubicación Antisana"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15948.309720396216!2d-78.22357430369367!3d-0.4811060568746215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5a2aeb6474b3b%3A0x2c38b3fc0a92a7a6!2sAntisana!5e0!3m2!1ses!2sec!4v1719093332695!5m2!1ses!2sec"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Sección Propuesta */}
      <section id="propuesta" style={styles.propuestaSection}>
        <h2 style={styles.titleLight}>Nuestra Propuesta</h2>
        <p style={styles.textLight}>
          Desarrollar un sistema de predicción de precipitaciones avanzado que integre datos históricos y actuales con técnicas de inteligencia artificial y simulación hidrológica, permitiendo anticipar y predecir con precisión los niveles de precipitación y emitir alertas tempranas efectivas para prevenir desbordamientos y sequías que afecten a la comunidad, reduciendo así el riesgo de daños y pérdidas humanas y materiales.
        </p>
        <Link href="/propuesta">
          <button style={styles.secondaryButton}>Leer más</button>
        </Link>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f5f7fa',
  },
  fullscreenCarousel: {
    height: '100vh',
    width: '100%',
  },
  carouselImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100vh',
  },
  section: {
    padding: '4rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  titleDecorado: {
    fontSize: '2.4rem',
    textAlign: 'center',
    marginBottom: '2.5rem',
    color: '#0070f3',
    borderBottom: '2px solid #00bcd4',
    display: 'inline-block',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.7',
    textAlign: 'justify',
    marginBottom: '1.2rem',
    color: '#444',
  },
  infoGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infoBox: {
    flex: '1 1 300px',
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
  mapCard: {
    flex: '1 1 400px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  },
  propuestaSection: {
    backgroundColor: '#1c2b3a',
    color: '#fff',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  titleLight: {
    fontSize: '2.2rem',
    marginBottom: '1rem',
    color: '#00bcd4',
  },
  textLight: {
    fontSize: '1.2rem',
    lineHeight: '1.7',
    maxWidth: '900px',
    margin: '0 auto 2rem',
  },
  secondaryButton: {
    padding: '0.9rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#1c2b3a',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};
