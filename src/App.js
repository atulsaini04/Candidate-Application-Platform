import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import JobListingsPage from './pages/JobListingsPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Route path="/" exact>
            <JobListingsPage />
          </Route>
          {/* Add more routes for other pages if needed */}
      </Router>
    </Provider>
  );
}

export default App;
