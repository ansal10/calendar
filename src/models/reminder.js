import UUID from 'uuid/v4'
import Moment from 'moment';

class Reminder {

  title;
  startTime;
  duration;
  day;
  color;
  uuid;
  date;

  constructor({title, startTime, duration, color = '#000000', day}){
    this.title = title;
    this.startTime = startTime;  // HHMM format
    this.duration = duration;   // minutes
    this.day = day;               // day
    this.color = color;           // events
    this.uuid = UUID();
  }


}

export default Reminder