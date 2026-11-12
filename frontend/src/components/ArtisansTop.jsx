
import { useEffect, useState } from 'react'

function ArtisansTop() {
  const [artisans, setArtisans] = useState([])
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/artisans/top')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Impossible de récupérer les artisans.')
        }
        return response.json()
      })
      .then((data) => {
        setArtisans(data)
      })
      .catch((error) => {
        setErreur(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className="artisans-section py-5" id="artisans">
      <div className="container">
        <h2 className="text-center mb-3">Les artisans du mois</h2>
        <p className="text-center mb-5">
          Découvrez une sélection d'artisans de notre région.
        </p>

        {loading && <p className="text-center">Chargement des artisans...</p>}

        {erreur && <p className="text-center text-danger">{erreur}</p>}

        {!loading && !erreur && (
          <div className="row g-4">
            {artisans.map((artisan) => (
              <div className="col-12 col-md-6 col-lg-4" key={artisan.id_artisan}>
                <article className="card artisan-card h-100">
                  <div className="card-body">
                    <h3 className="card-title">{artisan.nom}</h3>

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

                    <a href={`/artisans/${artisan.id_artisan}`} className="btn btn-primary">
                      Découvrir
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}

        {!loading && !erreur && artisans.length === 0 && (
          <p className="text-center">Aucun artisan mis en avant pour le moment.</p>
        )}
      </div>
    </section>
  )
}

export default ArtisansTop
