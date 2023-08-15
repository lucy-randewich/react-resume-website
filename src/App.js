import React from 'react';
import './App.css';
import Header from './components/header';
import HomePage from './components/home';
import ProjectsPage from './components/projects';
import AboutPage from './components/about';
import Contact from './components/contact';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="main">
          <HomePage id="home"/>
            <Parallax translateY={[-10, 10]}>
              <AboutPage id="about"/>
            </Parallax>
          <ProjectsPage id="projects"/>
        </div>
        <Contact id="contact"/>
      </div>
    </div>
  );
}

export default App;
