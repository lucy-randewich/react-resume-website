import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import Logo from '../images/logo.png';
import '../index.css';

const Header = ({id}) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position="fixed" elevation = {4}
      sx={{
        top: 0,
        height: scrolled ? '70px' : '80px',
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(2px)',
        transition: 'background-color 0.4s, height 0.4s',
      }}
    >
    <Toolbar
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            alignItems: 'center',
        }}
    >
    <div
        style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <img
            src={Logo}
            alt="Logo"
            style={{
            width: '300px',
            height: 'auto',
            opacity: 1,
            transition: 'opacity 0.4s',
            }}
        />
    </div>

        <div>
          <Button
            color="inherit"
            sx={{
              '&:hover': {
                color: 'pink',
              },
            }}
            onClick={() => scrollToSection('home')}
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{
              '&:hover': {
                color: 'pink',
              },
            }}
            onClick={() => scrollToSection('about')}
          >
            About Me
          </Button>
          <Button
            color="inherit"
            sx={{
              '&:hover': {
                color: 'pink',
              },
            }}
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </Button>
          <Button
            color="inherit"
            sx={{
              '&:hover': {
                color: 'pink',
              },
            }}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
