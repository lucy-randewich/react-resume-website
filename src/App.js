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
          <ParallaxProvider scrollAxis="vertical">
          <Parallax translateY={[-15, 15]}>
          <AboutPage id="about"/>
          </Parallax>
          </ParallaxProvider>
          <ProjectsPage id="projects"/>
        </div>
        <Contact id="contact"/>
      </div>
    </div>
  );
}

export default App;
