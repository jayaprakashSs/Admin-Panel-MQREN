import React from "react";
// import Header from "./header";
// import SideBar from "./sidebar";
import HeaderNavBar from "../components/HeaderNavBar";


export default function LayoutPage(props) {
  return (
    <div className="layout-wrapper">
      {/* <Header /> */}
      <HeaderNavBar />
      <div className="grid-container">
        <main className="dashboardMain fullpage noScroll p-grid">
          {/* <SideBar /> */}
          <section className="sectionContent p-col h-100">{props.children}</section>
        </main>
      </div>
    </div>
  );
}
