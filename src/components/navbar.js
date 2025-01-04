import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../library/store/sidebar";

import "../assets/css/menu.css";
import { DashboardIcon, UsersIcon, LeaveIcon, ListIcon, DetailsIcon } from "../assets/icons"; // Assuming these icons exist

export default function NavBar() {
  const drawerState = useSelector((state) => state.sidebar.value);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      {/* Logo or Brand Name */}
      <div className="navbar-brand">
        <h1>MyApp</h1>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className="navbar-link"
            activeClassName="active"
            onClick={() => drawerState && dispatch(closeSideBar())} // Close sidebar if it's open
          >
            {item.iconType === "component" && item.icon}
            <span className="navbar-text">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

const menus = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: <DashboardIcon />,
    iconType: "component",
  },
  {
    name: "Employee Details",
    route: "/employee-details",
    icon: <UsersIcon />,
    iconType: "component",
  },
  {
    name: "Leave Management",
    route: "/leave-management",
    icon: <LeaveIcon />,
    iconType: "component",
  },
  {
    name: "View Employee List",
    route: "/employee-list",
    icon: <ListIcon />,
    iconType: "component",
  },
  {
    name: "View Employee Details",
    route: "/employee-details/:id",
    icon: <DetailsIcon />,
    iconType: "component",
  },
];
