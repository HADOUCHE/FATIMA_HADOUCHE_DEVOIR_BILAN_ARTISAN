import Header from './components/Header.jsx'


function App() {
  return (
    <>
      <Header/>
      <main className="container mt-5">
          <h1 className="text-primary">
            Trouve ton artisan
          </h1>
          <p className="lead">
            Trouvez facilement un artisan près de chez vous.
          </p>
          <button className="btn btn-primary">
            Découvrir les artisans
          </button>
      </main>
    </>
  )
}
export default App