import React from 'react';
import { makeStyles } from '@mui/styles';
import CornellBox from '../images/Cornell_box.png';
import Cows from '../images/cows.png'
import ARMessaging from '../images/armessaging.png'
import ML from '../images/ML.png'

const useStyles = makeStyles((theme) => ({
  projectsPage: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    paddingLeft: '100px',
    width: "100%",
  },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    margin: '10px',
    minWidth: '300px',
    maxWidth: '300px',
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
          {projects.map((project) => (
            <div key={project.id} className={classes.card}>
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
