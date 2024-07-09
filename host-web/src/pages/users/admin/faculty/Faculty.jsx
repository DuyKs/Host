import React, { Component } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

import './faculty.css';
import SideMenu from '../sideMenu/SideMenu';

class Faculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculties: [],
      formData: {
        name: '',
      }
    };
  }

  componentDidMount() {
    this.fetchFaculties();
  }

  fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllFaculties');
      this.setState({ faculties: response.data });
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  handleAddFaculty = async () => {
    try {
      const { formData } = this.state;
      await axios.post('http://localhost:5000/addFaculty', formData);
      this.fetchFaculties();
      this.clearFormData();
    } catch (error) {
      console.error('Error adding faculty:', error);
    }
  };

  handleDeleteFaculty = async (facultyId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteFaculty/${facultyId}`);
      this.fetchFaculties();
    } catch (error) {
      console.error('Error deleting faculty:', error);
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

  handleSubmitFaculty = async (e) => {
    e.preventDefault();
    try {
      await this.handleAddFaculty();
    } catch (error) {
      console.error('Error handling faculty submission:', error);
    }
  };

  clearFormData = () => {
    this.setState({
      formData: {
        name: '',
      }
    });
  };

  render() {
    const { faculties, formData } = this.state;

    return (
      <div className="faculty-management-container">
        <SideMenu />
        <h2>Faculty Management</h2>
        <div className="faculty-form-container">
          <h3>Add Faculty</h3>
          <form onSubmit={this.handleSubmitFaculty}>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Faculty Name"
              onChange={this.handleInputChange}
            />
            <button type="submit">Add Faculty</button>
          </form>
        </div>
        <table className="faculty-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map(faculty => (
              <tr key={faculty._id}>
                <td>{faculty.name}</td>
                <td>
                  <button onClick={() => this.handleDeleteFaculty(faculty._id)} style={{ backgroundColor: '#006eff00', color: 'red' }}><FaTrash /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Faculty;
