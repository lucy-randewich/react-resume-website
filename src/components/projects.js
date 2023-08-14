import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'flex',
    overflowX: 'hidden',
    scrollBehavior: 'smooth',
  },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    margin: '10px',
    minWidth: '300px',
    maxWidth: '400px',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.5rem',
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

const ProjectsPage = ({id}) => {
  const classes = useStyles();
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    setScrollPosition((prevPosition) => prevPosition - 400);
  };

  const scrollRight = () => {
    setScrollPosition((prevPosition) => prevPosition + 400);
  };

  const projects = [
    {
      id: 1,
      title: 'Project 1',
      image: 'image-url-1.jpg',
      text: 'Description of project 1...',
    },
    {
      id: 2,
      title: 'Project 2',
      image: 'image-url-2.jpg',
      text: 'Description of project 2...',
    },
    {
      id: 3,
      title: 'Project 3',
      image: 'image-url-2.jpg',
      text: 'Description of project 2...',
    },
    {
      id: 4,
      title: 'Project 4',
      image: 'image-url-2.jpg',
      text: 'Description of project 2...',
    },
  ];

  return (
    <section id={id} className="projects">
    <div className={classes.projectsPage}>
      <h3 className={classes.sectionTitle}>Examples of My Projects</h3>
      <div className={classes.cardContainer} style={{ transform: `translateX(${scrollPosition}px)` }}>
        {projects.map((project) => (
          <div key={project.id} className={classes.card}>
            <img src={project.image} alt={project.title} className={classes.image} />
            <h2 className={classes.title}>{project.title}</h2>
            <p className={classes.text}>{project.text}</p>
          </div>
        ))}
      </div>
      <div className={classes.scrollButton}>
        <ChevronLeftIcon onClick={scrollLeft} />
        <ChevronRightIcon onClick={scrollRight} />
      </div>
    </div>
    </section>
  );
};

export default ProjectsPage;
