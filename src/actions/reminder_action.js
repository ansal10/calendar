import Moment from 'moment';
import Reminder from '../models/reminder'
import {Day} from "../models/calendar";
import {ToastStore} from 'react-toasts';

class ReminderActions {

  static deleteReminder = (state, uuid) => {
    const reminder = state.reminders[uuid];
    try {
      let formatDate = reminder.day.getFormatDate();
      let index = state.dayWiseMap[formatDate].indexOf(uuid);
      if (index >= 0)
        state.dayWiseMap[formatDate].splice(index, 1);
    } catch (e) {

    }
    delete state.reminders[uuid];
    ToastStore.success('Reminder Deleted');
    return state;

  };

  static createReminder = (state, params) => {
    const {title, date, color, time, duration} = params;
    const {year, month, dt} = ReminderActions.getDateMonthYearFromDate(date);
    const day = new Day({date:dt, month, year});
    const reminder = new Reminder({title, startTime:time, duration, color, day}  );
    let d = day.getFormatDate();
    state.reminders[reminder.uuid] = reminder;
    if ( !state.dayWiseMap[d] )
      state.dayWiseMap[d] = [reminder.uuid];
    else state.dayWiseMap[d].push(reminder.uuid);
    ToastStore.success('New Reminder Created');

    return state;
  };

  static updateReminder = (state, uuid, params) => {
    const {title, date, color, time, duration} = params;
    const {year, month, dt} = ReminderActions.getDateMonthYearFromDate(date);
    const day = new Day({date:dt, month, year});
    const reminder = state.reminders[uuid];
    try {
      let formatDate = reminder.day.getFormatDate();
      let index = state.dayWiseMap[reminder.day.getFormatDate()].indexOf(uuid);
      if (index >= 0)
        state.dayWiseMap[reminder.day.getFormatDate()].splice(index, 1);

      Object.assign(reminder, {title, day, color, startTime:time, duration});
      if ( !state.dayWiseMap[day.getFormatDate()] )
        state.dayWiseMap[day.getFormatDate()] = [reminder.uuid];
      else state.dayWiseMap[day.getFormatDate()].push(reminder.uuid)

    }catch (e) {

    }
    ToastStore.success('Reminder Updated');

    return state;



  };


  static getDateMonthYearFromDate = (formatDate) => {
    const moment = Moment(formatDate, 'YYYY-MM-DD');
    const [year, month, dt] = [Number.parseInt(moment.format('YYYY')), Number.parseInt(moment.format('MM')), Number.parseInt(moment.format('DD'))];
    return {year, month, dt}
  };


  static validateReminderParams(param) {
    const {title, date, color, time, duration} = param;
    if (!title ||  title.length > 30)
      return 'Title is required and length limit should be within 30';
    if (!Moment(date, 'YYYY-MM-DD').isValid() )
      return 'Date is not valid';
    if (!time || !Moment(time, 'hh:mm').isValid())
      return 'Valid time is required';
    if (!duration || duration < 5 || duration > 60)
      return 'Duration can only be 5 to 60 mins';
    return null;
  }
}

export default ReminderActions;