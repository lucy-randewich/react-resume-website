import React from 'react';
import { makeStyles } from '@mui/styles';
import { GitHub, LinkedIn, Mail, Instagram } from '@mui/icons-material';

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
        <a href="mailto:lrandewich@hotmail.co.uk" className={classes.icon}>
            <Mail />
        </a>
        <a href="https://www.instagram.com/laurcty/" className={classes.icon}>
            <Instagram />
        </a>
        </footer>
    </section>
  );
};

export default Contact;
