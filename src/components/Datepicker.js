import React, { Component } from 'react';
import Flatpickr from "react-flatpickr";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "flatpickr/dist/themes/material_green.css";
import './Datepicker.css';
import axios from "axios";

class Datepicker extends Component {
  constructor() {
    super();
    // Initialize state
    this.state = {
      date: new Date(),
      media_type: "",
      title: "",
      explanation: "",
      image: "",
      hdurl: "",
    };
  }
    // Fetch data from the NASA API based on selected date
  fetchData = () => {
    // Define API key and URL
    const { date } = this.state;
    const API_Key = "dj6HizzfnbOetQQ3veK63kEeXS0XrswnaZU0JCef";
    const apiLink = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}`;
    const dateLink = `&date=${date.toISOString().substring(0, 10)}`;
    const queryByDate = `${apiLink}${dateLink}`;
    // Send GET request to API endpoint
      axios
      .get(queryByDate)
      .then(response => {
        const { media_type, title, explanation, url, hdurl } = response.data;

        this.setState({
          media_type,
          title,
          explanation,
          image: url,
          hdurl,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  // Call fetchData method when component mounts to display initial data
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { date, media_type, title, explanation, image, hdurl } = this.state;
    // Check if media type is image or video
    const isImage = media_type === "image";
    
    return (
      <div>
        <div className="datepicker">
            <h1 className="ChangaOne">Pick a Date to select the picture of the date</h1>
          <Flatpickr
            value={date} // Sets the initial value of the Flatpickr datepicker to the current state's date value
            onChange={([date]) => { // Sets the callback function that runs when the datepicker value changes
              this.setState({ date }, () => { // Sets the component's date state to the new date value, then calls fetchData to update the NASA image data based on the new date
                this.fetchData();
    
              });
            }}
          />
        </div>
        <div className="wrapper-media">
         {isImage ? (
          <a id="wrapper-hdurl" href={hdurl} target="_blank" rel="noopener noreferrer">
             <img
               id="wrapper-image"
                className="card-img-top"
                src={image}
                alt=""
              />
            </a>
      ) : (
      <div className="ratio ratio-21x9">
       <iframe
        id="wrapper-video"
        title="Video Player"
        src={image}
        width="700"
        height="450"
        allowFullScreen
       ></iframe>
      </div>
    )}
  </div>
        <div className="wrapper-info">
          <h3 id="wrapper-title">Title: {title}</h3>
          <p id="wrapper-explanation">{explanation}</p>
          <p id="wrapper-date">Date: {date.toDateString()}</p>
          <p id="wrapper-copyright">
            {media_type === "image" ? "© NASA" : ""}
          </p>
        </div>
      </div>
    );
  }
}

export default Datepicker;