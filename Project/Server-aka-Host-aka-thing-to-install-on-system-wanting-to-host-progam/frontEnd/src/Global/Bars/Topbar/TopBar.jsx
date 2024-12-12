import "./TopBar.css"; 
import Hamburger from "../Hamburger"

const Topbar = ({ setSidebarCollapsed }) => {
  return (
    <div className="topbar">
      
      <button
        className="sb-button"
        onClick={() => setSidebarCollapsed((prev) => !prev)}
      >
        <Hamburger/>
      </button>
    </div>
  );
};

export default Topbar;
