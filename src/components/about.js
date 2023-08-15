import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Image1 from '../images/stor2.jpeg';
import Image2 from '../images/lakes.jpeg'; 
import Image4 from '../images/stor3.jpeg'; 
import Image5 from '../images/skate.jpeg'; 
import Image6 from '../images/grad.jpeg'; 
import CV from '../resources/CV.pdf';
import Typewriter from 'typewriter-effect';

const useStyles = makeStyles((theme) => ({
  aboutPage: {
    backgroundColor: '#fffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '150vh',
    width: '100vw',
  },
  photoContainer: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
  photo: {
    height: '70vh',
    maxWidth: '90%',
    objectFit: 'contain',
  },
  textContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px',
  },
  aboutText: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  cvButton: {
    backgroundColor: 'transparent',
    border: '2px solid pink',
    color: 'pink',
    borderRadius: '5px',
    padding: '8px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: 'pink',
      color: 'white',
    },
  },
}));

const AboutPage = ({ id }) => {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Image6, Image1, Image2, Image4, Image5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(timer); 
    };
  }, [images.length]);

  return (
    <section id={id} className="about">
      <div className={classes.aboutPage}>
        <div className={classes.photoContainer}>
          <img
            src={images[currentImageIndex]}
            alt="About Me"
            className={classes.photo}
          />
        </div>
        <div className={classes.textContainer}>
        <Typewriter
          options={{
            strings: ['Software Developer', 'Squashy Enthusiast', 'Research Associate', 'Computer Science Grad'],
            autoStart: true,
            loop: true,
          }}
        />
          <p className={classes.aboutText}>
            I enjoy designing and implementing solutions to complex software problems.
            I performed top in my year at the University of Bristol in Computer Science BSc,
            and also have a breadth of industry experience.
            I also love travel and artwork :) Feel free to check out my CV and contact me!
          </p>
          <a href={CV} target="_blank" rel="noopener noreferrer" className={classes.cvButton}>
            View CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;