import React from 'react';
import './App.css';
import Header from './components/header';
import HomePage from './components/home';
import ProjectsPage from './components/projects';
import AboutPage from './components/about';
import Contact from './components/contact';
import Timeline from './components/timeline';
import { Parallax } from 'react-scroll-parallax';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="main">
          <HomePage id="home"/>
            <Parallax translateY={[-23, 25]}>
              <AboutPage id="about"/>
            </Parallax>
          <ProjectsPage id="projects"/>
          <Timeline id="timeline"/>
        </div>
        <Contact id="contact"/>
      </div>
    </div>
  );
}

export default App;
