import React from 'react';
import './App.css';



import Home from './pages/home';
import Hall from './pages/hall';
import Kitchen from './pages/kitchen';

import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/hall" component={Hall} />
        <Route exact path="/kitchen" component={Kitchen} />
      </div>
    </Router>
  );
};

export default App;
