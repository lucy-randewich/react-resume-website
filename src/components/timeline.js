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
  },
  yearContainer: {
    padding: '30px',
    height: '60vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  lineContainer: {
    width: '2px',
    backgroundColor: '#000',
    transition: 'height 1.5s ease',
    position: 'relative',
  },
  yearLabel: {
    position: 'absolute',
    bottom: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  timelineCard: {
    maxWidth: '300px',
    opacity: 0,
    transform: 'translateX(-20px)',
    transition: 'opacity 0.5s, transform 0.5s',
  },
}));

const timelineData = [
  {
    year: 2020,
    title: 'Job Title 2020',
    description: 'Job description and details...',
  },
  {
    year: 2021,
    title: 'Job Title 2021',
    description: 'Job description and details...',
  },
  {
    year: 2022,
    title: 'Job Title 2022',
    description: 'Job description and details...',
  },
  {
    year: 2023,
    title: 'Graduation!',
    description: 'In July, I graduated with a high first-class in computer science BSc.',
  },
];

const Timeline = ({ id }) => {
  const classes = useStyles();
  const [animateLines, setAnimateLines] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.getElementById(id);
      if (timelineSection) {
        const rect = timelineSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setAnimateLines(true);
        } else {
          setAnimateLines(false);
          setAnimateCards(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id]);

  const handleLineTransitionEnd = () => {
    if (animateLines) {
      setAnimateCards(true);
    }
  };

  return (
    <section id={id} className={classes.timeline}>
      <h3 className={classes.title}>My Career Timeline</h3>
      <div className={classes.timelineContainer}>
        {timelineData.map((event, index) => (
            <div className={classes.yearContainer} key={event.year}>
                <div className={classes.lineContainer} style={{
                    height: animateLines ? '80%' : '0%',
                }}
                onTransitionEnd={handleLineTransitionEnd}>

                <span className={classes.yearLabel}>{event.year}</span>
                </div>

                <div
                    className={classes.timelineCard}
                    style={{
                    opacity: animateCards ? 1 : 0,
                    transform: animateCards ? 'translateX(0)' : 'translateX(-20px)',
                    marginTop: '10px',
                    marginLeft: '10px',
                    }}
                >
                    <Paper elevation={3} className={classes.paper} style={{padding: '12px',}}>
                    <div>
                        <h4>{event.title}</h4>
                        <p style={{fontSize:'10px'}}>{event.description}</p>
                    </div>
                    </Paper>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
