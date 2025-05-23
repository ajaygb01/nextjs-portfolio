import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Sphere as DreiSphere } from '@react-three/drei'; // Removed OrbitControlsImpl type import
import { 
    Box, Typography, Button, Chip, Link as MuiLink, ThemeProvider, createTheme, CssBaseline, IconButton,
    Accordion, AccordionSummary, AccordionDetails, Paper, useMediaQuery // Added MUI components for mobile
} from '@mui/material';
// import { useTheme as useMuiTheme } from '@mui/material/styles'; // Renamed to avoid conflict with R3F useTheme - NO LONGER NEEDED
// Example Icons & Fallback Icons
import EmailIcon from '@mui/icons-material/Email'; 
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BusinessIcon from '@mui/icons-material/Business'; // For Experience section title

// Import formValues from modern-portfolio
import { formValues } from '../modern-portfolio'; 
import { FormValues, TechStack, Project, Experience, Contact, initialFormValues } from '@/app/state/initialState';
import GalaxyBackground from '@/app/component/3d-portfolio/GalaxyBackground';
import AstronautModel from '@/app/component/3d-portfolio/AstronautModel';
import OrbitingPlanet from '@/app/component/3d-portfolio/OrbitingPlanet';
import ThreeDExperience from '@/app/component/3d-portfolio/3DExperience';
import FloatingTextPanel from '@/app/component/3d-portfolio/FloatingTextPanel';
// ThemeToggleButton import removed
import ShootingStars from '@/app/component/3d-portfolio/ShootingStars'; // Import ShootingStars
import CommuComet from '@/app/component/3d-portfolio/CommuComet'; // Import CommuComet
import MoonSphere from '@/app/component/3d-portfolio/MoonSphere'; // Import MoonSphere
import * as THREE from 'three';

// CommuComet Component - REMOVED (now imported)
// MoonSphere Component - REMOVED (now imported)

const defaultCameraPosition = new THREE.Vector3(0, 2, 12);
const defaultCameraTarget = new THREE.Vector3(0, 0, 0);

// Define a single, permanent dark theme for the space aesthetic
const spaceDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4', // A spacey cyan/blue
    },
    secondary: {
      main: '#ff4081', // A vibrant pink for contrast
    },
    background: {
      default: '#00001a', // Very dark blue, almost black for space
      paper: '#1a1a2e', // Darker paper background for UI elements
    },
    text: {
      primary: '#e0e0e0', // Light grey for primary text, good readability
      secondary: '#b0b0b0', // Slightly darker grey for secondary text
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a2e', // Match paper for accordion background
          color: '#e0e0e0', // Ensure text is light
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c44', // Slightly lighter than paper for chips
          color: '#e0e0e0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: { // Example for contained buttons
          backgroundColor: '#00bcd4',
          color: '#000000', // Dark text on light cyan button
          '&:hover': {
            backgroundColor: '#00acc1',
          }
        },
        outlined: { // Example for outlined buttons
          borderColor: '#00bcd4',
          color: '#00bcd4',
        }
      }
    }
  }
});

const ThreeDPortfolioPage: React.FC = () => {
  const orbitControlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null!); // Used React.ComponentRef
  // darkMode state and toggle removed
  const audioRef = useRef<HTMLAudioElement>(null); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);

  // useMuiTheme and muiTheme removed, useMediaQuery will use theme from ThemeProvider context
  const mobileQuery = useMediaQuery(spaceDarkTheme.breakpoints.down('sm')); 

  useEffect(() => {
    setIsMobile(mobileQuery);
  }, [mobileQuery]);

  // R3F useThree hook must be called by a component inside Canvas.
  // So we create a small component for that.
  const InnerCanvasComponent: React.FC = () => {
    const camera = useThree(state => state.camera);
    useEffect(() => { 
      if (orbitControlsRef.current) {
        orbitControlsRef.current.target.copy(defaultCameraTarget);
        camera.position.copy(defaultCameraPosition);
        orbitControlsRef.current.update();
      }
    }, [camera]);

    useFrame(() => {
      if (orbitControlsRef.current) {
        const lerpFactor = 0.05;
        orbitControlsRef.current.target.lerp(cameraTargetPosition, lerpFactor);
        camera.position.lerp(cameraFocusPosition, lerpFactor);
        orbitControlsRef.current.update();
      }
    });
    return null; // This component does not render anything itself
  };


  const [showJavaTooltip, setShowJavaTooltip] = useState(false); 
  
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [panelPosition, setPanelPosition] = useState<THREE.Vector3>(new THREE.Vector3());
  const [panelTitle, setPanelTitle] = useState<string>("");
  const [panelContent, setPanelContent] = useState<React.ReactNode>(null);

  const [cameraTargetPosition, setCameraTargetPositionState] = useState<THREE.Vector3>(defaultCameraTarget.clone());
  const [cameraFocusPosition, setCameraFocusPositionState] = useState<THREE.Vector3>(defaultCameraPosition.clone());
  
  // currentTheme and toggleDarkMode removed

  // Memoize clearAllSelections with useCallback
  const clearAllSelections = React.useCallback(() => {
    setActivePanel(null);
    setCameraTargetPositionState(defaultCameraTarget.clone());
    setCameraFocusPositionState(defaultCameraPosition.clone());
  }, [setActivePanel, setCameraTargetPositionState, setCameraFocusPositionState]); // Add setters to deps, though they are stable

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') clearAllSelections();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [clearAllSelections]); // Added clearAllSelections to dependency array

  const handleSelection = (targetPosition: THREE.Vector3, focusOffset: THREE.Vector3 = new THREE.Vector3(0, 1, 3)) => {
    setCameraTargetPositionState(targetPosition.clone());
    setCameraFocusPositionState(targetPosition.clone().add(focusOffset));
  };

  const handleToggleBio = (position: THREE.Vector3) => {
    clearAllSelections();
    setPanelTitle(formValues.userInfo.name || "User Bio");
    setPanelContent(<Typography sx={{whiteSpace: 'pre-line'}}>{formValues.userInfo.bio || "No bio available."}</Typography>);
    setPanelPosition(position);
    setActivePanel("bio");
    handleSelection(position.clone().sub(new THREE.Vector3(0, 1.2, 0))); 
  };

  const handleTechPlanetClick = (event: ThreeEvent<MouseEvent>, techData: TechStack) => {
    event.stopPropagation();
    const currentTargetPos = event.object.getWorldPosition(new THREE.Vector3());
    clearAllSelections();
    setPanelTitle("Tech Skill");
    setPanelContent(<Typography>{`${techData.language}\n${techData.year} year${techData.year > 1 ? 's' : ''} exp.`}</Typography>);
    setPanelPosition(currentTargetPos.clone().add(new THREE.Vector3(0, 0.5, 0))); 
    setActivePanel("tech");
    handleSelection(currentTargetPos, new THREE.Vector3(0, 0.5, 2.5));
  };
  
  const handleProjectPlanetClick = (event: ThreeEvent<MouseEvent>, projectData: Project) => {
    event.stopPropagation();
    const currentTargetPos = event.object.getWorldPosition(new THREE.Vector3());
    clearAllSelections();
    setPanelTitle(projectData.name);
    setPanelContent(
      <>
        <Typography variant="body2" paragraph>{projectData.description}</Typography>
        {projectData.link && <Button variant="contained" href={projectData.link} target={projectData.link.startsWith('http')?'_blank':undefined} rel={projectData.link.startsWith('http')?'noopener noreferrer':undefined} size="small">{projectData.link.startsWith('http')?'Visit Project':'View Details'}</Button>}
      </>
    );
    setPanelPosition(currentTargetPos.clone().add(new THREE.Vector3(0, 0.7, 0))); 
    setActivePanel("project");
    handleSelection(currentTargetPos, new THREE.Vector3(0, 0.75, 3)); // Standardized offset
  };

  const handleExperienceNodeClick = (experienceData: Experience, position: THREE.Vector3) => {
    clearAllSelections();
    setPanelTitle(experienceData.position);
    setPanelContent(
      <>
        <Typography variant="subtitle1">{experienceData.company} - {experienceData.location}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{experienceData.from} – {experienceData.to}</Typography>
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {experienceData.keySkills.map(skill => <Chip key={skill} label={skill} size="small" />)}
        </Box>
      </>
    );
    setPanelPosition(position.clone().add(new THREE.Vector3(0, 0.5, 0)));
    setActivePanel("experience");
    handleSelection(position.clone(), new THREE.Vector3(0, 0.5, 4));
  };

  const handleCometClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const cometPos = new THREE.Vector3();
    event.object.getWorldPosition(cometPos); 
    clearAllSelections();
    setPanelTitle("Connect with Me");
    setPanelContent(
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
        {formValues.contact.map((contactItem) => (
          <MuiLink key={contactItem.app} href={contactItem.link} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            {contactItem.icon && React.cloneElement(contactItem.icon as React.ReactElement<any>, { sx: { mr: 1 }})}
            <Typography variant="body1">{contactItem.app}</Typography>
          </MuiLink>
        ))}
      </Box>
    );
    setPanelPosition(cometPos.clone().add(new THREE.Vector3(0, 0.6, 0)));
    setActivePanel("contact");
    handleSelection(cometPos, new THREE.Vector3(0, 0.75, 3)); // Standardized offset
  };
  
  const contactCometFixedPosition = new THREE.Vector3(0, 2.5, 0);

  const handleMoonClick = async (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    clearAllSelections();
    
    let joke = "Couldn't fetch a joke, the universe is silent... for now.";
    try {
      const response = await fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        const data = await response.json();
        joke = data.joke;
      }
    } catch (error) {
      console.error("Failed to fetch dad joke:", error);
    }

    const moonPosition = new THREE.Vector3();
    event.object.getWorldPosition(moonPosition);

    setPanelTitle("Dad Joke Incoming!");
    setPanelContent(<Typography>{joke}</Typography>);
    setPanelPosition(moonPosition.clone().add(new THREE.Vector3(0, 0.5, 0))); 
    setActivePanel("dadJoke");
    handleSelection(moonPosition, new THREE.Vector3(0, 0.5, 2.5)); 
  };

  const renderMobileView = () => (
    // sx props will now use spaceDarkTheme from ThemeProvider context
    <Box sx={{ p: 2, height: '100vh', overflowY: 'auto', bgcolor: 'background.default', color: 'text.primary' }}>
      <Typography variant="h4" gutterBottom align="center">
        {formValues.userInfo.name || "User"}&apos;s Portfolio Universe (2D Map)
      </Typography>

      <Accordion> {/* Accordion styles will be picked from theme components if defined, or default dark */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccountCircleIcon sx={{ mr: 1 }} /> <Typography>About Me</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{whiteSpace: 'pre-line'}}>{formValues.userInfo.bio}</Typography>
        </AccordionDetails>
      </Accordion>

      {formValues.isTechStack && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CodeIcon sx={{ mr: 1 }} /> <Typography>Tech Stack</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {formValues.techStack.map((tech, i) => (
              <Chip key={i} label={`${tech.language} (${tech.year} yrs)`} sx={{ m: 0.5 }} /> // Chip styles from theme
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {formValues.isProject && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <WorkIcon sx={{ mr: 1 }} /> <Typography>Projects</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {formValues.projects.map((project, i) => (
              <Paper key={i} sx={{ p: 1.5, mb: 1.5, bgcolor: 'background.paper' }}> {/* Uses theme's paper bg */}
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2" paragraph>{project.description}</Typography>
                {project.link && <Button variant="outlined" size="small" href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined}>View</Button>}
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {formValues.isExperience && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <BusinessIcon sx={{ mr: 1 }} /> <Typography>Experience</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {formValues.experience.map((exp, i) => (
              <Paper key={i} sx={{ p: 1.5, mb: 1.5, bgcolor: 'background.paper' }}> {/* Uses theme's paper bg */}
                <Typography variant="h6">{exp.position} at {exp.company}</Typography>
                <Typography variant="subtitle2">{exp.location} ({exp.from} - {exp.to})</Typography>
                <Box sx={{ mt: 1 }}>{exp.keySkills.map(skill => <Chip key={skill} label={skill} size="small" sx={{ m: 0.5 }} />)}</Box>
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {formValues.isContact && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ContactMailIcon sx={{ mr: 1 }} /> <Typography>Contact</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {formValues.contact.map((item, i) => (
              <MuiLink key={i} href={item.link} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', mb: 1 }}>
                {item.icon && React.cloneElement(item.icon as React.ReactElement<any>, { sx: { mr: 1 }})}
                <Typography variant="body1">{item.app}</Typography>
              </MuiLink>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );

  return (
    <ThemeProvider theme={spaceDarkTheme}> {/* Always use spaceDarkTheme */}
      <CssBaseline />
      {/* ThemeToggleButton removed */}
      <IconButton
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16, // Adjusted as ThemeToggleButton is removed
          zIndex: 1500, 
          // Colors will be inherited from spaceDarkTheme or can be explicitly set if needed
          // For example, using primary text color and paper background from the theme:
          color: 'text.primary', 
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'action.hover', // This uses theme's action color
          },
        }}
        aria-label="toggle music"
      >
        {isMusicPlaying ? <MusicOffIcon /> : <MusicNoteIcon />}
      </IconButton>
      <audio ref={audioRef} src="https://www.soundjay.com/ambient/sounds/dream-journey-01.mp3" loop style={{ display: 'none' }} />
      
      {isMobile ? renderMobileView() : (
        <Canvas style={{ height: '100vh', width: '100vw', background: 'black' }} camera={{ fov: 75 }}>
          <InnerCanvasComponent /> {/* For R3F hooks */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <GalaxyBackground />
          <ShootingStars /> {/* Add ShootingStars component here */}
          <OrbitControls ref={orbitControlsRef} enableDamping dampingFactor={0.05} />
          <Suspense fallback={null}>
            <AstronautModel 
              name={formValues.userInfo.name || "Astronaut"} 
              onToggleBio={handleToggleBio} 
            />
            
            {formValues.isTechStack && formValues.techStack.map((tech, index) => (
              <OrbitingPlanet
                key={`tech-${index}`} size={0.3} orbitRadius={3 + index * 0.6}
                initialAngle={index * (Math.PI * 2 / formValues.techStack.length)}
                color={tech.language === 'Java' ? 'orange' : 'lightblue'}
                onClick={(event) => handleTechPlanetClick(event, tech)}
                onPointerOver={tech.language === 'Java' ? () => setShowJavaTooltip(true) : undefined}
                onPointerOut={tech.language === 'Java' ? () => setShowJavaTooltip(false) : undefined}
              >
                {tech.language === 'Java' && showJavaTooltip && !activePanel && (
                   <Text position={[0,0.4,0]} color="orange" fontSize={0.1} outlineWidth={0.005} outlineColor="black">Still better than PHP</Text>
                )}
              </OrbitingPlanet>
            ))}
            
            {formValues.isProject && formValues.projects.map((project, index) => (
              <OrbitingPlanet
                key={`project-${index}`} size={0.5} orbitRadius={6 + index * 0.7}
                initialAngle={index * (Math.PI * 2 / formValues.projects.length)}
                color="lightgreen"
                onClick={(event) => handleProjectPlanetClick(event, project)}
              />
            ))}

            {formValues.isExperience && formValues.experience.length > 0 && (
              <ThreeDExperience experiences={formValues.experience} onExperienceNodeClick={handleExperienceNodeClick} />
            )}

            {formValues.isContact && (
              <CommuComet onClick={handleCometClick} position={[contactCometFixedPosition.x, contactCometFixedPosition.y, contactCometFixedPosition.z]} />
            )}

            {/* Dad Joke Moon */}
          <MoonSphere onClick={handleMoonClick} position={[5,2,-5]} />

            <FloatingTextPanel
              title={panelTitle}
              content={panelContent}
              position={panelPosition}
              isVisible={!!activePanel}
              onClose={clearAllSelections}
            />
            
          </Suspense>
        </Canvas>
      )}
    </ThemeProvider>
  );
};

export default ThreeDPortfolioPage;
