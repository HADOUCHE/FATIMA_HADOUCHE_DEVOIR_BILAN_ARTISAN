
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [categories, setCategories] = useState([])
  const [recherche, setRecherche] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des catégories')
        }
        return response.json()
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error(error))
  }, [])

  const handleRecherche = (event) => {
    event.preventDefault()

    if (recherche.trim() !== '') {
      navigate(`/artisans?recherche=${encodeURIComponent(recherche.trim())}`)
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">

          <Link className="navbar-brand" to="/">
            <img src="/Logo.png" alt="Trouve ton artisan" width="180" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Ouvrir le menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="navbar-nav ms-auto">
              {categories.map((categorie) => (
                <Link
                  key={categorie.id_categorie}
                  className="nav-link"
                  to={`/artisans?categorie=${categorie.id_categorie}`}
                >
                  {categorie.nom_categorie}
                </Link>
              ))}
            </div>

            <form className="d-flex ms-lg-3" role="search" onSubmit={handleRecherche}>
              <input
                className="form-control"
                type="search"
                placeholder="Rechercher un artisan"
                aria-label="Rechercher un artisan"
                value={recherche}
                onChange={(event) => setRecherche(event.target.value)}
              />
              <button className="btn btn-primary ms-2" type="submit">
                Rechercher
              </button>
            </form>
          </div>

        </div>
      </nav>
    </header>
  )
}

export default Header
