import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import DBI from "../../../Icons/DashBoard";
import ComputerIcon from "../../../Icons/ComputerIcon";
import "./Sidebar.css";
import Gear from "../../../Icons/Gear";

const Bar = ({ collapsed }) => {
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  return (
    <div className="sidebar-container">
      <div className="content">
        <Sidebar collapsed={collapsed}>
          <Menu>
            <Link to="/" className="plain-link">
              <div className="logo-container">
                <img
                  className="logo"
                  src="/Images/Better-Bongo-Trans.png"
                  alt="BongoCatto"
                />
                {!collapsed && <div className="test2">Monitor Cat</div>}
              </div>
            </Link>
            <MenuItem
              component={<Link to="/" className="link" />}
              icon={<DBI />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              component={<Link to="/systems" className="link" />}
              icon={<ComputerIcon />}
            >
              Systems
            </MenuItem>
            <MenuItem
              active={isDashboardActive}
              disabled={!isDashboardActive}
              component={<Link to="/dinogame" className="link" />}
            >
              DinoGame
            </MenuItem>
            <MenuItem
              component={<Link to="/history" className="link" />}
            >
              Systems
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* <div className="bottom-content">
        <Sidebar collapsed={collapsed}>
          <Menu>
            <MenuItem
              component={<Link to="/settings" className="link" />}
              icon={<Gear />}
            >
              Admin Settings
            </MenuItem>
            <MenuItem
              component={<Link to="/settings" className="link" />}
              icon={<Gear />}
            >
              Settings
            </MenuItem>
          </Menu>
        </Sidebar>
      </div> */}
    </div>
  );
};

export default Bar;
