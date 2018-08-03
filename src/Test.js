import React, { Component } from 'react';
import './App.css';

class Test extends Component {
  // Defining an initial state
  state = {
    inputString: "",
    inputInteger: "",
    outputString: "",
  }

  handleInputChange = event => {
    // Getting the value and name of the input that triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState(
      (state) => (
        { [name]: value }
      ),
      () => {
        this.handleStringChange(this.state.inputString, this.state.inputInteger);
      }
    )
  }

  handleStringChange = (str, int) => {
    let integer = int;
    let string = str;
    this.setState({
      outputString: "int: " + integer + ", str: " + string
    })
  }


  // Rendering a page to display the user inputs and outputted results
  render() {
    return (
      <div className="container">

        <div className="row">

          <div className="col-sm">
            <form>
              <div className="form-group">
                <label for="inputArrayInteger">Integer:</label>
                <input onChange={this.handleInputChange} type="number" className="form-control" name="inputInteger" placeholder="2" />
                <small className="form-text text-muted">Enter an integer to shift the string by.</small>
              </div>
              <div className="form-group">
                <label for="inputArray">String:</label>
                <input onChange={this.handleInputChange} type="text" className="form-control" name="inputString" placeholder="MyString" />
                <small className="form-text text-muted">Enter a string here.</small>
              </div>
            </form>
          </div>

          <div className="col-sm">
            Input String: {this.state.inputString} <br />
            Input Integer: {this.state.inputInteger} <br />
            Output String: {this.state.outputString}
          </div>

        </div>
      </div>
    );
  }
}

export default Test;
