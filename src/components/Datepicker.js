import React, { Component } from 'react';
import Flatpickr from "react-flatpickr";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "flatpickr/dist/themes/material_green.css";
import axios from "axios";

class Datepicker extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date(),
      media_type: "",
      title: "",
      explanation: "",
      image: "",
      hdurl: "",
    };
  }

  fetchData = () => {
    const { date } = this.state;
    const API_Key = "dj6HizzfnbOetQQ3veK63kEeXS0XrswnaZU0JCef";
    const apiLink = `https://api.nasa.gov/planetary/apod?api_key=${API_Key}`;
    const dateLink = `&date=${date.toISOString().substring(0, 10)}`;
    const queryByDate = `${apiLink}${dateLink}`;
    
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

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { date, media_type, title, explanation, image, hdurl } = this.state;
    const isImage = media_type === "image";
    
    return (
      <div>
        <div className="datepicker">
          <Flatpickr
            value={date}
            onChange={([date]) => {
              this.setState({ date }, () => {
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