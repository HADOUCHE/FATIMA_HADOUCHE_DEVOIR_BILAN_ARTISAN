
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function ListeArtisans() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [artisans, setArtisans] = useState([])
  const [categories, setCategories] = useState([])
  const [recherche, setRecherche] = useState(
    searchParams.get('recherche') || ''
  )
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  const categorieSelectionnee = searchParams.get('categorie') || ''

  // Synchroniser la recherche avec l'URL
  useEffect(() => {
    setRecherche(searchParams.get('recherche') || '')
  }, [searchParams])

  // Récupération des catégories
  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur catégories')
        }
        return response.json()
      })
      .then(setCategories)
      .catch(() => setErreur('Impossible de récupérer les catégories.'))
  }, [])

  // Récupération des artisans selon la catégorie
  useEffect(() => {
    setChargement(true)
    setErreur('')

    const url = categorieSelectionnee
      ? `http://localhost:3000/api/artisans/categorie/${categorieSelectionnee}`
      : 'http://localhost:3000/api/artisans'

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur artisans')
        }
        return response.json()
      })
      .then(setArtisans)
      .catch(() => setErreur('Impossible de récupérer les artisans.'))
      .finally(() => setChargement(false))
  }, [categorieSelectionnee])

  // Recherche d'un artisan par son nom
  const artisansFiltres = artisans.filter((artisan) =>
    artisan.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  // Changement de catégorie
  const changerCategorie = (id) => {
    setSearchParams((params) => {
      const nouveauxParams = new URLSearchParams(params)

      if (id) {
        nouveauxParams.set('categorie', id)
      } else {
        nouveauxParams.delete('categorie')
      }

      return nouveauxParams
    })
  }

  return (
    <>
      <Header />

      <main className="artisans-section py-5">
        <div className="container">

          <h1 className="text-center mb-3">
            Tous nos artisans
          </h1>

          <p className="text-center mb-4">
            Trouvez un professionnel près de chez vous.
          </p>

          {/* Barre de recherche */}
          <div className="mb-4">
            <label htmlFor="recherche-artisan" className="form-label">
              Rechercher un artisan
            </label>

            <input
              type="search"
              id="recherche-artisan"
              className="form-control"
              placeholder="Rechercher par nom..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">

            <button
              type="button"
              className={`btn ${
                categorieSelectionnee === ''
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => changerCategorie('')}
            >
              Tous
            </button>

            {categories.map((categorie) => (
              <button
                type="button"
                key={categorie.id_categorie}
                className={`btn ${
                  String(categorieSelectionnee) === String(categorie.id_categorie)
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                }`}
                onClick={() => changerCategorie(categorie.id_categorie)}
              >
                {categorie.nom_categorie}
              </button>
            ))}

          </div>

          {/* Chargement */}
          {chargement && (
            <p className="text-center">Chargement des artisans...</p>
          )}

          {/* Erreur */}
          {erreur && (
            <p className="text-center text-danger">{erreur}</p>
          )}

          {/* Liste des artisans */}
          {!chargement && !erreur && (
            <div className="row g-4">

              {artisansFiltres.map((artisan) => (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={artisan.id_artisan}
                >
                  <article className="card artisan-card h-100">
                    <div className="card-body">

                      <h2 className="card-title">
                        {artisan.nom}
                      </h2>

                      <div className="artisan-note" aria-label={`Note : ${artisan.note ?? 0} sur 5`}>
                          <span aria-hidden="true">
                            {'★'.repeat(Math.round(Number(artisan.note) || 0))}
                            {'☆'.repeat(5 - Math.round(Number(artisan.note) || 0))}
                          </span>
                          {' '}
                          {artisan.note ?? 'Non noté'} / 5
                      </div>


                      <p>
                        <strong>Spécialité :</strong>{' '}
                        {artisan.Specialite?.nom_specialite ?? 'Non renseignée'}
                      </p>

                      <p>
                        <strong>Ville :</strong> {artisan.ville}
                      </p>

                      <Link
                        to={`/artisans/${artisan.id_artisan}`}
                        className="btn btn-primary"
                      >
                        Découvrir
                      </Link>

                    </div>
                  </article>
                </div>
              ))}

            </div>
          )}

          {/* Aucun résultat */}
          {!chargement && !erreur && artisansFiltres.length === 0 && (
            <p className="text-center mt-4">
              Aucun artisan trouvé.
            </p>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}

export default ListeArtisans
