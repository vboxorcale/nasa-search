import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { Container, Row, Col, Form, Button,Modal } from 'react-bootstrap';
import './Search.css';


const Search = () => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [searchResultsAPI, setSearchResultsAPI] = useState([]);


  const handleSearch = (event) => {
    event.preventDefault();

    // Check if the search results are already stored in local storage
    const storedResults = localStorage.getItem(query);
    if (storedResults) {
      // If the search results are stored in local storage, display them to the user
      setSearchResultsAPI(storedResults);
    } else {
      // Make a request to the NASA API to search for images related to the query
      fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
        .then(response => response.json())
        .then(data => {
          // Extract the relevant information from the API response
          const items = data.collection.items;
          if (items.length === 0) {
            // Display the "no results" modal
            setShowModal(true);
            setModalMessage('Your search did not match any results. Please try a different search term.');
          } else {
            // Convert the API response to an array of search result objects
            const searchResultsAPIs = Array.isArray(items) ? 
            items.map(item => {
              const title = item.data[0].title;
              const imageUrl = item.links[0].href;
              const description = item.data[0].description;
              const date = item.data[0].date_created;
              const location = item.data[0].location;
              const photographer = item.data[0].photographer;
              return {
                title,
                imageUrl,
                description,
                date,
                location,
                photographer
              };
            }) : [];
            console.log(searchResultsAPIs)
            // Store the search query and results in local storage
            localStorage.setItem(query, JSON.stringify(searchResultsAPIs));
            // Set the search results state
            setSearchResultsAPI(searchResultsAPIs);
          }
        })
        .catch(error => {
          console.error(error);
          setSearchResultsAPI([{
            title: 'An error occurred',
            imageUrl: '',
            description: 'An error occurred while searching. Please try again later.',
            date: '',
            location: '',
            photographer: ''
          }]);
        });
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

 

  return (
    <div>
          <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formBasicSearch">
              <Form.Control
                type="text"
                placeholder="Enter your search query"
                value={query}
                onChange={handleQueryChange}
              />
            </Form.Group>
            <Button className="btn" type="submit">
              NASA Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
      {searchResultsAPI.length > 0 && (
        <ul>
          {searchResultsAPI.map(result => (
            <li key={result.id} className="search-result">
              <img src={result.imageUrl} alt={result.title} />
              <h5>{result.title}</h5>
              <p>{result.description}</p>
              <p>{result.date}</p>
            </li>
          ))}
        </ul>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
       <Modal.Header closeButton>
       <Modal.Title>No Results Found</Modal.Title>
        </Modal.Header>
          <Modal.Body>
          <p>{modalMessage}</p>
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>
            Close
          </Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search
