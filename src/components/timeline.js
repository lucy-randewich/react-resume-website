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
    overflowX: 'scroll',
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
    maxWidth: '350px',
    opacity: 0,
    transform: 'translateX(-20px)',
    transition: 'opacity 0.5s, transform 0.5s',
    marginTop: '10px',
    marginLeft: '10px',
  },
}));

const timelineData = [
  {
    year: 2020,
    events: [
      {
        title: 'Ambassador',
        company: 'Instagram UK',
        description: 'Provided feedback and suggestions on new features to the Instagram app before launch.',
      },
      {
        title: 'A-Levels',
        company: 'The Abbey School',
        description: 'Maths (A*), Computer Science (A*), Physics (A)',
      },
    ],
  },
  {
    year: 2021,
    events: [
      {
        title: 'Commissioned Artwork',
        company: 'Freelance',
        description: 'I have sold both prints and originals of my art, which is mostly oil on canvas.',
      },
    ],
  },
  {
    year: 2022,
    events: [
      {
        title: 'MLOps Intern',
        company: 'Oxford Nanopore Technologies',
        description: 'Optimised neural network models and created pipeline automation scripting tools.',
      },
      {
        title: 'Teaching Assistant',
        company: 'University of Bristol',
        description: 'I was hired to teach the second year modules "Computer Systems B", and "Software Product Engineering"',
      },
    ],
  },
  {
    year: 2023,
    events: [
      {
        title: 'Graduation!',
        company: 'University of Bristol',
        description: 'In July, I graduated with a high first-class in computer science BSc.',
      },
      {
        title: 'Research Associate',
        company: 'Bristol Cyber Security Group',
        description: 'I work as a full-stack dev in the creation of tools for teaching security practises.',
      },
    ],
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
        {timelineData.map((year, index) => (
          <div className={classes.yearContainer} key={year.year}>
            <div
              className={classes.lineContainer}
              style={{
                height: animateLines ? '90%' : '0%',
              }}
              onTransitionEnd={handleLineTransitionEnd}
            >
              <span className={classes.yearLabel}>{year.year}</span>
            </div>

            <div className={classes.cardsContainer} style={{display: 'flex',flexDirection: 'column',}}>
                {year.events.map((event, eventIndex) => (
                    <div
                        className={classes.timelineCard}
                        style={{
                        opacity: animateCards ? 1 : 0,
                        transform: animateCards ? 'translateX(0)' : 'translateX(-20px)',
                        }}
                        key={eventIndex}
                    >
                        <Paper elevation={3} className={classes.paper} style={{ padding: '7px' }}>
                            <div style={{}}>
                                <h4 style={{ margin: '2px', fontSize: '17px'}}>{event.title}</h4>
                                <h5 style={{ margin: '0', fontSize: '14px' }}>{event.company}</h5>
                                <p style={{ fontSize: '12px', margin: '10px' }}>{event.description}</p>
                            </div>
                        </Paper>
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
