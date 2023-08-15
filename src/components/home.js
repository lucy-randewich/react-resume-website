import React from 'react';
import { makeStyles } from '@mui/styles';
import bigLogo from '../images/biglogo3.png';

const useStyles = makeStyles((theme) => ({
  homepageContainer: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    textAlign: 'center',
    width: '60%',
    '&:hover .logo': {
      animation: '$bounce 0.5s infinite',
    },
  },
  logo: {
    maxWidth: '70%',
    marginBottom: '8px',
    animation: '$bounce 1s',
  },
  description: {
    fontSize: '1.2rem',
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateY(0) scale(1)',
    },
    '50%': {
      transform: 'translateY(-12px) scale(1.1)',
    },
  },
}));

const HomePage = ({ id }) => {
  const classes = useStyles();

  return (
    <section id={id} className="home">
          <div className={classes.homepageContainer}>
            <div
              className={classes.card}
            >
              <img
                src={bigLogo}
                alt="Logo"
                className={classes.logo}
              />
              <p className={classes.description}>
                Hi! I'm Lucy. Have a scroll about to find out about me and what I can do for you!
              </p>
            </div>
          </div>
    </section>
  );
};

export default HomePage;
