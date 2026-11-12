
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row gy-4">

          <div className="col-md-5">
            <Link to="/" className="footer-logo">
            <img
                src="/Logo.png"
                alt="Trouve ton artisan avec la région Auvergne-Rhône-Alpes"
            />
            </Link>
          </div>

          <div className="col-md-3">
            <h3 className="footer-heading">Pages légales</h3>
            <ul className="footer-links">
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/donnees-personnelles">
                  Données personnelles
                </Link>
              </li>
              <li>
                <Link to="/accessibilite">Accessibilité</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h3 className="footer-heading">Antenne de Lyon</h3>
            <address>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France
            </address>

            <p>
              <a href="tel:+33426734000">
                +33 (0)4 26 73 40 00
              </a>
            </p>
          </div>

        </div>

        <hr className="footer-divider" />

        <p className="footer-copyright text-center mb-0">
          © {new Date().getFullYear()} Trouve ton artisan
        </p>
      </div>
    </footer>
  )
}

export default Footer
