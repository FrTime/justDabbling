import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Defining an initial state
  state = {
    userInputArrayAsString: "",
    userInputArray: [],
    userInputIntegerForArray: 0,
    arrayOutput: "",
    userInputString: "",
    userInputIntegerForString: 0,
    stringOutput: "",
  }

  // Setting the event handlers to run on mounting
  componentDidMount = () => {
    this.handleInputString(this.state.userInputString, this.state.userInputIntegerForString);
    this.handleInputArray(this.state.userInputArrayAsString, this.state.userInputIntegerForArray);
  };

  // Creating a function that will update the state when a change in the string or integer is detected
  handleStringChange = event => {
    // Getting the value and name of the input that triggered the change
    const { name, value } = event.target;
    // Updating the input's state, then using a callback to handle the string function
    this.setState(
      (state) => (
        { [name]: value }
      ),
      () => {
        this.handleInputString(this.state.userInputString, this.state.userInputIntegerForString);
      }
    )
  }

  // Creating a function that will update the state when a change in the array or integer is detected
  handleArrayChange = event => {
    // Getting the value and name of the input that triggered the change
    const { name, value } = event.target;
    // Updating the input's state, then using a callback to handle the array function
    this.setState(
      (state) => (
        { [name]: value }
      ),
      () => {
        this.handleInputArray(this.state.userInputArrayAsString, this.state.userInputIntegerForArray);
      }
    )
  }

  // Creating a function that takes in the user input values and outputs two values
  handleInputArray = (inputArrayString, inputIntegerString) => {
    // Parsing the inputted string of numbers as an array
    const inputInteger = parseInt(inputIntegerString);
    const inputArray = inputArrayString.split(",").map(Number).filter(Boolean);
    console.log(inputArray);
    console.log(inputInteger);
    // Checking if the input is able to be sorted based on the user input
    if (inputArray.length < 1) {
      this.setState({
        arrayOutput: "Please enter an array of numbers."
      })
      return "Please enter an array of numbers."
    } if (!Number.isInteger(inputInteger)) {
      this.setState({
        arrayOutput: "Please enter a valid integer."
      })
      return "Please enter a valid integer."
    }
    for (let index of inputArray) {
      if (!Number.isInteger(index)) {
        this.setState({
          arrayOutput: "Please enter an array of numbers."
        })
        return "Please enter an array of numbers."
      }
    }
    // Defining a variable to increment for each index higher than the chosen integer
    let numbersHigherCounter = 0;
    for (let index of inputArray) {
      if (index > inputInteger) {
        numbersHigherCounter++
      }
    }
    // Defining a variable to increment for each index lower than the chosen integer
    let numbersLowerCounter = 0;
    for (let index of inputArray) {
      if (index < inputInteger) {
        numbersLowerCounter++
      }
    }
    // Outputting an object with both calculated counters
    this.setState({
      arrayOutput: `There are ${numbersHigherCounter} numbers higher than ${inputInteger} and ${numbersLowerCounter} numbers lower.`
    })
    return { numbersHigherCounter, numbersLowerCounter };
  }

  // Creating a function that takes in the user input values and outputs a new string
  handleInputString = (inputString, inputInteger) => {
    // Checking if the input is able to be sorted based on the user input
    if (inputString.toString().trim().length < 1) {
      this.setState({
        stringOutput: "Please enter a string."
      })
      return "Please enter a string."
    }
    if (inputInteger > inputString.toString().length || inputInteger < 0) {
      this.setState({
        stringOutput: "Please enter a natural number (0, 1, 2, 3, ...) that is less than or equal to the entered string."
      })
      return "Please enter a natural number (0, 1, 2, 3, ...) that is less than or equal to the entered string."
    };
    // Defining an empty array to house each index of the string
    let unsortedArray = [];
    // Pushing each index into the empty array, parsing the input as a string
    for (let index of inputString.toString()) {
      unsortedArray.push(index);
    };
    // Defining another empty array to house the sorted indices
    let sortedArray = [];
    // Appending the chosen number of indices to the new array
    for (let i = unsortedArray.length - inputInteger; i < unsortedArray.length; i++) {
      sortedArray.push(unsortedArray[i]);
    }
    // Appending the remaining indices to same array
    for (let i = 0; i < unsortedArray.length - inputInteger; i++) {
      sortedArray.push(unsortedArray[i]);
    };
    // Defining an empty string to house the new rearranged string
    let outputString = "";
    // Looping over each index of the sorted array and appending them to the empty string
    for (let index of sortedArray) {
      outputString = outputString + index;
    }
    // Outputting the new sorted string
    this.setState({
      stringOutput: `Your new string: "${outputString.toString()}"`
    })
    return outputString;
  };

  // Rendering a page to display the user inputs and outputted results
  render() {
    return (

      <div className="container">
        <br />

        <div className="row">

          <div className="col-sm">
            <h4>Print the amount of numbers in an array that are above and below a given integer:</h4>
            <form>
              <div className="form-group">
                <label for="inputArrayInteger">Integer:</label>
                <input onChange={this.handleArrayChange} type="number" className="form-control" name="userInputIntegerForArray" placeholder='Example: "6"' default={0} />
                <small className="form-text text-muted">Enter an integer to compare the array against here.</small>
              </div>
              <div className="form-group">
                <label for="inputArray">Series of Numbers:</label>
                <input onChange={this.handleArrayChange} type="text" className="form-control" name="userInputArrayAsString" placeholder='Example: "1,5,2,1,10"' />
                <small className="form-text text-muted">Enter a series of comma-separated numbers here.</small>
              </div>
            </form>
          </div>

          <div className="col-sm text-center">
            <br /> <br /> <br /> <br /> <br />
            <h4>
              {this.state.arrayOutput}
            </h4>
          </div>

        </div>

        <br />
        <hr />
        <br />

        <div className="row">

          <div className="col-sm">
            <h4>Rotate a string by a given integer:</h4>
            <form>
              <div className="form-group">
                <label for="inputArrayInteger">Integer:</label>
                <input onChange={this.handleStringChange} type="number" className="form-control" name="userInputIntegerForString" placeholder='Example: "2"' />
                <small className="form-text text-muted">Enter an integer to rotate the string by here.</small>
              </div>
              <div className="form-group">
                <label for="inputArray">String:</label>
                <input onChange={this.handleStringChange} type="text" className="form-control" name="userInputString" placeholder='Example: "MyString"' />
                <small className="form-text text-muted">Enter a string here.</small>
              </div>
            </form>
          </div>

          <div className="col-sm text-center">
            <br /> <br /> <br /> <br />
            <h4>
              {this.state.stringOutput}
            </h4>
          </div>

        </div>

      </div>

    );
  }
}

export default App;
