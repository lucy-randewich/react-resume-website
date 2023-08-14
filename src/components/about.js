import React from 'react';
import { makeStyles } from '@mui/styles';
import Image from '../images/stor2.jpeg';

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
    maxWidth: '50%',
    objectFit: 'contain'
  },
  textContainer: {
    flex: '1',
    padding: '20px',
  },
  aboutText: {
    fontSize: '1.2rem',
  },
}));

const AboutPage = ({id}) => {
  const classes = useStyles();

  return (
    <section id={id} className="about">
    <div className={classes.aboutPage}>
      <div className={classes.photoContainer}>
        <img
          src= {Image}
          alt="About Me"
          className={classes.photo}
        />
      </div>
      <div className={classes.textContainer}>
        <p className={classes.aboutText}>
          Hi, I'm Lucy. I have a passion for designing and implementing 
          solutions to complex software problems. I was top in my year at the University of Britol
          in Computer Science BSc, and also have a breadth of industry experience! I love travelling, 
          painting, and enjoying the sun. Feel free to check out my CV and contact me with enquiries. 
        </p>
      </div>
    </div>
    </section>
  );
};

export default AboutPage;
