import React from 'react';
import { makeStyles } from '@mui/styles';
import Image from '../images/stor2.jpeg';
import Button from '@mui/material/Button';
import CV from '../resources/CV.pdf';

const useStyles = makeStyles((theme) => ({
  aboutPage: {
    backgroundColor: '#fffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
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
    height: '100%',
    maxWidth: '60%',
    objectFit: 'contain',
  },
  textContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
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
    borderRadius: '10px',
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

  return (
    <section id={id} className="about">
      <div className={classes.aboutPage}>
        <div className={classes.photoContainer}>
          <img src={Image} alt="About Me" className={classes.photo} />
        </div>
        <div className={classes.textContainer}>
          <p className={classes.aboutText}>
            Hi, I'm Lucy. I have a passion for designing and implementing solutions to complex software problems.
            I was top in my year at the University of Bristol in Computer Science BSc, and also have a breadth of industry experience!
            I love travelling, painting, and enjoying the sun. Feel free to check out my CV and contact me with inquiries.
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
