import { combineReducers } from 'redux';
import {DispatchActions} from '../utils/constants'
import Immutable from 'immutable'
import ReminderActions from '../actions/reminder_action';


const initState = {
  reminders:{},  // uuid: reminder
  dayWiseMap:{} // YYYY-MM-DD: [uuid]

};

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