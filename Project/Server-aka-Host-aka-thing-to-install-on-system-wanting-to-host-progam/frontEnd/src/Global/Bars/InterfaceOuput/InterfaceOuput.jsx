import { useState } from "react";
import { Outlet } from "react-router-dom";
import Bar from "../sidebar/Sidebar";
import TopBar from "../Topbar/TopBar";
import Footer from "../Footer/Footer";
import "./InterfaceOutput.css";

const InterfaceOutput = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="interface-container">
      <Bar collapsed={sidebarCollapsed} />
      <div
        className={`content-container ${sidebarCollapsed ? "collapsed" : ""}`}
      >
        <TopBar setSidebarCollapsed={setSidebarCollapsed} />
        <div className="main-content">
          <Outlet />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default InterfaceOutput;
