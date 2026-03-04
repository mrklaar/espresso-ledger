import { useProfile } from '../context/ProfileContext';

export default function Settings() {
  const { profile, updateProfile, updateEquipment, updateDefaults } = useProfile();

  return (
    <div className="settings">
      <h1>Settings</h1>

      <fieldset>
        <legend>My Setup</legend>
        <div className="form-grid">
          <div className="form-group">
            <label>Espresso Machine</label>
            <input
              type="text"
              value={profile.machine}
              onChange={(e) => updateProfile({ machine: e.target.value })}
              placeholder="e.g. Breville Barista Express, Decent DE1"
            />
          </div>
          <div className="form-group">
            <label>Grinder</label>
            <input
              type="text"
              value={profile.grinder}
              onChange={(e) => updateProfile({ grinder: e.target.value })}
              placeholder="e.g. Niche Zero, Eureka Mignon"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Equipment &amp; Puck Prep Tools</legend>
        <p className="fieldset-hint">Toggle the tools you own. Enabled tools will be pre-selected when logging new shots.</p>
        <div className="equipment-toggles">
          {[
            ['wdt', 'WDT Tool', 'Weiss Distribution Technique — needle tool to break up clumps in the portafilter'],
            ['rdt', 'RDT', 'Ross Droplet Technique — spritz beans with water before grinding to reduce static'],
            ['blindShaker', 'Blind Shaker', 'Dosing cup to redistribute grounds evenly before transfer'],
            ['meshScreen', 'Mesh / Puck Screen', 'Metal mesh placed on top of the puck for even water distribution'],
            ['paperFilterTop', 'Paper Filter (Top)', 'Paper filter on top of the puck (a la Scott Rao)'],
            ['paperFilterBottom', 'Paper Filter (Bottom)', 'Paper filter at the bottom of the basket for cleaner pucks'],
            ['distributor', 'Distributor / Leveler', 'Gravity or spinning distributor to level grounds before tamping'],
          ].map(([key, label, description]) => (
            <label key={key} className="toggle-card">
              <div className="toggle-header">
                <input
                  type="checkbox"
                  checked={profile.equipment[key] || false}
                  onChange={(e) => updateEquipment(key, e.target.checked)}
                />
                <strong>{label}</strong>
              </div>
              <span className="toggle-description">{description}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Tamper Type</legend>
        <div className="form-group">
          <select
            value={profile.equipment.tamper}
            onChange={(e) => updateEquipment('tamper', e.target.value)}
          >
            <option value="standard">Standard / Manual</option>
            <option value="calibrated">Calibrated (spring-loaded)</option>
            <option value="auto">Auto-tamper (e.g. Puqpress)</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>Default Values for New Shots</legend>
        <p className="fieldset-hint">These values will be pre-filled when you log a new shot.</p>
        <div className="form-grid">
          <div className="form-group">
            <label>Default Dose (g)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={profile.defaults.dose}
              onChange={(e) => updateDefaults('dose', Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Default Target Yield (g)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={profile.defaults.targetYield}
              onChange={(e) => updateDefaults('targetYield', Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Default Temperature (°C)</label>
            <input
              type="number"
              step="0.5"
              min="80"
              max="100"
              value={profile.defaults.temperature}
              onChange={(e) => updateDefaults('temperature', Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Default Grind Setting</label>
            <input
              type="text"
              value={profile.defaults.grindSetting}
              onChange={(e) => updateDefaults('grindSetting', e.target.value)}
              placeholder="e.g. 2.5"
            />
          </div>
        </div>
      </fieldset>

      <div className="settings-footer">
        <p>All settings are saved automatically to your browser's local storage.</p>
      </div>
    </div>
  );
}
