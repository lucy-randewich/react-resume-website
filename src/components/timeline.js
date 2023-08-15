import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  timeline: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '50px',
  },
  title: {
    marginBottom: '50px',
  },
  timelineContainer: {
    width: '90%',
    height: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    left: '7%',
    width: '2px',
    height: '100px',
    background: '#000',
    transition: 'height 2s ease',
  },
  timelineCard: {
    marginLeft: '8%',
    marginTop: '10px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
    opacity: 0,
    transform: 'translateX(-20px)',
    transition: 'opacity 1s, transform 1s',
  },
  paper: {
    padding: '16px',
  },
  icon: {
    marginBottom: '10px',
  },
}));

const Timeline = ({ id }) => {
    const classes = useStyles();
    const [animateLine, setAnimateLine] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const timelineSection = document.getElementById(id);
        if (timelineSection) {
          const rect = timelineSection.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setAnimateLine(true);
          } else {
            setAnimateLine(false);
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [id]);
  
    return (
      <section id={id} className={classes.timeline}>
        <h3 className={classes.title}>My Career Timeline</h3>
        <div className={classes.timelineContainer}>
          <div
            className={classes.verticalLine}
            style={{ height: animateLine ? '100%' : '0%' }}
          ></div>
          <div
            className={classes.timelineCard}
            style={{
              opacity: animateLine ? 1 : 0,
              transform: animateLine ? 'translateX(0)' : 'translateX(-20px)',
            }}
          >
            <Paper elevation={3} className={classes.paper}>
              <div>
                <h4>Job Title</h4>
                <p>Job description and details...</p>
              </div>
            </Paper>
          </div>
        </div>
      </section>
    );
  };
  
  export default Timeline;