import React, { Component } from 'react';
import axios from 'axios';
import './register.css';
import SideMenu from '../sideMenu/SideMenu';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: ['admin', 'manager', 'coordinator', 'student', 'guest'],
      faculties: [],
      isEditing: false,
      editingUserId: '',
      formData: {
        username: '',
        email: '',
        password: '', // Keep password here for editing purposes
        role: '',
        faculty: ''
      }
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchFaculties();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllUsers`);
      this.setState({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchFaculties = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllFaculties`);
      this.setState({ faculties: response.data });
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  handleAdd = async () => {
    try {
      const { formData } = this.state;
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/addUser`, formData);
      this.fetchUsers();
      this.clearFormData();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  handleEdit = async () => {
    try {
      const { formData, editingUserId } = this.state;
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/updateUser/${editingUserId}`, formData);
      this.fetchUsers();
      this.clearFormData();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  handleDelete = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteUser/${userId}`);
      this.fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleEditUser = (user) => {
    // You should handle decryption securely on the server side.
    // For demonstration, we assume you have decrypted password available.
    const decryptedPassword = user.password; // Replace with actual decryption logic if available

    this.setState({
      isEditing: true,
      editingUserId: user._id,
      formData: {
        username: user.username,
        email: user.email,
        password: decryptedPassword, // Display decrypted password
        role: user.role,
        faculty: user.faculty
      }
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditing: false,
      editingUserId: '',
      formData: {
        username: '',
        email: '',
        password: '',
        role: '',
        faculty: ''
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isEditing } = this.state;
    if (isEditing) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  };

  clearFormData = () => {
    this.setState({
      formData: {
        username: '',
        email: '',
        password: '',
        role: '',
        faculty: ''
      }
    });
  };

  handleCancelAdd = () => {
    this.setState({
      isAdding: false,
      formData: {
        username: '',
        email: '',
        password: '',
        role: '',
        faculty: ''
      }
    });
  };

  render() {
    const { users, formData, isEditing, isAdding, roles, faculties } = this.state;

    if (isAdding || isEditing) {
      return (
        <div className="user-table-container">
          <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <input
              type="text" // Change type to text to display decrypted password
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <select
              name="role"
              value={formData.role}
              onChange={this.handleInputChange}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <select
              name="faculty"
              value={formData.faculty}
              onChange={this.handleInputChange}
            >
              <option value="">Select Faculty</option>
              {faculties.map(faculty => (
                <option key={faculty._id} value={faculty.name}>{faculty.name}</option>
              ))}
            </select>
            <button type="submit">{isEditing ? 'Edit' : 'Add'}</button>
            <button type="button" onClick={isEditing ? this.handleCancelEdit : this.handleCancelAdd}>Cancel</button>
          </form>
        </div>
      );
    }

    return (
      <div className="user-table-container">
        <SideMenu />
        <h2>User Management</h2>
        <button onClick={() => this.setState({ isAdding: true })}>Add</button>
        <table className="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th> {/* Add password header */}
              <th>Role</th>
              <th>Faculty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td> {/* Display decrypted password */}
                <td>{user.role}</td>
                <td>{user.faculty}</td>
                <td>
                  <button onClick={() => this.handleEditUser(user)}>Edit</button>
                  <button onClick={() => this.handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }  
}  

export default Register;
