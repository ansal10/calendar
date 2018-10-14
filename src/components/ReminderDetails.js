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
    if (this.props.reminder) {
      this.setState({
        title: this.props.reminder.title,
        date: this.props.reminder.day.getFormatDate(),
        color: this.props.reminder.color,
        time: this.props.reminder.startTime,
        duration: this.props.reminder.duration
      })
    }

    if (this.props.formatDate)
      this.setState({
        date: this.props.formatDate
      })
  }

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

    if (this.props.edit && this.props.reminder) {
      this.props.updateReminder(this.props.reminder.uuid, this.state);
    } else {
      this.props.createReminder(this.state)
    }
    this.props.history.push('/')
  };


  handleDelete = (e) => {
    this.props.deleteReminder(this.props.reminder.uuid);
    this.props.history.push('/');
  };

  render() {
    const {reminder, edit: editable, uuid} = this.props;

    if (uuid && !reminder) {
      return (
        <div className='container'>
          Invalid resource ID
        </div>
      )
    }
    return (
      <div className='container'>
        <div className="panel panel-default">
          <div className="panel-heading">Reminders</div>
          <div className="panel-body">
            <InputBox label={'Title'} type={'text'} inputKey={'title'} value={reminder ? reminder.title : ''}
                      disabled={!editable} handleInputChange={this.handleInputChange}/>
            <InputBox label={'Date'} type={'date'} inputKey={'date'}
                      value={reminder ? reminder.day.getFormatDate() : this.props.formatDate || ''} disabled={!editable}
                      handleInputChange={this.handleInputChange}/>
            <InputBox label={'Color'} type={'color'} inputKey={'color'} value={reminder ? reminder.color : ''}
                      disabled={!editable} handleInputChange={this.handleInputChange}/>
            <InputBox label={'Time'} type={'time'} inputKey={'time'} value={reminder ? reminder.startTime : ''}
                      disabled={!editable} handleInputChange={this.handleInputChange}/>
            <InputBox label={'Duration'} type={'number'} inputKey={'duration'} value={reminder ? reminder.duration : 0}
                      disabled={!editable} handleInputChange={this.handleInputChange}/>
          </div>
          <div>
            <button type="button" onClick={this.handleUpdate}
                    className="btn btn-success">{reminder ? 'Update' : 'Create'}</button>
            {
              reminder ? (
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
  const {uuid, action, formatDate} = ownProps.match.params;
  let reminder = null;
  if (uuid) {
    reminder = Gen.getValueFromChainedKey(state.reminders, uuid);
  }

  let editable = (action === 'edit' || !uuid);

  return {
    reminder,
    edit: editable,
    uuid: uuid,
    formatDate: formatDate
  }

};


const mapDispatchToProps = (dispatch) => {
  return {
    deleteReminder: (uuid) => {
      dispatch({type: DispatchActions.DELETE_REMINDER, uuid: uuid})
    },
    createReminder: (params) => {
      dispatch({type: DispatchActions.CREATE_REMINDER, params: params})
    },
    updateReminder: (uuid, params) => {
      dispatch({type: DispatchActions.UPDATE_REMINDER, uuid: uuid, params: params})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReminderDetails)

