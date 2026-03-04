import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

export default function ShotCard({ shot, compact = false }) {
  const ratio = shot.dose > 0 ? (shot.yield / shot.dose).toFixed(1) : '—';
  const dateStr = new Date(shot.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="shot-card">
      <div className="shot-card-header">
        <div>
          <h3 className="shot-card-bean">{shot.beanName || 'Unnamed Bean'}</h3>
          {shot.roaster && <span className="shot-card-roaster">{shot.roaster}</span>}
        </div>
        <RatingStars value={shot.rating} readonly size="sm" />
      </div>

      <div className="shot-card-params">
        <div className="param">
          <span className="param-label">Dose</span>
          <span className="param-value">{shot.dose}g</span>
        </div>
        <div className="param">
          <span className="param-label">Yield</span>
          <span className="param-value">{shot.yield}g</span>
        </div>
        <div className="param">
          <span className="param-label">Ratio</span>
          <span className="param-value">1:{ratio}</span>
        </div>
        <div className="param">
          <span className="param-label">Time</span>
          <span className="param-value">{shot.extractionTime}s</span>
        </div>
        <div className="param">
          <span className="param-label">Temp</span>
          <span className="param-value">{shot.temperature}°C</span>
        </div>
        <div className="param">
          <span className="param-label">Grind</span>
          <span className="param-value">{shot.grindSetting || '—'}</span>
        </div>
      </div>

      {!compact && (
        <>
          {shot.flavorNotes && (
            <p className="shot-card-notes">
              <strong>Flavors:</strong> {shot.flavorNotes}
            </p>
          )}
          {shot.notes && (
            <p className="shot-card-notes">
              <strong>Notes:</strong> {shot.notes}
            </p>
          )}
        </>
      )}

      <div className="shot-card-footer">
        <time className="shot-card-date">{dateStr}</time>
        <Link to={`/shot/${shot.id}`} className="btn btn-sm">View Details</Link>
      </div>
    </div>
  );
}
