
function Etapes() {
  const etapes = [
    {
      numero: "01",
      titre: "Choisissez une catégorie",
      description: "Sélectionnez le domaine qui correspond à votre besoin."
    },
    {
      numero: "02",
      titre: "Trouvez un artisan",
      description: "Découvrez les artisans disponibles près de chez vous."
    },
    {
      numero: "03",
      titre: "Consultez son profil",
      description: "Découvrez sa spécialité, sa note et son savoir-faire."
    },
    {
      numero: "04",
      titre: "Contactez-le",
      description: "Envoyez votre demande directement à l'artisan."
    }
  ]

  return (
    <section className="etapes-section py-5">
      <div className="container">
        <h2 className="text-center mb-3">Comment trouver mon artisan ?</h2>
        <p className="text-center mb-5">
          Trouver le bon artisan en quatre étapes simples.
        </p>

        <div className="row g-4">
          {etapes.map((etape) => (
            <div className="col-12 col-sm-6 col-lg-3" key={etape.numero}>
              <article className="etape-card h-100">
                <span className="etape-numero">{etape.numero}</span>
                <h3>{etape.titre}</h3>
                <p>{etape.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Etapes
