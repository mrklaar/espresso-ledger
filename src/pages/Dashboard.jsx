import { Link } from 'react-router-dom';
import { useShots } from '../context/ShotContext';
import ShotCard from '../components/ShotCard';

export default function Dashboard() {
  const { shots } = useShots();
  const recentShots = shots.slice(0, 5);

  const stats = {
    totalShots: shots.length,
    avgRating: shots.length
      ? (shots.reduce((sum, s) => sum + s.rating, 0) / shots.length).toFixed(1)
      : '—',
    avgDose: shots.length
      ? (shots.reduce((sum, s) => sum + Number(s.dose), 0) / shots.length).toFixed(1)
      : '—',
    avgYield: shots.length
      ? (shots.reduce((sum, s) => sum + Number(s.yield), 0) / shots.length).toFixed(1)
      : '—',
    avgTime: shots.length
      ? (shots.reduce((sum, s) => sum + Number(s.extractionTime), 0) / shots.length).toFixed(0)
      : '—',
    topBean: shots.length
      ? Object.entries(
          shots.reduce((acc, s) => {
            const name = s.beanName || 'Unnamed';
            acc[name] = (acc[name] || 0) + 1;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
      : '—',
  };

  if (shots.length === 0) {
    return (
      <div className="dashboard">
        <h1>Welcome to Espresso Ledger</h1>
        <div className="empty-state">
          <span className="empty-icon">&#9749;</span>
          <h2>No shots logged yet</h2>
          <p>Start tracking your espresso journey by logging your first shot.</p>
          <Link to="/new" className="btn btn-primary btn-lg">
            Log Your First Shot
          </Link>
          <p className="empty-hint">
            Tip: Visit <Link to="/settings">Settings</Link> first to set up your equipment and defaults.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/new" className="btn btn-primary">+ New Shot</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.totalShots}</span>
          <span className="stat-label">Total Shots</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.avgRating}</span>
          <span className="stat-label">Avg Rating</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.avgDose}g</span>
          <span className="stat-label">Avg Dose</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.avgYield}g</span>
          <span className="stat-label">Avg Yield</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.avgTime}s</span>
          <span className="stat-label">Avg Time</span>
        </div>
        <div className="stat-card">
          <span className="stat-value stat-value-text">{stats.topBean}</span>
          <span className="stat-label">Top Bean</span>
        </div>
      </div>

      <section>
        <div className="section-header">
          <h2>Recent Shots</h2>
          <Link to="/history" className="btn btn-sm">View All</Link>
        </div>
        <div className="shot-list">
          {recentShots.map((shot) => (
            <ShotCard key={shot.id} shot={shot} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
