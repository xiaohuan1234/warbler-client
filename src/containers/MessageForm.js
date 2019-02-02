import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMessage } from "../store/actions/messages";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      address: "",
      lunch: true,
    };
  }

  handleNewMessage = event => {
    // event.preventDefault();
    this.props.postNewMessage(
      this.state.address,
      this.state.start,
      this.state.lunch
    );
    this.setState({ 
      address: "",
      start: "",
      lunch: true,
    });
    this.props.history.push("/");
  };

  handleRadioChange = e=>{
    let { name, value } = e.target;
    this.setState( { [name]: value==="lunch" } );
  }
  render() {
    return (
      <form onSubmit={this.handleNewMessage}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <input
          type="text"
          className="form-control"
          value={this.state.address}
          placeholder="address"
          name="address"
          onChange={e => this.setState({ address: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          value={this.state.start}
          placeholder="start date"
          name="start"
          onChange={e => this.setState({ start: e.target.value })}
        />
        <label className="container">Lunch
          <input value="lunch" type="radio" checked={ this.state.lunch === true } name="lunch" onChange={this.handleRadioChange}/>
          <span className="checkmark"></span>
        </label>
        <label className="container">Dinner
          <input value="dinner" type="radio" checked={ this.state.lunch === false } name="lunch" onChange={this.handleRadioChange}/>
          <span className="checkmark"></span>
        </label>
        <button type="submit" className="btn btn-success">
          Add my message!
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
