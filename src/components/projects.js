import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CornellBox from '../images/Cornell_box.png';
import Cows from '../images/cows.png';
import ARMessaging from '../images/armessaging.png';
import ML from '../images/ML.png';

const useStyles = makeStyles((theme) => ({
  projectsPage: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '105vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  cardContainer: {
    display: 'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    marginLeft: '100px',
    marginRight: '100px',
    width: '86%',
    marginBottom: '60px',
    backgroundColor: 'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
  },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    margin: '10px',
    minWidth: '300px',
    maxWidth: '300px',
    transition: 'transform 0.3s, opacity 0.3s',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  text: {
    fontSize: '1rem',
  },
  scrollButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    cursor: 'pointer',
  },
}));

const ProjectsPage = ({ id }) => {
  const classes = useStyles();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const projects = [
    {
      id: 1,
      title: 'Deep Learning',
      image: Cows,
      text: 'My BSc thesis, "Deep metric learning for the visual identification of cattle using depth imagery"',
    },
    {
      id: 2,
      title: 'Ray Tracer',
      image: CornellBox,
      text: 'I developed a graphics renderer from first principles using C++.',
    },
    {
      id: 3,
      title: 'ML Method Analysis',
      image: ML,
      text: 'A report outlining benefits and drawbacks of various common Machine Learning techniques.',
    },
    {
      id: 4,
      title: 'IBM AR Messaging',
      image: ARMessaging,
      text: 'An Augmented Reality app with a novel method of messaging for IBM\'s academic initiative.',
    },
    {
      id: 5,
      title: 'IBM AR Messaging',
      image: ARMessaging,
      text: 'An Augmented Reality app with a novel method of messaging for IBM\'s academic initiative.',
    },
  ];

  return (
    <section id={id} className="projects">
      <div className={classes.projectsPage}>
        <h3 className={classes.sectionTitle}>Examples of My Projects</h3>
        <div className={classes.cardContainer}>
        <div className={classes.overlay}></div>
          {projects.map((project, index) => (
            <div
              key={index}
              className={classes.card}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform:
                  hoveredIndex === index
                    ? 'translateY(-10px)'
                    : hoveredIndex !== null
                    ? 'scale(0.96)'
                    : 'scale(1)',
                opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.7,
              }}
            >
              <img src={project.image} alt={project.title} className={classes.image} />
              <h2 className={classes.title}>{project.title}</h2>
              <p className={classes.text}>{project.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
