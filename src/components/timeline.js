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
    width: '2px',
    background: '#000',
    transition: 'height 2s ease',
  },
  yearLabel: {
    position: 'absolute',
    top: '100%',
    left: '-20px',
  },
  timelineCard: {
    marginLeft: '24px',
    marginTop: '10px',
    maxWidth: '250px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
    opacity: 0,
    transform: 'translateX(-20px)',
    transition: 'opacity 1.6s, transform 0.6s',
  },
  paper: {
    padding: '16px',
  },
  icon: {
    marginBottom: '10px',
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
    title: 'Job Title 2023',
    description: 'Job description and details...',
  },
];

const Timeline = ({ id }) => {
  const classes = useStyles();
  const [animateLine, setAnimateLine] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.getElementById(id);
      if (timelineSection) {
        const rect = timelineSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setAnimateLine(true);
        } else {
          setAnimateLine(false);
          setAnimateCard(false);
          setCurrentYearIndex(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id]);

  const handleLineTransitionEnd = () => {
    if (animateLine) {
      setAnimateCard(true);
    }
  };

  return (
    <section id={id} className={classes.timeline}>
      <h3 className={classes.title}>My Career Timeline</h3>
      <div className={classes.timelineContainer}>
        {timelineData.map((event, index) => (
          <React.Fragment key={event.year}>
            <div
              className={classes.verticalLine}
              style={{
                height: animateLine ? '100%' : '0%',
                left: `${index * 280}px`,
              }}
              onTransitionEnd={handleLineTransitionEnd}
            >
                <span className={classes.yearLabel}>{event.year}</span>
            </div>
              <div
                className={classes.timelineCard}
                style={{
                  opacity: animateCard ? 1 : 0,
                  transform: animateCard ? 'translateX(0)' : 'translateX(-20px)',
                }}
              >
                <Paper elevation={3} className={classes.paper}>
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                </Paper>
              </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
