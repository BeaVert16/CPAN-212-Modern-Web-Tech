import { Link } from "react-router-dom";
import "./SystemListHistory.css";

const SystemListHistory = ({ systems }) => {
  return (
    <div className="system-list-container">
      <ul>
        {systems.map((system) => (
          <li key={system.client_id} className="system-item">
            <Link
              to={`/history/${system.system_name}/${system.client_id}`}
              className="system-info"
            >
              <div className="system-name">{system.system_name}</div>
              <div className="system-hostname">{system.client_id}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemListHistory;
