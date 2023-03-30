# Search.js

* This is a functional component named Search.js which is under src/components,it demonstrates how to use React useState to pass data between components in a React application.

* The component uses the useState hook from React to define and manage four pieces of state:

* query: A string that represents the user's search query.
* showModal: A boolean that determines whether or not to show a modal dialog box.
* modalMessage: A string that represents the message to display in the modal dialog box.
* searchResultsAPI: An array that stores the search results returned from the NASA API.
* The handleSearch function is defined to handle the search query entered by the user. When the user  submits a search query, the function first checks if the search results are already stored in local storage. If the results are available in local storage, the function retrieves and displays them to the user. If the results are not available in local storage, the function makes a request to the NASA API to search for images related to the query.

* If the API returns results, the function extracts the relevant information from the API response and converts it into an array of search result objects. The function then stores the search query and results in local storage and sets the searchResultsAPI state to the array of search result objects.

 * If the API does not return any results, the function displays a modal dialog box with a message informing the user that no results were found.

The handleQueryChange function is defined to update the query state when the user enters a search query.

Finally, the component renders a form with an input field for the user to enter a search query. When the user submits the form, the handleSearch function is called to handle the search query. If there are search results stored in the searchResultsAPI state, the component renders a list of search results. If there are no search results, the component displays a modal dialog box with a message informing the user that no results were found. The modal dialog box is displayed using the Modal component from React Bootstrap.