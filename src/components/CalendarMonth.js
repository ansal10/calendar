

import React, {Component} from 'react'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import {Calender, Day} from '../models/calendar';
import Moment from 'moment';
import DayBlock from "./DayBlock";
import Reminder from "../models/reminder";
import Lodash from 'lodash'

class CalendarMonth extends Component {



  constructor(month){
    super()
  }

  componentDidMount(){
    this.year = this.props.match.params.year;
    this.month = this.props.match.params.month;

  }

  getDaysLabels(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => {
      return (
        <div className='day-block' key={d}>
          {d}
        </div>
      )
    });
    return days;
  }

  navigateToNextMonth = () => {
    let {month, year } = this.props;
    month = Number.parseInt(month);
    year = Number.parseInt(year);

    let nextYear = (month + 1) > 12 ? year+1: year;
    let nextMonth = (month + 1) > 12 ? 1 : month + 1;


    let url = Moment(`${nextYear}-${nextMonth}`, 'YYYY-MM').format('YYYY/MM');

    this.props.history.push(`/${url}`)
  }

  navigateToPrevious = () => {
    let {month, year } = this.props;
    month = Number.parseInt(month);
    year = Number.parseInt(year);

    let nextYear = (month - 1) < 1 ? year-1: year;
    let nextMonth = (month - 1) < 1 ? 12 : month - 1;

    let url = Moment(`${nextYear}-${nextMonth}`, 'YYYY-MM').format('YYYY/MM');

    this.props.history.push(`/${url}`)
  }


  getDaysMatrix = () => {  // 7 x 5 Day matrix

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


      const matrix = Lodash.chunk(days, 7);

      const matrixBlock = matrix.map((days, index) => {
        return (
          <div className='container' key={index}>
            {days.map((d, i) => {
              return (
                <DayBlock day={d} key={index + ' ' + i}/>
              )
            })}
          </div>
        )
      });

      return matrixBlock;
    }else return(
      null
    )
  };

  render(){

    const {month, year} = this.props;

    return (
      <div className='container'>
        <div className="panel panel-default">
          <div className="panel-heading">{Calender.getMonthName(month)}</div>
          <div className="panel-body">
            <div className='container'>
              <div style={{ float: 'left'}}>
                <button onClick={this.navigateToPrevious}> Prev </button>
              </div>
              <div style={{ float: 'left'}}>
                <button onClick={this.navigateToNextMonth}> Next </button>
              </div>
            </div>
            <div className='container'>
              {this.getDaysLabels()}
            </div>
            {this.getDaysMatrix()}
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