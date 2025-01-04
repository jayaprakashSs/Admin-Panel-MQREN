import React, { useState } from "react";
import HeaderNavBar from "../components/HeaderNavBar";
import "../assets/css/LeaveManagementPage.css";

function LeaveManagementPage() {
  const [leaves, setLeaves] = useState([
    { id: 1, name: "John Doe", leaveType: "Sick", fromDate: "2025-01-01", toDate: "2025-01-03", status: "Approved" },
    { id: 2, name: "Jane Smith", leaveType: "Vacation", fromDate: "2025-02-15", toDate: "2025-02-18", status: "Pending" },
    { id: 3, name: "Sam Brown", leaveType: "Personal", fromDate: "2025-03-10", toDate: "2025-03-12", status: "Denied" },
  ]);

  const [formData, setFormData] = useState({ name: "", leaveType: "", fromDate: "", toDate: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddLeave = () => {
    if (formData.name && formData.leaveType && formData.fromDate && formData.toDate) {
      setLeaves([...leaves, { ...formData, id: Date.now(), status: "Pending" }]);
      setFormData({ name: "", leaveType: "", fromDate: "", toDate: "" });
    } else {
      alert("All fields are required!");
    }
  };

  const handleEditLeave = (leave) => {
    setFormData(leave);
    setIsEditing(true);
  };

  const handleUpdateLeave = () => {
    setLeaves(
      leaves.map((leave) => (leave.id === formData.id ? formData : leave))
    );
    setFormData({ name: "", leaveType: "", fromDate: "", toDate: "" });
    setIsEditing(false);
  };

  const handleDeleteLeave = (id) => {
    setLeaves(leaves.filter((leave) => leave.id !== id));
  };

  return (
    <div>
            <HeaderNavBar />

    <div className="leave-management-container">
      <div className="content">
        <h2>Leave Management</h2>

        {/* Leave Form */}
        <div className="form-container">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Employee Name"
              onChange={handleInputChange}
              className="form-control"
            />
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select Leave Type</option>
              <option value="Sick">Sick</option>
              <option value="Vacation">Vacation</option>
              <option value="Personal">Personal</option>
            </select>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              className="form-control"
            />
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              className="form-control"
            />
            <button
              onClick={isEditing ? handleUpdateLeave : handleAddLeave}
              className="btn btn-primary"
            >
              {isEditing ? "Update Leave" : "Add Leave"}
            </button>
          </div>
        </div>

        {/* Leave Table */}
        <div className="table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.id}</td>
                  <td>{leave.name}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.fromDate}</td>
                  <td>{leave.toDate}</td>
                  <td>{leave.status}</td>
                  <td>
                    <button
                      onClick={() => handleEditLeave(leave)}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLeave(leave.id)}
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
      </div>
    </div>
    </div>

  );
}

export default LeaveManagementPage;
