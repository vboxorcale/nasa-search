import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResultsAPI, setSearchResultsAPI] = useState('');
  const [noResultsModalVisible, setNoResultsModalVisible] = useState(false);

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
            setNoResultsModalVisible(true);
          } else {
            // Convert the API response to an array of search result objects
            const searchResultsAPI = items.map(item => {
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
            });
            // Store the search query and results in local storage
            localStorage.setItem(query, JSON.stringify(searchResultsAPI));
            // Set the search results state
            setSearchResultsAPI(searchResultsAPI);
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

  const handleModalClose = () => {
    setNoResultsModalVisible(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={handleQueryChange} />
        <button type="submit">Search</button>
      </form>
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
      {noResultsModalVisible && (
        <div className="modal">
             {/*  Bootstrap modal for displaying no search results */}
      <div id="no-results-modal" className ="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <p>Your search did not match any results. Please try a different search term.</p>
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
          {/* <p>No results found.</p> */}
          <button onClick={handleModalClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Search
