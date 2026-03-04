import { useState, useMemo } from 'react';
import { useShots } from '../context/ShotContext';
import ShotCard from '../components/ShotCard';
import { Link } from 'react-router-dom';

export default function ShotHistory() {
  const { shots, deleteShot } = useShots();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterRating, setFilterRating] = useState(0);
  const [filterRoast, setFilterRoast] = useState('');

  const filtered = useMemo(() => {
    let result = [...shots];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.beanName?.toLowerCase().includes(q) ||
          s.roaster?.toLowerCase().includes(q) ||
          s.origin?.toLowerCase().includes(q) ||
          s.flavorNotes?.toLowerCase().includes(q) ||
          s.notes?.toLowerCase().includes(q)
      );
    }

    if (filterRating > 0) {
      result = result.filter((s) => s.rating >= filterRating);
    }

    if (filterRoast) {
      result = result.filter((s) => s.roastLevel === filterRoast);
    }

    switch (sortBy) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'date-desc':
      default:
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return result;
  }, [shots, search, sortBy, filterRating, filterRoast]);

  return (
    <div className="shot-history">
      <div className="dashboard-header">
        <h1>Shot History</h1>
        <Link to="/new" className="btn btn-primary">+ New Shot</Link>
      </div>

      <div className="filters">
        <input
          type="text"
          className="filter-search"
          placeholder="Search beans, roasters, notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="rating-asc">Lowest Rated</option>
        </select>
        <select value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))}>
          <option value={0}>All Ratings</option>
          <option value={1}>1+ Stars</option>
          <option value={2}>2+ Stars</option>
          <option value={3}>3+ Stars</option>
          <option value={4}>4+ Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        <select value={filterRoast} onChange={(e) => setFilterRoast(e.target.value)}>
          <option value="">All Roasts</option>
          <option value="light">Light</option>
          <option value="medium-light">Medium-Light</option>
          <option value="medium">Medium</option>
          <option value="medium-dark">Medium-Dark</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <p className="results-count">
        {filtered.length} shot{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>{shots.length === 0 ? 'No shots logged yet.' : 'No shots match your filters.'}</p>
          {shots.length === 0 && (
            <Link to="/new" className="btn btn-primary">Log Your First Shot</Link>
          )}
        </div>
      ) : (
        <div className="shot-list">
          {filtered.map((shot) => (
            <ShotCard key={shot.id} shot={shot} onDelete={deleteShot} />
          ))}
        </div>
      )}
    </div>
  );
}
