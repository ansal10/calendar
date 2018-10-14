import { combineReducers } from 'redux';
import {DispatchActions} from '../utils/constants'
import Immutable from 'immutable'
import ReminderActions from '../actions/reminder_action';
import Moment from 'moment';
import Faker from 'faker';
import Reminder from "../models/reminder";
import {Day} from "../models/calendar";

let initState = {
  reminders:{},  // uuid: reminder
  dayWiseMap:{} // YYYY-MM-DD: [uuid]

};



for (let i = 0 ; i < 10 ; i++){
  const month = Moment().format('MM');
  const year = Moment().format('YYYY');
  const day = Faker.random.number() % 30;
  const title = Faker.name.title();
  const date = `${year}-${month}-${day}`;
  const time = `${Faker.random.number()%24}:${Faker.random.number()%60}`;
  const duration = Faker.random.number()%50 + 6;
  initState = ReminderActions.createReminder(initState, {title, date, time, duration});

}

const rootReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case DispatchActions.CREATE_REMINDER:
      state = ReminderActions.createReminder(state, action.params);
      break;
    case DispatchActions.UPDATE_REMINDER:
      state = ReminderActions.updateReminder(state, action.uuid, action.params);
      break;

    case DispatchActions.DELETE_REMINDER:
      state = ReminderActions.deleteReminder(state, action.uuid);
      break;
  }

  state = {...state};
  console.log(state);
  return state;

};

export default rootReducer