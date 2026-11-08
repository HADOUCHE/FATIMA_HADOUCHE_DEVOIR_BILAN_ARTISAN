function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img src="/Logo.png" alt="Trouve ton artisan" width="180"/>
          </a>
          {/* Menu de navigation */}
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#batiment">Bâtiment
            </a>
            <a className="nav-link" href="#services">Services
            </a>
            <a className="nav-link" href="#fabrication">Fabrication
            </a>
            <a className="nav-link" href="#alimentation">Alimentation
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Header