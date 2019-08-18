import React from 'react';
import './App.scss';

import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

function App() {
  var state="Home";
  return (
    <div className="App">
      <Nav/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
