import React, { Component } from 'react';
import Flatpickr from "react-flatpickr";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import "flatpickr/dist/themes/material_green.css";

class Datepicker extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  render() {
    const { date } = this.state;
    return (
      <div className="datepicker">
        <Flatpickr
          value={date}
          onChange={([date]) => {
            this.setState({ date });
            // this.props.onDateChange(date);
          }}
        />
      </div>
    );
  }
}

export default Datepicker;