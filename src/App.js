import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Search from './components/Search';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { Component } from "react";
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <Flatpickr
          value={date}
          onChange={([date]) => {
            this.setState({ date });
          }}
        />
        <Search /> {/* Use the Search component */}
      </div>
    );
  }
}

export default App;