import React from "react";
import { Card } from "primereact/card";
import "../assets/css/dashboard.css";

export default function DashboardPage() {
  // List of employees with their present/absent status
  const employees = [
    { id: 1, name: "John Doe", status: "Present" },
    { id: 2, name: "Jane Smith", status: "Absent" },
    { id: 3, name: "Alice Johnson", status: "Present" },
    { id: 4, name: "Bob Brown", status: "Absent" },
    { id: 5, name: "Charlie Davis", status: "Present" },
    { id: 6, name: "David Wilson", status: "Absent" },
    { id: 7, name: "Emily Taylor", status: "Present" },
    { id: 8, name: "Frank Harris", status: "Absent" },
    { id: 9, name: "Grace Lee", status: "Present" },
    { id: 10, name: "Helen Clark", status: "Absent" },
    // Add more employees as needed
  ];

  // Count Present and Absent employees
  const presentCount = employees.filter((employee) => employee.status === "Present").length;
  const absentCount = employees.filter((employee) => employee.status === "Absent").length;

  return (
    <div className="dashboard-container">
      <section className="dashboard-content">
        <h2>Overview</h2>
        <div className="dashboard-cards">
          <Card title="Total Employees" className="dashboard-card">
            <p>{employees.length}</p>
          </Card>
          <Card title="Present Today" className="dashboard-card">
            <p>{presentCount}</p>
          </Card>
          <Card title="Absent Today" className="dashboard-card">
            <p>{absentCount}</p>
          </Card>
        </div>

        <h2>Employee List</h2>
        <div className="dashboard-list">
          {employees.map((employee) => (
            <p key={employee.id}>
              {employee.name} - <strong>{employee.status}</strong>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
