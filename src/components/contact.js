import React from 'react';
import { makeStyles } from '@mui/styles';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px 0',
  },
  icon: {
    margin: '0 10px',
    fontSize: '24px',
    color: '#fff',
    textDecoration: 'none',
  },
}));

const Contact = ({id}) => {
  const classes = useStyles();

  return (
    <section id={id} className="contact">
        <footer className={classes.footer}>
        <a href="https://github.com/lucy-randewich" className={classes.icon}>
            <GitHub />
        </a>
        <a href="https://www.linkedin.com/in/lucyrandewich" className={classes.icon}>
            <LinkedIn />
        </a>
        <a href="https://twitter.com/yourusername" className={classes.icon}>
            <Twitter />
        </a>
        </footer>
    </section>
  );
};

export default Contact;
