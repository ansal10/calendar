import React, {Component} from 'react'
import {Gen} from "../utils/Gen";
import {connect} from 'react-redux';
import {InputBox} from "./inputbox";
import {DispatchActions} from '../utils/constants'
import ReminderActions from "../actions/reminder_action";
import {ToastStore} from 'react-toasts';


class ReminderDetails extends Component {


  state = {};


  componentDidMount() {

  }

  handleChange =  (e) => {

    let id = e.id;
    let value = e.value;
    this.reminder[id] = value;
    this.setState({
      reminder: this.reminder
    });
  };

  handleInputChange = (key, oldVal, newVal) => {
    let d = {};
    d[key] = newVal;
    this.setState({
      ...d
    })
  };

  handleUpdate = (e) => {
    const {title, date, color, time, duration} = this.state;
    const error = ReminderActions.validateReminderParams({title, date, color, time, duration});
    if (error) {
      ToastStore.error(error);
      return;
    }

    if (this.props.edit){
      this.props.updateReminder(this.reminder.uuid, this.state);
    }else {
      this.props.createReminder(this.state)
    }
  };

  handleDelete = (e) => {
    this.props.deleteReminder(this.reminder.uuid);
  };

  render(){
    const {reminder, edit: editable, uuid} = this.props;

    if (uuid && !reminder){
      return (
        <div className='container'>
          Invalid resource ID
        </div>
      )
    }
    return(
      <div className='container'>
        <div className="panel panel-default">
          <div className="panel-heading">Reminders</div>
          <div className="panel-body">
            <InputBox label={'Title'} type={'text'} inputKey={'title'} value={ reminder ? reminder.title: '' } disabled={editable} handleInputChange={this.handleInputChange}/>
            <InputBox label={'Date'} type={'date'} inputKey={'date'} value={ reminder ? reminder.day.getFormatDate(): '' } disabled={editable} handleInputChange={this.handleInputChange}/>
            <InputBox label={'Color'} type={'color'} inputKey={'color'} value={ reminder? reminder.color: ''} disabled={editable} handleInputChange={this.handleInputChange}/>
            <InputBox label={'Time'} type={'time'} inputKey={'time'} value={ reminder ? reminder.time: ''} disabled={editable} handleInputChange={this.handleInputChange}/>
            <InputBox label={'Duration'} type={'number'} inputKey={'duration'} value={ reminder? reminder.duration: 0} disabled={editable} handleInputChange={this.handleInputChange}/>
          </div>
          <div>
            <button type="button" onClick={this.handleUpdate} className="btn btn-success">{editable? 'Update': 'Create' }</button>
            {
               editable? (
              <button type="button" onClick={this.handleDelete} className="btn btn-danger">Delete</button>
              ) : null
            }

          </div>
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state, ownProps) => {
  const {uuid, action} = ownProps.match.params;
  let reminder = null;
  if (uuid) {
    reminder = Gen.getValueFromChainedKey(state.reminder, uuid);
  }

  return{
    reminder,
    edit: !!action || !!uuid,
    uuid: uuid
  }

};


const mapDispatchToProps = (dispatch) => {
  return{
    deleteReminder: (uuid) => { dispatch({type: DispatchActions.DELETE_REMINDER, uuid: uuid}) },
    createReminder: (params) => { dispatch({type: DispatchActions.CREATE_REMINDER, params: params}) },
    updateReminder: (uuid, params) => { dispatch({type: DispatchActions.UPDATE_REMINDER, uuid: uuid, params: params}) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReminderDetails)

