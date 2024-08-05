import React, { Component } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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
        password: '',
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
      const response = await axios.get('http://localhost:5000/getAllUsers');
      this.setState({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllFaculties');
      this.setState({ faculties: response.data });
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  handleAdd = async () => {
    try {
      const { formData } = this.state;
      await axios.post('http://localhost:5000/addUser', formData);
      this.fetchUsers();
      this.clearFormData();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  handleEdit = async () => {
    try {
      const { formData, editingUserId } = this.state;
      await axios.put(`http://localhost:5000/updateUser/${editingUserId}`, formData);
      this.fetchUsers();
      this.clearFormData();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${userId}`);
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
    this.setState({
      isEditing: true,
      editingUserId: user._id,
      formData: {
        username: user.username,
        email: user.email,
        password: user.password,
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
  
    // Group users by role
    const groupedUsers = {};
    roles.forEach(role => {
      groupedUsers[role] = users.filter(user => user.role === role);
    });
  
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
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={this.handleInputChange}
            />
            <input
              type="password" // Change type to password
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
            {!['manager', 'admin'].includes(formData.role) && (
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
              )}
              <button type="submit" style={{ color: 'white', marginTop: '10px', marginBottom: '10px' }}>{isEditing ? 'Update' : 'Add'}</button>
              <button type="button" onClick={isEditing ? this.handleCancelEdit : this.handleCancelAdd} style={{ color: 'white', marginTop: '10px', marginBottom: '10px' }}>Cancel</button>
          </form>
        </div>
      );
    }
  
    return (
      <div className="user-table-container">
        <SideMenu />
        <h2>User Management</h2>
        <button onClick={() => this.setState({ isAdding: true })} style={{ backgroundColor: '#0000FF', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          <FaPlus /> {/* Add icon */}
        </button>
        {Object.keys(groupedUsers).map(role => (
          <React.Fragment key={role}>
            <h3>{role}</h3>
            <table className="user-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Faculty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupedUsers[role].map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.faculty}</td>
                    <td>
                      <button onClick={() => this.handleEditUser(user)} style={{ color:'blue'}}> 
                        <FaEdit />
                      </button>                  
                      <button onClick={() => this.handleDelete(user._id)} style={{ color: 'red' }}>
                        <FaTrash />
                      </button>                
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    );
  }  
}  

export default Register;
