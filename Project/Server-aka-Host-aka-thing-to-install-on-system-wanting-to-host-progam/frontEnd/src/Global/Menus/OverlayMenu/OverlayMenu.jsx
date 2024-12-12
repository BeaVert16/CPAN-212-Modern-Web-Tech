import "./OverlayMenu.css";

const OverlayMenu = ({ title, options, onConfirm, onCancel, show }) => {
  if (!show) return null;

  return (
    <div className="add-menu-overlay">
      <div className={`add-menu ${show ? "show" : ""}`}>
        <h3>{title}</h3>
        {options.map((option, index) => (
          <label key={index}>
            {option.label}:
            <select
              value={option.value}
              onChange={(e) => option.onChange(e.target.value)}
            >
              {option.choices.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default OverlayMenu;