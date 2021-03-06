import React, { Component } from 'react';
import axios from 'axios';

const ETeam = props => (
  <tr>
    <td>{props.eTeam.username}</td>
    <td>{props.eTeam.availability?'Available':'Not Available'}</td>
    <td>{props.eTeam.contactNumber}</td>
    <td>{props.eTeam.lat}</td>
    <td>{props.eTeam.lng}</td>
    <td>
      <button className="btn btn-sm btn-danger" onClick={() => { props.deleteETeam(props.eTeam.username) }}>remove</button>
    </td>
  </tr>
)

export default class ETeamList extends Component {
  constructor(props) {
    super(props);

    this.deleteETeam = this.deleteETeam.bind(this)

    this.state = {eTeamlist: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/police/eteam/list')
      .then(response => {
        this.setState({ eTeamlist: response.data.data })
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteETeam(username) {
    axios.delete('http://localhost:5000/police/eteam/delete/', {data:{username:username,sessionToken:this.props.token}})
      .then(response => {
        console.log("username:",username)
        console.log(response.data)
      });

    this.setState({
      eTeamlist: this.state.eTeamlist.filter(el => el.username !== username)
    })
  }

  eTeamList() {
    return this.state.eTeamlist.map(currenteTeam => {
      return <ETeam eTeam={currenteTeam} deleteETeam={this.deleteETeam} key={currenteTeam.username}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Emergency Team List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Availability</th>
              <th>Contact Number</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            { this.eTeamList() }
          </tbody>
        </table>
      </div>
    )
  }
}
