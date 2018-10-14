import React, {Component} from 'react'
import Moment from "moment";
import {Calender, Day} from "../models/calendar";
import Reminder from "../models/reminder";
import Faker from 'faker';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import '../styles.css'


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

    reminders.sort((a, b) => {
      return a.time >= b.time ? -1 : 0
    });

    return reminders;

  };


  componentDidMount() {

  }

  renderReminder() {
    let reminders = this.getReminders();
    let reminderArray = [];
    for (let id in reminders) {
      reminderArray.push(
        <Link to={`/reminder/${reminders[id].uuid}/edit`}>
          <div className="col-center reminder" style={{color: reminders[id].color}} key={id}>
            <b>({reminders[id].startTime}) </b>
            {reminders[id].title}
          </div>
        </Link>
      );
    }
    return <div className="col-center">{reminderArray}</div>;
  }


  render() {
    const {day} = this.props;
    const reminders = this.getReminders();
    reminders.sort((a, b) => {
      return a.time >= b.time ? -1 : -0
    });

    console.log(reminders);
    if (day) {
      return (
        <div className={`col cell cal-container`} key={day.getFormatDate()}>
          <span className="number">
            <span className="badge" style={{'font-size': '14px'}}>{day.date}</span>
          </span>
          <div className='scrollable'>
            <span className="number">{this.renderReminder()}</span>
          </div>
          <div>
            <Link to={`/reminder/new/${day.getFormatDate()}`}> + </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`col cell inactive`}> # </div>
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