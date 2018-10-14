import React, {Component} from 'react'
import Moment from "moment";
import {Calender, Day} from "../models/calendar";
import Reminder from "../models/reminder";
import Faker from 'faker';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


// day as props
class DayBlock extends Component {

  state = {};


  getReminders = () => {

    const {day} = this.props;
    const reminders = [];
    console.log(day);
    if (day) {
      console.log(day.getFormatDate());
      const reminderUUID = this.props.dayWiseMap[day.getFormatDate()];
      if (reminderUUID) {
        for (let i = 0; i < reminderUUID.length; i++) {
          let reminder = this.props.reminders[reminderUUID[i]];
          reminders.push(reminder);
        }
      }
    }
    return reminders;

  };



  componentDidMount() {

  }

  render() {
    const {day} = this.props;
    const reminders = this.getReminders();
    reminders.sort((a,b) => { return a.time >= b.time ? -1: -0});
    const reminderBlock = reminders.map((r) => {
      return (
        <div key={r.uuid}>
          <Link to={`/reminder/${r.uuid}/edit`}>
            <span className='badge' style={{background: r.color}}> {r.startTime + ' ' + r.title.slice(0,10) + ".."} </span>
          </Link>
        </div>
      )
    });
    console.log(reminders);
    if (day) {
      return (
        <div className='day-block'>
          <span className='day-date'>
            {day.date}
            <Link to={'/reminder/new/' + day.getFormatDate()} onClick={this.createReminder}>
              <span className='badge'>
                +
              </span>
            </Link>
          </span>
          <div>
            {reminderBlock}

          </div>
        </div>
      )
    } else {
      return (
        <div className='day-block'>

        </div>
      )
    }
  }
}

const mapStatsToProps = (state, ownProps) => {

  return {
    reminders: state.reminders,
    dayWiseMap: state.dayWiseMap
  }

};

export default connect(mapStatsToProps)(DayBlock);