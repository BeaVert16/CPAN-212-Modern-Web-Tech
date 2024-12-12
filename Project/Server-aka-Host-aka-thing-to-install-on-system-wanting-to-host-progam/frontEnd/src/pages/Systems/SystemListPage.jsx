import { useState, useEffect } from "react";
import SystemsList from "../../components/SystemsList/SystemsList";
import LoadingCat from "../../Global/LoadingCat/LoadingCat";
import { ipadd } from "../../url";
import "./SystemListPage.css";

const SystemListPage = () => {
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSystems();
  }, []);

  const fetchSystems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${ipadd}/api/systems/list`);
      if (!response.ok) throw new Error("Failed to fetch systems");
      const data = await response.json();
      setSystems(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingCat />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="system-list-container">
      <h1>Connected Systems</h1>
      <SystemsList systems={systems} />
    </div>
  );
};

export default SystemListPage;
