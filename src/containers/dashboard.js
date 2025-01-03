import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "../assets/css/dashboard.css";

export default function DashboardPage() {
  const employees = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Charlie Davis" },
    { id: 6, name: "David Wilson" },
    { id: 7, name: "Emily Taylor" },
    { id: 8, name: "Frank Harris" },
    { id: 9, name: "Grace Lee" },
    { id: 10, name: "Helen Clark" },
    // Add more employees as needed
  ]; // Example employee list with names

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Employee Management Dashboard</h1>
        <Button
          label="Log Out"
          className="p-button-danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        />
      </header>

      <section className="dashboard-content">
        <h2>Overview</h2>
        <div className="dashboard-cards">
          <Card title="Total Employees" className="dashboard-card">
            <p>200</p>
          </Card>
          <Card title="Present Today" className="dashboard-card">
            <p>180</p>
          </Card>
          <Card title="Absent Today" className="dashboard-card">
            <p>20</p>
          </Card>
        </div>

        <h2>Employee List</h2>
        <div className="dashboard-list">
          {employees.map((employee) => (
            <p key={employee.id}>{employee.name}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
