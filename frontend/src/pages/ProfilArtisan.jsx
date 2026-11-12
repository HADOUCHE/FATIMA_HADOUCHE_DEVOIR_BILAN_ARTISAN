
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'


// import des photos des artisans
import bijoutier from '../assets/images/artisans/bijoutier.jpg'
import boucher from '../assets/images/artisans/boucher.jpg'
import boulanger from '../assets/images/artisans/boulanger.jpg'
import chauffagiste from '../assets/images/artisans/chauffagiste.jpg'
import chocolatier from '../assets/images/artisans/chocolatier.jpg'
import coiffeur from '../assets/images/artisans/coiffeur.jpg'
import couturier from '../assets/images/artisans/couturier.jpg'
import electricien from '../assets/images/artisans/electricien.jpg'
import ferronnier from '../assets/images/artisans/ferronnier.jpg'
import fleuriste from '../assets/images/artisans/fleuriste.jpg'
import menuisier from '../assets/images/artisans/menuisier.jpg'
import plombier from '../assets/images/artisans/plombier.jpg'
import toiletteur from '../assets/images/artisans/toiletteur.jpg'
import traiteur from '../assets/images/artisans/traiteur.jpg'
import webdesigner from '../assets/images/artisans/webdesigner.jpg'

//Récupération des images des artisans dans un objet pour un accès facile
const imagesArtisans = {
  Bijoutier: bijoutier,
  Boucher: boucher,
  Boulanger: boulanger,
  Chauffagiste: chauffagiste,
  Chocolatier: chocolatier,
  Coiffeur: coiffeur,
  Couturier: couturier,
  Electricien: electricien,
  Ferronnier: ferronnier,
  Fleuriste: fleuriste,
  Menuisier: menuisier,
  Plombier: plombier,
  Toiletteur: toiletteur,
  Traiteur: traiteur,
  Webdesign: webdesigner,
}


// etape 1 : création du composant ProfilArtisan
function ProfilArtisan() {
  const { id } = useParams()
  const [artisan, setArtisan] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3000/api/artisans/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Artisan introuvable.')
        return response.json()
      })
      .then(setArtisan)
      .catch((error) => setErreur(error.message))
      .finally(() => setChargement(false))
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const nom = formData.get('nom')
    const email = formData.get('email')
    const objet = formData.get('objet')
    const message = formData.get('message')

    const sujet = encodeURIComponent(objet)
    const corps = encodeURIComponent(
      `Nom : ${nom}\nEmail : ${email}\n\n${message}`
    )

    window.location.href =
      `mailto:${artisan.email}?subject=${sujet}&body=${corps}`
  }

  return (
    <>
      <Header />

      <main className="container py-5">
        <Link to="/artisans" className="btn btn-outline-primary mb-4">
          ← Retour aux artisans
        </Link>

        {chargement && <p>Chargement du profil...</p>}
        {erreur && <p className="text-danger">{erreur}</p>}

        {artisan && (
          <article className="card artisan-card">
            <div className="card-body p-4">
              <h1>{artisan.nom}</h1>

              <div className="my-3">
                <div className="my-3">
                  <img
                    src={imagesArtisans[artisan.Specialite?.nom_specialite]}
                    alt={`${artisan.nom} - ${artisan.Specialite?.nom_specialite}`}
                    className="img-fluid rounded"
                    style={{
                      width: '100%',
                      maxHeight: '350px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>

              <div className="artisan-note" aria-label={`Note : ${artisan.note ?? 0} sur 5`}>
                  <span aria-hidden="true">
                    {'★'.repeat(Math.round(Number(artisan.note) || 0))}
                    {'☆'.repeat(5 - Math.round(Number(artisan.note) || 0))}
                  </span>
                  {' '}
                  {artisan.note ?? 'Non noté'} / 5
              </div>


              <p><strong>Ville :</strong> {artisan.ville}</p>

              <p>
                <strong>Spécialité :</strong>{' '}
                {artisan.Specialite?.nom_specialite ?? 'Non renseignée'}
              </p>

              <h2 className="h4 mt-4">À propos</h2>
              <p>{artisan.a_propos}</p>

              <h2 className="h4 mt-4">Contacter cet artisan</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">Votre nom</label>
                  <input type="text" id="nom" name="nom" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Votre e-mail</label>
                  <input type="email" id="email" name="email" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="objet" className="form-label">Objet</label>
                  <input type="text" id="objet" name="objet" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Votre message</label>
                  <textarea id="message" name="message" className="form-control" rows="5" required />
                </div>

                <button type="submit" className="btn btn-primary">
                  Envoyer le message
                </button>
              </form>

              {artisan.site_web && (
                <p className="mt-4">
                  <strong>Site web :</strong>{' '}
                  <a href={artisan.site_web} target="_blank" rel="noreferrer">
                    Visiter le site
                  </a>
                </p>
              )}
            </div>
          </article>
        )}
      </main>

      <Footer />
    </>
  )
}

export default ProfilArtisan
