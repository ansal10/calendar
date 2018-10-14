import React, {Component} from 'react'


class InputBox extends Component {

  oldValue = null;
  state = {};

  componentDidMount(){
    const {label, type, inputKey, value, disabled} = this.props;

    this.setState({
      label,
      type,
      inputKey,
      value,
      disabled
    })
  }

  handleChange = (e) => {
    console.log(e.target);
    let key = e.target.id;
    let value = e.target.value;
    this.props.handleInputChange(key, this.oldValue, value);
    this.oldValue = value;
    this.setState({
      value
    })
  }

  render() {
    const {label, type, inputKey, value, disabled} = this.state;
    if (this.state) {
      return (

        <div className="input-group input-group-padding" key={inputKey}>
          <span className="input-group-addon" id="basic-addon3"> {label} </span>
          <input
            type={type}
            disabled={disabled}
            className="form-control"
            id={inputKey}
            value={value}
            onChange={this.handleChange}
            aria-describedby="basic-addon3"/>
        </div>

      )
    }else return(
      <div>

      </div>
    )
  }
}

export {
  InputBox
}