import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShots } from '../context/ShotContext';
import RatingStars from '../components/RatingStars';

export default function ShotDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shots, deleteShot } = useShots();
  const shot = shots.find((s) => s.id === id);

  if (!shot) {
    return (
      <div className="shot-detail">
        <h1>Shot Not Found</h1>
        <Link to="/history" className="btn">Back to History</Link>
      </div>
    );
  }

  function handleDelete() {
    if (window.confirm('Delete this shot? This cannot be undone.')) {
      deleteShot(id);
      navigate('/history');
    }
  }

  const ratio = shot.dose > 0 ? `1:${(shot.yield / shot.dose).toFixed(1)}` : '—';
  const dateStr = new Date(shot.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const tastingLabels = { 1: 'Low', 2: 'Med-Low', 3: 'Medium', 4: 'Med-High', 5: 'High' };

  const equipmentNames = {
    wdt: 'WDT',
    rdt: 'RDT',
    blindShaker: 'Blind Shaker',
    meshScreen: 'Mesh Screen',
    paperFilterTop: 'Paper Filter (Top)',
    paperFilterBottom: 'Paper Filter (Bottom)',
    distributor: 'Distributor',
  };

  const usedEquipment = Object.entries(shot.equipmentUsed || {})
    .filter(([, v]) => v)
    .map(([k]) => equipmentNames[k] || k);

  return (
    <div className="shot-detail">
      <div className="dashboard-header">
        <div>
          <h1>{shot.beanName || 'Unnamed Bean'}</h1>
          {shot.roaster && <p className="shot-detail-roaster">by {shot.roaster}</p>}
          <time className="shot-card-date">{dateStr}</time>
        </div>
        <div className="shot-detail-actions">
          <Link to={`/edit/${shot.id}`} className="btn">Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="detail-section">
        <h2>Rating</h2>
        <RatingStars value={shot.rating} readonly size="lg" />
      </div>

      <div className="detail-section">
        <h2>Brewing Parameters</h2>
        <div className="detail-grid">
          <div className="detail-item"><span>Dose</span><strong>{shot.dose}g</strong></div>
          <div className="detail-item"><span>Yield</span><strong>{shot.yield}g</strong></div>
          <div className="detail-item"><span>Ratio</span><strong>{ratio}</strong></div>
          <div className="detail-item"><span>Grind</span><strong>{shot.grindSetting || '—'}</strong></div>
          <div className="detail-item"><span>Temperature</span><strong>{shot.temperature}°C</strong></div>
          <div className="detail-item"><span>Extraction Time</span><strong>{shot.extractionTime}s</strong></div>
          {shot.preInfusion && (
            <>
              <div className="detail-item"><span>Pre-infusion Time</span><strong>{shot.preInfusionTime}s</strong></div>
              {shot.preInfusionPressure && (
                <div className="detail-item"><span>Pre-infusion Pressure</span><strong>{shot.preInfusionPressure} bar</strong></div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h2>Bean Info</h2>
        <div className="detail-grid">
          {shot.origin && <div className="detail-item"><span>Origin</span><strong>{shot.origin}</strong></div>}
          <div className="detail-item"><span>Roast Level</span><strong>{shot.roastLevel}</strong></div>
          {shot.roastDate && <div className="detail-item"><span>Roast Date</span><strong>{shot.roastDate}</strong></div>}
          {shot.process && <div className="detail-item"><span>Process</span><strong>{shot.process}</strong></div>}
        </div>
      </div>

      {usedEquipment.length > 0 && (
        <div className="detail-section">
          <h2>Puck Preparation</h2>
          <div className="tag-list">
            {usedEquipment.map((eq) => (
              <span key={eq} className="tag">{eq}</span>
            ))}
          </div>
        </div>
      )}

      <div className="detail-section">
        <h2>Tasting Profile</h2>
        <div className="tasting-bars">
          {[
            ['Acidity', shot.acidity],
            ['Sweetness', shot.sweetness],
            ['Body', shot.body],
            ['Bitterness', shot.bitterness],
          ].map(([label, value]) => (
            <div key={label} className="tasting-bar">
              <span className="tasting-label">{label}</span>
              <div className="tasting-track">
                <div className="tasting-fill" style={{ width: `${(value / 5) * 100}%` }} />
              </div>
              <span className="tasting-value">{tastingLabels[value]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h2>Shot Quality</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <span>Channeling</span>
            <strong>{shot.channeling ? 'Yes' : 'No'}</strong>
          </div>
          <div className="detail-item">
            <span>Crema</span>
            <strong>{shot.cremaQuality}</strong>
          </div>
        </div>
      </div>

      {shot.flavorNotes && (
        <div className="detail-section">
          <h2>Flavor Notes</h2>
          <p>{shot.flavorNotes}</p>
        </div>
      )}

      {shot.notes && (
        <div className="detail-section">
          <h2>Notes</h2>
          <p>{shot.notes}</p>
        </div>
      )}
    </div>
  );
}
