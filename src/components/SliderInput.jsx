export default function SliderInput({ label, value, onChange, min = 1, max = 5 }) {
  const labels = { 1: 'Low', 2: 'Med-Low', 3: 'Medium', 4: 'Med-High', 5: 'High' };
  return (
    <div className="slider-input">
      <label>
        {label}: <strong>{labels[value] || value}</strong>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
