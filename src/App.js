import React from 'react';
import './App.css';
import Header from './components/header';
import HomePage from './components/home';
import ProjectsPage from './components/projects';
import AboutPage from './components/about';
import Contact from './components/contact';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="main">
          <HomePage id="home"/>
          <AboutPage id="about"/>
          <ProjectsPage id="projects"/>
        </div>
        <Contact id="contact"/>
      </div>
    </div>
  );
}

export default App;
