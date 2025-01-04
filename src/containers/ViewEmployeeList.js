import React, { useState } from "react";
import HeaderNavBar from "../components/HeaderNavBar";
import "../assets/css/ViewEmployeeList.css";

function ViewEmployeeList() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", position: "Software Engineer", department: "IT", status: "Active" },
    { id: 2, name: "Jane Smith", position: "Product Manager", department: "Product", status: "Inactive" },
    { id: 3, name: "Sam Brown", position: "UX Designer", department: "Design", status: "Active" },
    { id: 4, name: "Emily Johnson", position: "HR Manager", department: "HR", status: "Active" },
    { id: 5, name: "Michael Clark", position: "Marketing Executive", department: "Marketing", status: "Inactive" },
    { id: 6, name: "Laura Wilson", position: "Software Developer", department: "IT", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleSearch = (e) => setSearch(e.target.value);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDepartmentChange = (e) => setDepartmentFilter(e.target.value);

  const toggleStatus = (id) => {
    setEmployees(employees.map(employee =>
      employee.id === id ? { ...employee, status: employee.status === "Active" ? "Inactive" : "Active" } : employee
    ));
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) &&
    (departmentFilter === "" || employee.department === departmentFilter)
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>      <HeaderNavBar />
    <div className="view-employee-list">
      <div className="container">
        <h2 className="title">Employee List</h2>

        {/* Search and Filter Controls */}
        <div className="filters-container">
          <input
            type="text"
            placeholder="Search by employee name"
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
          <select
            className="department-filter"
            value={departmentFilter}
            onChange={handleDepartmentChange}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Employee Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.status}</td>
                  <td>
                    <button
                      className="toggle-status-btn"
                      onClick={() => toggleStatus(employee.id)}
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-container">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Last
          </button>
        </div>
      </div>
    </div>
    </div>

  );
}

export default ViewEmployeeList;
