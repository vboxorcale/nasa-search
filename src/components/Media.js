const Media=(props)=> {
  return (
    <div className="card w-50">
      <section id="wrapper-media">
        <img src={props.image} alt="nasa" className="card-img-top" />
      </section>
      <div className="card-body">
        <h5 id="wrapper-title" className="card-title">{props.title}</h5>
        <p id="wrapper-explanation">{props.explanation}</p>
        <p id="wrapper-date">{props.date}</p>
        <h6 id="wrapper-copyright">{props.copyRight}</h6>
      </div>
    </div>
  );
}

export default Media;