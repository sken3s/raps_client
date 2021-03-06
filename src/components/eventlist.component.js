import React, { Component } from 'react';
import axios from 'axios';

const Event = props => (
  <tr>
    <td>
        {props.event.datetime.match(/\d+-\d+-\d+/)}
        <br/>
        {props.event.datetime.match(/\d\d:\d\d/)}
    </td>
    <td>{props.event.type}</td>
    <td>{props.event.drivingSide}</td>
    <td>{props.event.severity}</td>
    <td>{props.event.kmPost}</td>
    <td>{props.event.suburb}</td>
    <td>{props.event.status}</td>
    <td>
      <button className="btn btn-sm btn-danger" onClick={() => { props.deleteEvent(props.event.id) }}>Delete</button>
    </td>
  </tr>
)

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this)

    this.state = {eventlist: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/event/list')
      .then(response => {
        this.setState({ eventlist: response.data.data })
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEvent(id) {
    axios.delete('http://localhost:5000/event/delete/', {data:{id:id,sessionToken:this.props.token}})
      .then(response => {
        console.log("id:",id)
        console.log(response.data)
      });

    this.setState({
      eventlist: this.state.eventlist.filter(el => el.id !== id)
    })
  }

  eventList() {
    return this.state.eventlist.map(currentevent => {
      return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent.id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Event List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date/Time</th>
              <th>Type</th>
              <th>Driving Side</th>
              <th>Severity</th>
              <th>KM Post</th>
              <th>Suburb</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.eventList() }
          </tbody>
        </table>
      </div>
    )
  }
}
