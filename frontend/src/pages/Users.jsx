import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Shared by both add and edit; editingId is null while adding
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editingId, setEditingId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  async function fetchUsers(searchTerm = "") {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/users", {
        params: searchTerm ? { search: searchTerm } : {},
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchUsers(search);
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, { name: form.name, email: form.email });
      } else {
        await api.post("/users", form);
      }

      setForm({ name: "", email: "", password: "" });
      setEditingId(null);
      fetchUsers(search);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save user.");
    }
  }

  function handleEditClick(user) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, password: "" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm({ name: "", email: "", password: "" });
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setError("");
    try {
      await api.delete(`/users/${id}`);
      fetchUsers(search);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user.");
    }
  }

  return (
    <div>
      <Navbar userName={currentUser?.name} />

      <div className="wide-container">
        <h1>Users</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSearch} className="top-bar">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <h2>{editingId ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleFormChange} required />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleFormChange}
              required
            />
          </div>

          {!editingId && (
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleFormChange}
                required
              />
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">{editingId ? "Update User" : "Add User"}</button>
            {editingId && (
              <button type="button" className="secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2>All Users</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                    <button className="danger" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;
