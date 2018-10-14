import React, {Component} from 'react'
import Moment from "moment";
import {Calender} from "../../models/calendar";

class DayBlock extends Component {

  state = {};

  constructor(props) {
    super(props);
    this.day = props.day;
  }

  componentDidMount(){
    this.setState({
      day: this.day
    })
  }

  render() {

    const {day, date} = this.props;

    if (this.state.day) {
      return (
        <div className="card col l1">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="images/office.jpg"/>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{this.state.day.name + " " + this.state.day.date}<i
              className="material-icons right">more_vert</i></span>
            <p><a href="#">This is a link</a></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="card">
        </div>
      )
    }
  }
}



export {
  DayBlock
}