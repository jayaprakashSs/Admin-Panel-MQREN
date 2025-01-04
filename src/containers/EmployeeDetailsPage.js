import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderNavBar from "../components/HeaderNavBar";
import "../assets/css/EmployeeDetailsPage.css";

function EmployeeDetailsPage() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", username: "", email: "", mobile: "", location: "", position: "", department: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = () => {
    if (formData.name && formData.username && formData.email && formData.mobile && formData.location && formData.position && formData.department) {
      axios.post("http://localhost:5000/api/employees", formData)
        .then((response) => setEmployees([...employees, response.data]))
        .catch((error) => console.log(error));
      setFormData({ id: "", name: "", username: "", email: "", mobile: "", location: "", position: "", department: "" });
    } else {
      alert("All fields are required!");
    }
  };

  const handleEditEmployee = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleUpdateEmployee = () => {
    axios.put(`http://localhost:5000/api/employees/${formData.id}`, formData)
      .then((response) => {
        const updatedEmployees = employees.map((employee) => (employee.id === formData.id ? response.data : employee));
        setEmployees(updatedEmployees);
        setFormData({ id: "", name: "", username: "", email: "", mobile: "", location: "", position: "", department: "" });
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => setEmployees(employees.filter((employee) => employee.id !== id)))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <HeaderNavBar />
      <div className="page-container">
        <div className="content">
          <h2>Employee Details</h2>
          <div className="form-group">
            <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleInputChange} className="form-control" />
            <input type="text" name="username" value={formData.username} placeholder="Username" onChange={handleInputChange} className="form-control" />
            <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleInputChange} className="form-control" />
            <input type="text" name="mobile" value={formData.mobile} placeholder="Mobile" onChange={handleInputChange} className="form-control" />
            <input type="text" name="location" value={formData.location} placeholder="Location" onChange={handleInputChange} className="form-control" />
            <input type="text" name="position" value={formData.position} placeholder="Position" onChange={handleInputChange} className="form-control" />
            <input type="text" name="department" value={formData.department} placeholder="Department" onChange={handleInputChange} className="form-control" />
            <button onClick={isEditing ? handleUpdateEmployee : handleAddEmployee} className="btn btn-primary">
              {isEditing ? "Update Employee" : "Add Employee"}
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Location</th>
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
                  <td>{employee.username}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.location}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button onClick={() => handleEditEmployee(employee)} className="btn btn-warning btn-sm">Edit</button>
                    <button onClick={() => handleDeleteEmployee(employee.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetailsPage;
