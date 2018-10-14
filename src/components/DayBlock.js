import React, {Component} from 'react'
import Moment from "moment";
import {Calender, Day} from "../models/calendar";
import Reminder from "../models/reminder";
import Faker from 'faker';



// day as props
class DayBlock extends Component {

  state = {};


  getReminders = () => {
    let reminders = [];
    for (let i = 0 ; i < 3 ; i++){
      let title = Faker.name.title();
      let day = new Day({date:12, month:10, year:2017});
      let time = Number.parseInt(Faker.random.number())%24 + ":" + Number.parseInt(Faker.random.number())%24;  // HH:MM format time
      let dur = Number.parseInt(Faker.random.number());
      const reminder = new Reminder({title:title, startTime: time, duration:dur, color: Faker.commerce.color(), day:day});
      reminders.push(reminder);
    }
  };

  componentDidMount(){

  }

  render() {
    return (
      <div>

      </div>
    )
  }
}



export {
  DayBlock
}