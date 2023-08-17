import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CornellBox from '../images/Cornell_box.png';
import Cows from '../images/cows.png';
import ARMessaging from '../images/armessaging.png';
import DND from '../images/dnd.png';
import ML from '../images/ML.png';
import roverRoasts from '../images/roverRoasts.png'
import ThesisPaper from '../resources/Thesis.pdf';
import MLPaper from '../resources/cw_xm20246.pdf';


const useStyles = makeStyles((theme) => ({
  projectsPage: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '130vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sectionTitle: {
    // fontSize: '1.6rem',
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
    cursor: 'pointer',
  },
  cardDetailInfo: {
    position: 'relative',
    right: '0',
    height: '90%',
    width: '70%',
    background: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    zIndex: 1,
    '& ul': {
      textAlign: 'left',
      paddingLeft: '20px', 
    },
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
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
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

  const [clickedIndex, setClickedIndex] = useState(null);

  const handleCardClick = (index) => {
    setClickedIndex(index);
  };

  const handleCloseClick = () => {
    setClickedIndex(null);
  };

  const projects = [
    {
      id: 1,
      title: 'Cow Identification',
      image: Cows,
      text: 'My BSc thesis, "Deep metric learning for the visual identification of cattle using depth imagery"',
      longText: 'My BSc thesis was in the sphere of deep learning for agriculture, supervised by Dr. Tilo Burghardt. It achieved a high first-class of 77%, and is in the process of pubication. I created and optimised a deep neural network for the task of classifying individual cattle using depth imagery of their backs.',
      skills: ['python', 'PyTorch', 'dataset curation', 'data preparation', 'network architecture creation', 'neural network optimisation'],
      githubLink: 'https://github.com/lucy-randewich/cow-depth-identification.git',
      paperLink: ThesisPaper,
    },
    {
      id: 2,
      title: 'Ray Tracer',
      image: CornellBox,
      text: 'A graphics renderer developed from first principles using C++.',
      longText: 'I created a rendering engine to create realistic images and animations from geometry data. Rather than using graphics APIs (such as OpenGL or DirectX), I researched the fundamental principles and practices underneath such libraries. I implemented three modes: wireframed, rasterised, and ray-traced, as well as exploring different approaches to lighting and shadows.',
      skills: ['C++', 'linear algebra', 'coordinate geometry'],
      githubLink: 'https://github.com/lucy-randewich/graphics',
    },
    {
      id: 3,
      title: 'ML Method Analysis',
      image: ML,
      text: 'A report outlining benefits and drawbacks of various common Machine Learning techniques.',
      longText: 'This report was a final year university coursework, for which I was graded 80%. I used the California Housing and Fashion-MNIST datasets to assess the performance of various Machine Learning systems by implementing each and interpreting empirical results. Models included Kernel machines, Trees with Ensemble Methods, Hidden Markov Models, and more.',
      skills: ['python', 'result analysis'],
      githubLink: 'https://github.com/lucy-randewich/ML_coursework',
      paperLink: MLPaper,
    },
    {
      id: 4,
      title: 'IBM AR Messaging',
      image: ARMessaging,
      text: 'An Augmented Reality app with a novel method of messaging for IBM\'s academic initiative.',
      longText: 'SkyWrite is an Android app where a sender can send a message to a postcode. The message will appear in augmented reality 100ft above the ground. The app sends notifications to users when a message exists in a nearby postcode to them.',
      skills: ['Android development', 'Continuous Integration', 'Continuous Deployment', 'SpringBoot', 'IBMCloud', 'Kubernetes'],
      githubLink: 'https://github.com/spe-uob/2021-ARMessaging',
      websiteLink: 'https://sky-write.github.io',
    },
    {
      id: 5,
      title: 'Decisions and Disruptions',
      image: DND,
      text: 'A game teaching security principles for Bristol Cyber Security Group.',
      longText: 'I worked for the Bristol Cyber Security Group to create a game for teaching cyber security best practice with an emphasis on the consequences of insecure remote working. I created a back-end tool and GUI to be used in sessions facilitated by the Metropolitan police force.',
      skills: ['Java', 'SwingUI'],
      websiteLink: 'https://www.decisions-disruptions.org',
    },
    {
      id: 6,
      title: 'Web Development',
      image: roverRoasts,
      text: 'A collection of projects to practise designing and making websites.',
      longText: 'I started out making a resume website in pure html/css/javascript. Then, I challenged myself to design and create a website in React in under two hours, with no prior experience of the framework. This was a lot of fun and after the challenge I created this website using React which is now my portfolio site.',
      skills: ['React', 'JavaScript', 'Cloud hosting'],
      githubLink: '',
    },
  ];

  const selectedProject = projects[clickedIndex];

  return (
    <section id={id} className="projects">
      <div className={classes.projectsPage}>
        <h3 className={classes.sectionTitle}>Examples of My Projects</h3>
        <div className={classes.cardContainer}>

          {projects.map((project, index) => (
            <div
              key={index}
              className={classes.card}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(index)}
              style={{
                display: clickedIndex === null || clickedIndex === index ? 'block' : 'none',
                transform:
                  clickedIndex === index
                    ? 'translateY(-10px)'
                    : hoveredIndex === index
                    ? 'translateY(-5px)'
                    : hoveredIndex !== null
                    ? 'scale(0.985)'
                    : 'scale(1)',
                opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.7,
              }}
            >
              <img src={project.image} alt={project.title} className={classes.image} />
              <h2 className={classes.title}>{project.title}</h2>
              <p className={classes.text}>{project.text}</p>
            </div>
          ))}

          {clickedIndex !== null && (
            <div className={classes.cardDetailInfo}>
              <h2>{selectedProject.title}</h2>
              
              {projects[clickedIndex].githubLink && (
              <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
              )}
              
              {projects[clickedIndex].paperLink && (
                <a href={projects[clickedIndex].paperLink} target="_blank" rel="noopener noreferrer">Paper</a>
              )}

              {projects[clickedIndex].websiteLink && (
                <a href={projects[clickedIndex].websiteLink} target="_blank" rel="noopener noreferrer">Website</a>
              )}

              <p>{selectedProject.longText}</p>
              <h3>Skills:</h3>
              <ul>
                {selectedProject.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
              <div className={classes.closeButton} onClick={handleCloseClick}>X</div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
