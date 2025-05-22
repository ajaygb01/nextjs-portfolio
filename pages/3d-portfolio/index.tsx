import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Sphere as DreiSphere } from '@react-three/drei';
import { 
    Box, Typography, Button, Chip, Link as MuiLink, ThemeProvider, createTheme, CssBaseline, IconButton,
    Accordion, AccordionSummary, AccordionDetails, Paper, useMediaQuery // Added MUI components for mobile
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles'; // Renamed to avoid conflict with R3F useTheme
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


import { FormValues, TechStack, Project, Experience, Contact, initialFormValues } from '@/app/state/initialState';
import GalaxyBackground from '@/app/component/3d-portfolio/GalaxyBackground';
import AstronautModel from '@/app/component/3d-portfolio/AstronautModel';
import OrbitingPlanet from '@/app/component/3d-portfolio/OrbitingPlanet';
import ThreeDExperience from '@/app/component/3d-portfolio/3DExperience';
import FloatingTextPanel from '@/app/component/3d-portfolio/FloatingTextPanel';
import ThemeToggleButton from '@/app/component/3d-portfolio/ThemeToggleButton';
import * as THREE from 'three';

// CommuComet Component
const CommuComet: React.FC<{ onClick: (event: ThreeEvent<MouseEvent>) => void, position: [number, number, number] }> = ({ onClick, position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const initialEmissiveIntensity = 0.7;

  useFrame(({ clock }) => {
    if(meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.2; // Bobbing
      
      // Scale and emissive hover effect
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        const targetIntensity = hovered ? initialEmissiveIntensity * 2 : initialEmissiveIntensity; // Brighter on hover
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.1);
      }
    }
  });

  return (
    <DreiSphere 
      ref={meshRef} 
      args={[0.4, 32, 32]} 
      position={position} 
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={initialEmissiveIntensity} />
    </DreiSphere>
  );
};

// MoonSphere Component (New component for the Dad Joke Moon with hover effects)
const MoonSphere: React.FC<{ onClick: (event: ThreeEvent<MouseEvent>) => void, position: [number, number, number] }> = ({ onClick, position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const initialColor = useRef(new THREE.Color('lightgray'));

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        const targetEmissive = hovered ? initialColor.current.clone().multiplyScalar(0.2) : new THREE.Color(0x000000); // Slight glow on hover
        material.emissive.lerp(targetEmissive, 0.1);
      }
    }
  });

  return (
    <DreiSphere // Using DreiSphere alias for consistency if preferred, or just Sphere
      ref={meshRef}
      args={[0.3, 32, 32]}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <meshStandardMaterial color={initialColor.current} />
    </DreiSphere>
  );
};

const defaultCameraPosition = new THREE.Vector3(0, 2, 12);
const defaultCameraTarget = new THREE.Vector3(0, 0, 0);

const formValues: FormValues = { 
  ...initialFormValues,
  userInfo: { name: 'Space Explorer', title: 'Frontend Astronaut', bio: 'Loves to explore the web.\nBuilds amazing user experiences.\nAcross the digital galaxy.' },
  isTechStack: true, techStack: [{ language: 'JS', year: 5 }, {language: 'Java', year: 1}],
  isProject: true, projects: [{ name: 'P1', description: 'A very cool project that does a lot of things. It is built with modern technologies and aims to solve a real-world problem effectively.', link: 'https://example.com', public: true }, { name: 'P2', description: 'Another interesting project.', link: '/internal-page', public: false }],
  isExperience: true, experience: [{ from: '2022', to: 'Now', company: 'Stark Industries', position: 'Lead Developer', location: 'New York, NY', keySkills: ['React', 'Next.js', 'TypeScript'] }, { from: '2020', to: '2022', company: 'Wayne Enterprises', position: 'Software Engineer', location: 'Gotham City', keySkills: ['Python', 'Django', 'REST APIs'] }],
  isContact: true, contact: [
    { app: 'LinkedIn', link: 'https://www.linkedin.com/in/johndoe', icon: <LinkedInIcon /> },
    { app: 'Email', link: 'mailto:john.doe@example.com', icon: <EmailIcon /> },
    { app: 'GitHub', link: 'https://github.com/johndoe', icon: <GitHubIcon /> },
  ],
};

// Define themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#ffffff', 
    },
    text: {
      primary: '#000000', 
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#424242', 
    },
    text: {
      primary: '#ffffff',
    },
  },
});


const ThreeDPortfolioPage: React.FC = () => {
  const orbitControlsRef = useRef<any>(null); // Added null as initial value
  const [darkMode, setDarkMode] = useState(true); 
  const audioRef = useRef<HTMLAudioElement>(null); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);

  const muiTheme = useMuiTheme(); // For breakpoints
  const mobileQuery = useMediaQuery(muiTheme.breakpoints.down('sm'));

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
  
  const currentTheme = darkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
    handleSelection(currentTargetPos);
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
    handleSelection(cometPos); 
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
    <Box sx={{ p: 2, height: '100vh', overflowY: 'auto', bgcolor: currentTheme.palette.background.default, color: currentTheme.palette.text.primary }}>
      <Typography variant="h4" gutterBottom align="center">
        Ajay GB&apos;s Portfolio Universe (2D Map)
      </Typography>

      <Accordion>
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
              <Chip key={i} label={`${tech.language} (${tech.year} yrs)`} sx={{ m: 0.5 }} />
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
              <Paper key={i} sx={{ p: 1.5, mb: 1.5, bgcolor: currentTheme.palette.background.paper }}>
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
              <Paper key={i} sx={{ p: 1.5, mb: 1.5, bgcolor: currentTheme.palette.background.paper }}>
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
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {/* Render UI controls outside the conditional rendering of Canvas vs Mobile view if they should be shared */}
      <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <IconButton
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16 + 48, 
          zIndex: 1500, 
          color: currentTheme.palette.text.primary,
          backgroundColor: currentTheme.palette.background.paper,
          '&:hover': {
            backgroundColor: currentTheme.palette.action.hover,
          },
        }}
        aria-label="toggle music"
      >
        {isMusicPlaying ? <MusicOffIcon /> : <MusicNoteIcon />}
      </IconButton>
      <audio ref={audioRef} src="https_files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Buckley/Ambient_Volume_1/Scott_Buckley_-_Machina.mp3" loop style={{ display: 'none' }} />
      
      {isMobile ? renderMobileView() : (
        <Canvas style={{ height: '100vh', width: '100vw', background: 'black' }} camera={{ fov: 75 }}>
          <InnerCanvasComponent /> {/* For R3F hooks */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <GalaxyBackground />
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
