import { Link } from "react-router-dom";
import "./SystemsList.css";

const SystemsList = ({ systems }) => {
  return (
    <div className="system-list-container">
      <ul>
        {systems.map((system) => (
          <li key={system.client_id} className="system-item">
            <Link
              to={`/systems/${system.system_name}/${system.client_id}`}
              className="system-info"
            >
              <div className="system-name">{system.system_name}</div>
              <div className="system-hostname">{system.client_id}</div>
            </Link>
            <div className="system-right">
              <div className="system-ip">
                {system.network?.ip_address || "IP not available"}
              </div>
              <div
                className={`status-light ${
                  system.is_online ? "online" : "offline"
                }`}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemsList;
