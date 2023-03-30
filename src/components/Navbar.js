import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// Creating a functional component called Navbar
const Navbar = () =>{
  return (
    // A Bootstrap Navbar with a light background
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* //// A Navbar brand with the text "Bootcamp   */}
      <div className="brandtext"><a className="navbar-brand" href="/" aria-disabled="true">Bootcamp</a></div>
      {/* // A button to toggle the Navbar collapse */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* // A Navbar collapse with a list of Nav items */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link"  href="/" aria-disabled="true">Front-end Development <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="/" aria-disabled="true">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="/" aria-disabled="true">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;