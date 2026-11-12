
import Header from '../components/Header.jsx'
import Etapes from '../components/Etapes.jsx'
import ArtisansTop from '../components/ArtisansTop.jsx'
import Footer from '../components/Footer.jsx'

function Accueil() {
  return (
    <>
      <Header />

      <main>
        <section className="accueil-section py-5">
          <div className="container text-center">
            <h1>Trouve ton artisan</h1>

            <p className="lead">
              Trouvez facilement un artisan près de chez vous
              en Auvergne-Rhône-Alpes.
            </p>

            <a href="/artisans" className="btn btn-primary">
              Découvrir les artisans
            </a>
          </div>
        </section>

        <Etapes />
        <ArtisansTop />
      </main>

      <Footer />
    </>
  )
}

export default Accueil
