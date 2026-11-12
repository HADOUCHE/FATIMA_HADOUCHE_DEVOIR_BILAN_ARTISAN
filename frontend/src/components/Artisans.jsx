
import { useEffect, useState } from 'react'

function Artisans() {
  const [artisans, setArtisans] = useState([])
  const [categories, setCategories] = useState([])
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    const url = categorieSelectionnee
      ? `http://localhost:3000/api/artisans/categorie/${categorieSelectionnee}`
      : 'http://localhost:3000/api/artisans'

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Impossible de récupérer les artisans.')
        }
        return response.json()
      })
      .then((data) => setArtisans(data))
      .catch((error) => console.error(error))
  }, [categorieSelectionnee])

  return (
    <section className="artisans-section py-5" id="tous-les-artisans">
      <div className="container">
        <h2 className="text-center mb-3">Tous nos artisans</h2>

        <p className="text-center mb-4">
          Trouvez un professionnel près de chez vous.
        </p>

        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          <button
            className={`btn ${categorieSelectionnee === '' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategorieSelectionnee('')}
          >
            Tous
          </button>

          {categories.map((categorie) => (
            <button
              key={categorie.id_categorie}
              className={`btn ${categorieSelectionnee === categorie.id_categorie ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setCategorieSelectionnee(categorie.id_categorie)}
            >
              {categorie.nom_categorie}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {artisans.map((artisan) => (
            <div className="col-12 col-md-6 col-lg-4" key={artisan.id_artisan}>
              <article className="card artisan-card h-100">
                <div className="card-body">
                  <h3 className="card-title">{artisan.nom}</h3>

                  <p className="artisan-note">
                    ★ {artisan.note ?? 'Non noté'} / 5
                  </p>

                  <p>
                    <strong>Spécialité :</strong>{' '}
                    {artisan.Specialite?.nom_specialite}
                  </p>

                  <p>
                    <strong>Ville :</strong> {artisan.ville}
                  </p>

                  <button className="btn btn-primary">
                    Découvrir
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>

        {artisans.length === 0 && (
          <p className="text-center">Aucun artisan trouvé.</p>
        )}
      </div>
    </section>
  )
}

export default Artisans

