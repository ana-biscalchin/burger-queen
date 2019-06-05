import React from 'react';
import './App.css';
// import firebase from "./firebaseConfig";
import Login from "./components/login";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      
        <Login />
      
      </div>
    );
  }
}

export default App;
