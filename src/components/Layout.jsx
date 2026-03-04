import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo">
            <span className="logo-icon">&#9749;</span>
            <span>Espresso Ledger</span>
          </NavLink>
          <nav className="nav">
            <NavLink to="/" end>Dashboard</NavLink>
            <NavLink to="/new">New Shot</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
