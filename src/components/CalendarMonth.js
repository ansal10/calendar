

import React, {Component} from 'react'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import {Calender, Day} from '../models/calendar';
import Moment from 'moment';
import {DayBlock} from "./DayBlock";
import Reminder from "../models/reminder";

class CalendarMonth extends Component {



  constructor(month){
    super()
  }

  componentDidMount(){
    this.year = this.props.match.params.year;
    this.month = this.props.match.params.month;

  }

  getDaysLabels(){
    // sunday to saturday
  }


  getDaysMatrix = () => {  // 7 x 5 Day matrix

    for (let i = 1 ; i < 31 ; i++) {
      let day = new Day({date:i, month:10, year:2018});
    }
  };


  render(){

    return (
      <div className='container'>
        <div className="panel panel-default">
          <div className="panel-heading">{this.getDaysLabels()}</div>
          <div className="panel-body">
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

};

export default connect(mapStateToProps)(CalendarMonth)