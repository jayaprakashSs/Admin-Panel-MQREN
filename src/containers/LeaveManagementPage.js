import React, { useState } from "react";
import "../assets/css/LeaveManagementPage.css";

function LeaveManagementPage() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: "John Doe", leaveType: "Sick Leave", status: "Pending" },
    { id: 2, employee: "Jane Smith", leaveType: "Vacation", status: "Approved" },
    { id: 3, employee: "Sam Brown", leaveType: "Personal", status: "Rejected" },
    { id: 4, employee: "Alice Green", leaveType: "Sick Leave", status: "Pending" },
    { id: 5, employee: "Bob White", leaveType: "Vacation", status: "Pending" },
  ]);
  const [filteredRequests, setFilteredRequests] = useState(leaveRequests);
  const [searchQuery, setSearchQuery] = useState("");

  const handleApproveLeave = (id) => {
    setLeaveRequests(
      leaveRequests.map((request) =>
        request.id === id ? { ...request, status: "Approved" } : request
      )
    );
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests(
      leaveRequests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = leaveRequests.filter((request) =>
      request.employee.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  return (
    <div className="leave-management-container">
      <h2>Leave Management</h2>
      
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Employee Name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.employee}</td>
              <td>{request.leaveType}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApproveLeave(request.id)}
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectLeave(request.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="pagination-container">
        {/* Basic Pagination (can be expanded further) */}
        <button className="btn btn-primary">Prev</button>
        <button className="btn btn-primary">Next</button>
      </div>
    </div>
  );
}

export default LeaveManagementPage;
