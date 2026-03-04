import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useShots } from '../context/ShotContext';
import { useProfile } from '../context/ProfileContext';
import { createEmptyShot, roastLevels, processes, cremaQualities } from '../utils/defaults';
import RatingStars from '../components/RatingStars';
import SliderInput from '../components/SliderInput';

export default function NewShot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shots, addShot, updateShot } = useShots();
  const { profile } = useProfile();

  const existingShot = id ? shots.find((s) => s.id === id) : null;
  const [form, setForm] = useState(() => existingShot || createEmptyShot(profile));

  const isEditing = !!existingShot;

  function copyLastShot() {
    const last = [...shots].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    if (!last) return;
    setForm({
      ...last,
      id: '',
      date: new Date().toISOString().slice(0, 16),
    });
  }

  function step(field, delta, min = -Infinity, max = Infinity) {
    setForm((prev) => {
      const next = { ...prev };
      const val = Math.min(max, Math.max(min, Number(prev[field]) + delta));
      next[field] = Math.round(val * 10) / 10;
      if (field === 'dose' || field === 'yield') {
        const dose = field === 'dose' ? next.dose : Number(prev.dose);
        const yieldVal = field === 'yield' ? next.yield : Number(prev.yield);
        next.brewRatio = dose > 0 ? `1:${(yieldVal / dose).toFixed(1)}` : '';
      }
      return next;
    });
  }

  function set(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'dose' || field === 'yield') {
        const dose = field === 'dose' ? Number(value) : Number(prev.dose);
        const yieldVal = field === 'yield' ? Number(value) : Number(prev.yield);
        next.brewRatio = dose > 0 ? `1:${(yieldVal / dose).toFixed(1)}` : '';
      }
      return next;
    });
  }

  function setEquipment(key, value) {
    setForm((prev) => ({
      ...prev,
      equipmentUsed: { ...prev.equipmentUsed, [key]: value },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      updateShot(id, form);
    } else {
      addShot({ ...form, id: uuidv4() });
    }
    navigate(isEditing ? `/shot/${id}` : '/history');
  }

  const brewRatio = form.dose > 0 ? `1:${(form.yield / form.dose).toFixed(1)}` : '—';

  return (
    <div className="new-shot">
      <div className="new-shot-header">
        <h1>{isEditing ? 'Edit Shot' : 'Log New Shot'}</h1>
        {!isEditing && shots.length > 0 && (
          <button type="button" className="btn" onClick={copyLastShot}>
            Copy Last Shot
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="shot-form">

        {/* Bean Info */}
        <fieldset>
          <legend>Bean Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Bean Name</label>
              <input type="text" value={form.beanName} onChange={(e) => set('beanName', e.target.value)} placeholder="e.g. Ethiopia Yirgacheffe" />
            </div>
            <div className="form-group">
              <label>Roaster</label>
              <input type="text" value={form.roaster} onChange={(e) => set('roaster', e.target.value)} placeholder="e.g. Onyx Coffee Lab" />
            </div>
            <div className="form-group">
              <label>Origin</label>
              <input type="text" value={form.origin} onChange={(e) => set('origin', e.target.value)} placeholder="e.g. Ethiopia" />
            </div>
            <div className="form-group">
              <label>Roast Level</label>
              <select value={form.roastLevel} onChange={(e) => set('roastLevel', e.target.value)}>
                {roastLevels.map((r) => (
                  <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Roast Date</label>
              <input type="date" value={form.roastDate} onChange={(e) => set('roastDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Process</label>
              <select value={form.process} onChange={(e) => set('process', e.target.value)}>
                <option value="">Select...</option>
                {processes.map((p) => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Brewing Parameters */}
        <fieldset>
          <legend>Brewing Parameters</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Dose (g)</label>
              <div className="step-input">
                <button type="button" className="step-btn" onClick={() => step('dose', -0.5, 0)}>−</button>
                <input type="number" step="0.5" min="0" value={form.dose} onChange={(e) => set('dose', e.target.value)} />
                <button type="button" className="step-btn" onClick={() => step('dose', 0.5, 0)}>+</button>
              </div>
            </div>
            <div className="form-group">
              <label>Yield (g)</label>
              <div className="step-input">
                <button type="button" className="step-btn" onClick={() => step('yield', -0.5, 0)}>−</button>
                <input type="number" step="0.5" min="0" value={form.yield} onChange={(e) => set('yield', e.target.value)} />
                <button type="button" className="step-btn" onClick={() => step('yield', 0.5, 0)}>+</button>
              </div>
            </div>
            <div className="form-group">
              <label>Brew Ratio</label>
              <input type="text" value={brewRatio} readOnly className="input-readonly" />
            </div>
            <div className="form-group">
              <label>Grind Setting</label>
              <input type="text" value={form.grindSetting} onChange={(e) => set('grindSetting', e.target.value)} placeholder="e.g. 2.5 or 15 clicks" />
            </div>
            <div className="form-group">
              <label>Temperature (°C)</label>
              <div className="step-input">
                <button type="button" className="step-btn" onClick={() => step('temperature', -1, 80, 100)}>−</button>
                <input type="number" step="1" min="80" max="100" value={form.temperature} onChange={(e) => set('temperature', e.target.value)} />
                <button type="button" className="step-btn" onClick={() => step('temperature', 1, 80, 100)}>+</button>
              </div>
            </div>
            <div className="form-group">
              <label>Extraction Time (s)</label>
              <div className="step-input">
                <button type="button" className="step-btn" onClick={() => step('extractionTime', -1, 0)}>−</button>
                <input type="number" step="1" min="0" value={form.extractionTime} onChange={(e) => set('extractionTime', e.target.value)} />
                <button type="button" className="step-btn" onClick={() => step('extractionTime', 1, 0)}>+</button>
              </div>
            </div>
          </div>
          <div className="form-group form-group-inline">
            <label className="checkbox-label">
              <input type="checkbox" checked={form.preInfusion} onChange={(e) => set('preInfusion', e.target.checked)} />
              Pre-infusion
            </label>
          </div>
          {form.preInfusion && (
            <div className="form-grid">
              <div className="form-group">
                <label>Pre-infusion Time (s)</label>
                <input type="number" step="1" min="0" value={form.preInfusionTime} onChange={(e) => set('preInfusionTime', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Pre-infusion Pressure (bar)</label>
                <input type="text" value={form.preInfusionPressure} onChange={(e) => set('preInfusionPressure', e.target.value)} placeholder="e.g. 2" />
              </div>
            </div>
          )}
        </fieldset>

        {/* Puck Prep */}
        <fieldset>
          <legend>Puck Preparation</legend>
          <div className="equipment-toggles">
            {[
              ['wdt', 'WDT (Weiss Distribution)'],
              ['rdt', 'RDT (Ross Droplet)'],
              ['blindShaker', 'Blind Shaker'],
              ['meshScreen', 'Mesh/Puck Screen'],
              ['paperFilterTop', 'Paper Filter (Top)'],
              ['paperFilterBottom', 'Paper Filter (Bottom)'],
              ['distributor', 'Distributor/Leveler'],
            ].map(([key, label]) => (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.equipmentUsed[key] || false}
                  onChange={(e) => setEquipment(key, e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Tasting Notes */}
        <fieldset>
          <legend>Tasting Notes</legend>
          <div className="form-grid">
            <SliderInput label="Acidity" value={form.acidity} onChange={(v) => set('acidity', v)} />
            <SliderInput label="Sweetness" value={form.sweetness} onChange={(v) => set('sweetness', v)} />
            <SliderInput label="Body" value={form.body} onChange={(v) => set('body', v)} />
            <SliderInput label="Bitterness" value={form.bitterness} onChange={(v) => set('bitterness', v)} />
          </div>
          <div className="form-group">
            <label>Flavor Notes</label>
            <input type="text" value={form.flavorNotes} onChange={(e) => set('flavorNotes', e.target.value)} placeholder="e.g. blueberry, chocolate, citrus" />
          </div>
        </fieldset>

        {/* Quality */}
        <fieldset>
          <legend>Shot Quality</legend>
          <div className="form-grid">
            <div className="form-group form-group-inline">
              <label className="checkbox-label">
                <input type="checkbox" checked={form.channeling} onChange={(e) => set('channeling', e.target.checked)} />
                Channeling Observed
              </label>
            </div>
            <div className="form-group">
              <label>Crema Quality</label>
              <select value={form.cremaQuality} onChange={(e) => set('cremaQuality', e.target.value)}>
                {cremaQualities.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Overall Rating</label>
            <RatingStars value={form.rating} onChange={(v) => set('rating', v)} />
          </div>
        </fieldset>

        {/* Notes */}
        <fieldset>
          <legend>Additional Notes</legend>
          <div className="form-group">
            <textarea rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Any additional observations..." />
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save Changes' : 'Log Shot'}
          </button>
        </div>
      </form>
    </div>
  );
}
