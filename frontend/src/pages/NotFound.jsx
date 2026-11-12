
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function NotFound() {
  return (
    <>
      <Header />

      <main className="container text-center py-5">

        <img
          src="/favicon-32.png"
          alt="Illustration de page introuvable"
          className="img-fluid mb-4"
          style={{ maxWidth: '350px' }}
        />

        <h1 className="display-1 fw-bold">404</h1>

        <h2>Oups ! Page introuvable</h2>

        <p className="lead mt-3">
          La page que vous recherchez n'existe pas
          ou a été déplacée.
        </p>

        <Link to="/" className="btn btn-primary mt-3">
          Retour à l'accueil
        </Link>

      </main>

      <Footer />
    </>
  )
}

export default NotFound
