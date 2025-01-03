import React, { useState } from "react";
import "../assets/css/EmployeeDetailsPage.css";


function EmployeeDetailsPage() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", position: "Software Engineer", department: "IT" },
    { id: 2, name: "Jane Smith", position: "Product Manager", department: "Marketing" },
    { id: 3, name: "Sam Brown", position: "Designer", department: "Design" },
  ]);

  const [formData, setFormData] = useState({ id: "", name: "", position: "", department: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = () => {
    if (formData.name && formData.position && formData.department) {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
      setFormData({ id: "", name: "", position: "", department: "" });
    } else {
      alert("All fields are required!");
    }
  };

  const handleEditEmployee = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleUpdateEmployee = () => {
    setEmployees(
      employees.map((employee) =>
        employee.id === formData.id ? formData : employee
      )
    );
    setFormData({ id: "", name: "", position: "", department: "" });
    setIsEditing(false);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
        <div className="content">
          <h2>Employee Details</h2>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleInputChange}
              className="form-control"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              placeholder="Position"
              onChange={handleInputChange}
              className="form-control"
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              placeholder="Department"
              onChange={handleInputChange}
              className="form-control"
            />
            <button
              onClick={isEditing ? handleUpdateEmployee : handleAddEmployee}
              className="btn btn-primary"
            >
              {isEditing ? "Update Employee" : "Add Employee"}
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button
                      onClick={() => handleEditEmployee(employee)}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}

export default EmployeeDetailsPage;
