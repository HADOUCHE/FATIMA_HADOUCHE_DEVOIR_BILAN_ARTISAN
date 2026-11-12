
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Accueil from './pages/Accueil.jsx'
import ListeArtisans from './pages/ListeArtisans.jsx'
import ProfilArtisan from './pages/ProfilArtisan.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/artisans" element={<ListeArtisans />} />
        <Route path="/artisans/:id" element={<ProfilArtisan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
