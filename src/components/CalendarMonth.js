import React, {Component} from 'react'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import {Calender, Day} from '../models/calendar';
import Moment from 'moment';
import DayBlock from "./DayBlock";
import Reminder from "../models/reminder";
import Lodash from 'lodash'
import '../styles.css'

class CalendarMonth extends Component {


  constructor(month) {
    super()
  }

  componentDidMount() {
    this.year = this.props.match.params.year;
    this.month = this.props.match.params.month;

  }

  renderDaysLabels() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let data = []
    for (let id in days) {
      data.push(
        <div className="col col-center" key={id}>
          {days[id]}
        </div>
      );
    }
    return <div className="days row">{data}</div>;

  }

  navigateToNextMonth = () => {
    let {month, year} = this.props;
    month = Number.parseInt(month);
    year = Number.parseInt(year);

    let nextYear = (month + 1) > 12 ? year + 1 : year;
    let nextMonth = (month + 1) > 12 ? 1 : month + 1;


    let url = Moment(`${nextYear}-${nextMonth}`, 'YYYY-MM').format('YYYY/MM');

    this.props.history.push(`/${url}`)
  }

  navigateToPrevious = () => {
    let {month, year} = this.props;
    month = Number.parseInt(month);
    year = Number.parseInt(year);

    let nextYear = (month - 1) < 1 ? year - 1 : year;
    let nextMonth = (month - 1) < 1 ? 12 : month - 1;

    let url = Moment(`${nextYear}-${nextMonth}`, 'YYYY-MM').format('YYYY/MM');

    this.props.history.push(`/${url}`)
  }


  renderDaysMatrix = () => {  // 7 x 5 Day matrix

    const {month, year} = this.props;
    const days = [];
    if (month && year) {
      const calenderDays = Calender.getDaysForMonthAndYear({month, year});
      console.log(calenderDays);
      for (let i = 0; i < calenderDays.length; i++) {
        days.push(calenderDays[i]);
      }
      let startDay = Moment(calenderDays[0].getFormatDate(), 'YYYY-MM-DD').day();
      for (let i = 0; i < startDay; i++)
        days.unshift(null);

      let dayIndex = 0;
      let weekDays = 0;
      let matrix = [];
      let rows = [];
      while (dayIndex < days.length) {
        if (weekDays <= 7) {
          rows.push(<DayBlock day={days[dayIndex]}/>);
          weekDays++;
        }
        if (weekDays === 7 || dayIndex === (days.length - 1)) {
          matrix.push(
            <div className='row' key={days[dayIndex].getFormatDate()}>
              {rows}
            </div>
          )
          rows = [];
          weekDays = 0;
        }
        dayIndex++;

      }

      return <div className='body'> {matrix}</div>

    } else return (
      null
    )
  };

  render() {

    const {month, year} = this.props;

    return (
      <div className='container'>
        <div className="panel panel-default">
          <div className="panel-heading">{this.renderDaysLabels()}</div>
          <div className="panel-body" >
            <div className="btn-group btn-group-justified" role="group" aria-label="...">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default" onClick={this.navigateToPrevious}> {'<< Prev Month'}</button>
              </div>
              <div className="btn-group" role="group">

              </div>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default" onClick={this.navigateToNextMonth}>Next Month >></button>
              </div>
            </div>

            <div style={{'margin-top': '18px'}}>
            {this.renderDaysMatrix()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let {month, year} = ownProps.match.params;
  month = month || Moment().format('MM');
  year = year || Moment().format('YYYY');

  return {
    month: month,
    year: year
  }
};

export default connect(mapStateToProps)(CalendarMonth)