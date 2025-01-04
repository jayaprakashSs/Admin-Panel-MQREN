import React, { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSideBar, closeSideBar } from "../library/store/sidebar";

// import "../assets/css/header.css";
import "../assets/css/menu.css";

import Logo from "../assets/images/logo.png";
import Avatar from "../assets/images/avatar.jpg";

import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";
import { OverlayPanel } from "primereact/overlaypanel";

import {
  DashboardIcon,
  UsersIcon,
  LeaveIcon,
  ListIcon,
} from "../assets/icons";

export default function HeaderNavBar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const drawerState = useSelector((state) => state.sidebar.value);

  const userMenu = [
    {
      label: "Hi, Admin",
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            history.push("/dashboard");
          },
        },
        {
          label: "Profile",
          icon: "pi pi-user",
          command: () => {
            history.push("/user-profile");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-power-off",
          command: () => {
            localStorage.clear();
            history.push("/login");
          },
        },
      ],
    },
  ];

  const togglePanel = (e, ref) => {
    e.preventDefault();
    e.stopPropagation();

    document.querySelector(".emptyBoxForMenuClick")?.click();

    ref.current.toggle(e);
  };

  const notifications = [1, 2];

  const menus = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: React.createElement(DashboardIcon),
      iconType: "component",
    },
    {
      name: "Employee Details",
      route: "/employee-details",
      icon: React.createElement(UsersIcon),
      iconType: "component",
    },
    {
      name: "Leave Management",
      route: "/leave-management",
      icon: React.createElement(LeaveIcon),
      iconType: "component",
    },
    {
      name: "View Employee List",
      route: "/employee-list",
      icon: React.createElement(ListIcon),
      iconType: "component",
    },
  
  ];

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "header-box d-flex p-ai-center" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          {
            className: "p-d-inline-block p-d-lg-none btn btn-link p-0 mr-3",
            "aria-label": "open sidebar",
            onClick: () => {
              dispatch(openSideBar());
            },
          },
          React.createElement("i", { className: "pi pi-bars" })
        ),
        React.createElement("img", {
          src: Logo,
          alt: "Logo",
          className: "img img-fluid logo",
        })
      ),
      React.createElement(
        "div",
        { className: "ml-auto menu-items mr-0" },
        React.createElement(
          "ul",
          { className: "nav-list d-flex p-ai-center flex-row-reverse" },
          React.createElement(
            "li",
            null,
            React.createElement("img", {
              src: Avatar,
              alt: "user",
              id: "avatar",
              className: "avatar",
              onClick: (e) => togglePanel(e, userMenuRef),
            })
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "i",
              {
                className: "pi pi-bell p-overlay-badge",
                onClick: (e) => togglePanel(e, notificationRef),
              },
              React.createElement(Badge, { value: notifications.length })
            )
          )
        )
      )
    ),
    React.createElement(
      "nav",
      { className: "navbar" },
      React.createElement(
        "div",
        { className: "navbar-brand" },
        React.createElement("h1", null, "REAL TECH SYSTEM 'ADMIN")
      ),
      React.createElement(
        "div",
        { className: "navbar-links" },
        menus.map((item, index) =>
          React.createElement(
            NavLink,
            {
              key: index,
              to: item.route,
              className: "navbar-link",
              activeClassName: "active",
              onClick: () => drawerState && dispatch(closeSideBar()),
            },
            item.iconType === "component" ? item.icon : null,
            React.createElement("span", { className: "navbar-text" }, item.name)
          )
        )
      )
    ),
    React.createElement(Menu, {
      model: userMenu,
      popup: true,
      ref: userMenuRef,
      id: "user_pop_menu",
    }),
    React.createElement(
      OverlayPanel,
      { ref: notificationRef, style: { width: "450px" } },
      React.createElement(
        "div",
        { className: "popup-notification" },
        React.createElement(
          "p",
          { className: "title mb-1" },
          React.createElement("b", null, "Notifications")
        ),
        React.createElement(
          "p",
          { className: "sub-title font-light" },
          notifications.length > 0
            ? `You have ${notifications.length} unread messages`
            : "No notifications"
        ),
        React.createElement("hr", { className: "mb-0" }),
        notifications.map((item, index) =>
          React.createElement(
            "div",
            { key: index, className: "d-flex message-container" },
            React.createElement(
              "div",
              { className: "col-3 p-0" },
              React.createElement("img", {
                src: Logo,
                alt: "Logo",
                className: "img img-fluid",
              })
            ),
            React.createElement(
              "div",
              { className: "col-9 message-box" },
              React.createElement(
                "p",
                { className: "message" },
                "Hi John, your leave from Jan 10 to Jan 15 has been approved"
              ),
              React.createElement(
                "p",
                { className: "time d-flex p-ai-center mt-3" },
                React.createElement("i", { className: "pi pi-clock mr-2" }),
                "4 Hours ago"
              )
            )
          )
        )
      )
    ),
    React.createElement("div", { className: "emptyBoxForMenuClick" })
  );
}
