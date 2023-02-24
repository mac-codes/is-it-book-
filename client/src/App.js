import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Navbar from './components/Navbar';
import ApolloClient from 'apollo-boost';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';


// create a new ApolloClient instance
const client = new ApolloClient({
  // set up a request middleware that adds the authorization token to the headers
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    // wrap the entire app in ApolloProvider and pass the client instance
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* render the Navbar component */}
          <Navbar />
          <Switch>
            {/* set up the routes */}
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            {/* if none of the routes match, render an error message */}
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;