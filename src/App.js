import React from 'react';
import './App.css';
import Header from './components/header';
import HomePage from './components/home';
import ProjectsPage from './components/projects';
import AboutPage from './components/about';
import Contact from './components/contact';
import Timeline from './components/timeline';
import { Parallax } from 'react-scroll-parallax';

import { createTheme, ThemeProvider } from '@mui/material';
const fontUrl = './resources/RetrokiaCapsRounded.ttf';

const theme = createTheme({
  typography: {
    fontFamily: "retrokia",
    src: `url(${fontUrl}) format('truetype')`,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
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
