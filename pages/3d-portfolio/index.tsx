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
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; // For sound effects toggle
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; // For sound effects toggle
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BusinessIcon from '@mui/icons-material/Business'; // For Experience section title
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'; // For Dad Joke Moon

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
import ErrorBoundary from '@/app/component/3d-portfolio/ErrorBoundary'; // Import ErrorBoundary
import WormholeEffect from '@/app/component/3d-portfolio/WormholeEffect'; // Import WormholeEffect
import InteractiveBlackHole from '@/app/component/3d-portfolio/InteractiveBlackHole'; // Import Black Hole
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
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(true); // State for sound effects
  const [isMobile, setIsMobile] = useState(false);
  const [showWormholeEffect, setShowWormholeEffect] = useState(true); // State for wormhole
  const [isBlackHoleSequenceActive, setIsBlackHoleSequenceActive] = useState(false); // State for black hole

  // useMuiTheme and muiTheme removed, useMediaQuery will use theme from ThemeProvider context
  const mobileQuery = useMediaQuery(spaceDarkTheme.breakpoints.down('sm')); 

  useEffect(() => {
    setIsMobile(mobileQuery);
  }, [mobileQuery]);

  // R3F useThree hook must be called by a component inside Canvas.
  // So we create a small component for that.
  const InnerCanvasComponent: React.FC = () => {
    const { camera } = useThree(); // Destructure to get camera

    // Effect for initializing camera & controls target ONCE when component mounts or camera/controls are ready.
    useEffect(() => {
      if (orbitControlsRef.current) {
        console.log("InnerCanvasComponent: Initializing camera position and OrbitControls target.");
        // Set initial camera position only if it's not already there.
        if (!camera.position.equals(defaultCameraPosition)) {
          camera.position.copy(defaultCameraPosition);
        }
        // Set initial OrbitControls target only if it's not already there.
        if (!orbitControlsRef.current.target.equals(defaultCameraTarget)) {
          orbitControlsRef.current.target.copy(defaultCameraTarget);
        }
        // Important: call update after manually setting position or target,
        // especially if enableDamping is true, to make sure controls state is correct.
        orbitControlsRef.current.update(); 
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [camera]); // Intentionally run only when camera instance changes (effectively on mount)

    useFrame(() => {
      if (orbitControlsRef.current) {
        const lerpFactor = 0.05; // Adjust for desired smoothness of programmatic camera movements

        let needsUpdate = false;

        // Smoothly interpolate the OrbitControls target towards cameraTargetPosition
        if (!orbitControlsRef.current.target.equals(cameraTargetPosition)) {
          orbitControlsRef.current.target.lerp(cameraTargetPosition, lerpFactor);
          needsUpdate = true;
        }

        // Smoothly interpolate the camera's actual position towards cameraFocusPosition
        if (!camera.position.equals(cameraFocusPosition)) {
          camera.position.lerp(cameraFocusPosition, lerpFactor);
          needsUpdate = true;
        }
        
        // If damping is enabled (which it is), .update() must be called each frame for damping to work.
        // It also applies the lerping changes made above.
        // Call update only if changes were made or if damping needs it.
        // OrbitControls internally handles its own update loop for damping if no programmatic changes are made.
        // However, since we are programmatically changing target and position, we should call update.
        if (needsUpdate || orbitControlsRef.current.enableDamping) {
          orbitControlsRef.current.update();
        }
      }
    });
    return null; // This component does not render anything itself
  };


  const [showJavaTooltip, setShowJavaTooltip] = useState(false); 
  
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [panelPosition, setPanelPosition] = useState<THREE.Vector3>(new THREE.Vector3());
  const [panelTitle, setPanelTitle] = useState<string>("");
  const [panelContent, setPanelContent] = useState<React.ReactNode>(null);
  const [panelIcon, setPanelIcon] = useState<React.ReactElement | null>(null); // State for panel icon

  // Initialize state with a function to ensure .clone() is called only once lazily
  const [cameraTargetPosition, setCameraTargetPositionState] = useState<THREE.Vector3>(() => defaultCameraTarget.clone());
  const [cameraFocusPosition, setCameraFocusPositionState] = useState<THREE.Vector3>(() => defaultCameraPosition.clone());
  
  // Sound effect helper
  const playSound = React.useCallback((soundFile: string, volume: number = 0.4) => {
    if (!isSoundEffectsEnabled) return;
    try {
      const audio = new Audio(`/sounds/${soundFile}`); // Assuming sounds are in public/sounds
      audio.volume = volume;
      audio.play().catch(error => console.warn(`Sound play failed: ${soundFile}`, error));
    } catch (error) {
      console.warn(`Error playing sound ${soundFile}:`, error);
    }
  }, [isSoundEffectsEnabled]);

  // currentTheme and toggleDarkMode removed

  // Memoize clearAllSelections with useCallback
  const clearAllSelections = React.useCallback(() => {
    console.log("clearAllSelections called"); // Logging
    const wasPanelActive = !!activePanel && !!panelTitle; // Check if a panel was truly active
    
    setActivePanel(null); // This will hide the panel
    setPanelTitle(""); // Clear panel title
    setPanelIcon(null); // Clear panel icon
    // Reset camera target and focus positions to defaults
    setCameraTargetPositionState(defaultCameraTarget.clone()); 
    setCameraFocusPositionState(defaultCameraPosition.clone());

    if (wasPanelActive) {
      playSound('panel_close.mp3');
    }
    playSound('reset.mp3', 0.3);

  }, [setActivePanel, setCameraTargetPositionState, setCameraFocusPositionState, setPanelTitle, setPanelIcon, playSound, activePanel, panelTitle]);

  useEffect(() => {
    // Log when activePanel changes, which indicates FloatingTextPanel visibility change
    if (activePanel && panelTitle) { // Ensure panelTitle is also set, indicating a real panel opening
      console.log(`FloatingTextPanel became visible. Active Panel: ${activePanel}, Title: "${panelTitle}"`);
      playSound('panel_open.mp3');
    } else {
      // Log when panel is closed. Check panelTitle to ensure it was actually active.
      if (panelTitle) { // If panelTitle was set, it means a panel was active and is now closing.
         console.log(`FloatingTextPanel closed. Was displaying: "${panelTitle}"`);
         // panel_close sound is handled by clearAllSelections
      } else if (activePanel === null) {
        // console.log("FloatingTextPanel state cleared (no specific panel was active or title already cleared).");
      }
    }
  }, [activePanel, panelTitle, playSound]);

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
    console.log("handleSelection called with target:", targetPosition, "and offset:", focusOffset); // Logging
    setCameraTargetPositionState(targetPosition.clone());
    setCameraFocusPositionState(targetPosition.clone().add(focusOffset));
    playSound('focus.mp3', 0.2);
  };

  const handleToggleBio = (position: THREE.Vector3) => {
    console.log("handleToggleBio called for Astronaut at position:", position); // Logging
    clearAllSelections(); 
    playSound('click_general.mp3');
    setPanelTitle(formValues.userInfo.name || "User Bio");
    setPanelIcon(<AccountCircleIcon />);
    setPanelContent(<Typography sx={{whiteSpace: 'pre-line'}}>{formValues.userInfo.bio || "No bio available."}</Typography>);
    setPanelPosition(position);
    setActivePanel("bio");
    handleSelection(position.clone().sub(new THREE.Vector3(0, 1.2, 0))); 
  };

  const handleTechPlanetClick = (event: ThreeEvent<MouseEvent>, techData: TechStack) => {
    event.stopPropagation();
    const currentTargetPos = event.object.getWorldPosition(new THREE.Vector3());
    console.log("handleTechPlanetClick called for:", techData.language, "at position:", currentTargetPos); // Logging
    clearAllSelections(); 
    playSound('click_general.mp3');
    setPanelTitle("Tech Skill: " + techData.language); 
    setPanelIcon(<CodeIcon />);
    setPanelContent(<Typography>{`${techData.language}\n${techData.year} year${techData.year > 1 ? 's' : ''} exp.`}</Typography>);
    setPanelPosition(currentTargetPos.clone().add(new THREE.Vector3(0, 0.5, 0))); 
    setActivePanel("tech");
    handleSelection(currentTargetPos, new THREE.Vector3(0, 0.5, 2.5));
  };
  
  const handleProjectPlanetClick = (event: ThreeEvent<MouseEvent>, projectData: Project) => {
    event.stopPropagation();
    const currentTargetPos = event.object.getWorldPosition(new THREE.Vector3());
    console.log("handleProjectPlanetClick called for:", projectData.name, "at position:", currentTargetPos); // Logging
    clearAllSelections(); 
    playSound('click_general.mp3');
    setPanelTitle("Project: " + projectData.name); 
    setPanelIcon(<WorkIcon />);
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
    console.log("handleExperienceNodeClick called for:", experienceData.position, "at company:", experienceData.company, "at position:", position); // Logging
    clearAllSelections(); 
    playSound('click_general.mp3');
    setPanelTitle("Experience: " + experienceData.position); 
    setPanelIcon(<BusinessIcon />);
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
    console.log("handleCometClick called at position:", cometPos); // Logging
    clearAllSelections(); 
    playSound('click_general.mp3');
    setPanelTitle("Connect with Me"); 
    setPanelIcon(<ContactMailIcon />);
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
  const blackHolePosition = new THREE.Vector3(-8, 2, -5); // Example position for the black hole

  const handleMoonClick = async (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const moonPosition = new THREE.Vector3();
    event.object.getWorldPosition(moonPosition);
    console.log("handleMoonClick called at position:", moonPosition); // Logging
    clearAllSelections(); 
    playSound('click_general.mp3');
    
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
    
    // Need to get moonPosition again if it was shadowed by the variable in try-catch
    // However, it's better to declare it once if its scope is intended to be broader.
    // For this case, it's fine as it is re-declared if needed or used from outer scope.
    // const currentMoonPos = event.object.getWorldPosition(new THREE.Vector3()); // If needed

    setPanelTitle("Dad Joke Incoming!");
    setPanelIcon(<SentimentSatisfiedAltIcon />);
    setPanelContent(<Typography>{joke}</Typography>);
    setPanelPosition(moonPosition.clone().add(new THREE.Vector3(0, 0.5, 0))); 
    setActivePanel("dadJoke");
    handleSelection(moonPosition, new THREE.Vector3(0, 0.5, 2.5)); 
  };

  const handleBlackHoleActivate = () => {
    console.log("handleBlackHoleActivate: Activating black hole sequence.");
    clearAllSelections(); // Clear any existing panels/selections
    playSound('blackhole_activate.mp3', 0.6);
    setIsBlackHoleSequenceActive(true);
    // OrbitControls will be disabled via its 'enabled' prop.
  };

  const handleBlackHoleAnimationComplete = () => {
    console.log("handleBlackHoleAnimationComplete: Black hole animation complete. Resetting view.");
    // Sound for passage might be better handled inside the component itself if timed with visuals
    setIsBlackHoleSequenceActive(false);
    clearAllSelections(); // Resets camera to default overview and plays reset sound
    // OrbitControls will be re-enabled via its 'enabled' prop.
  };

  const renderMobileView = () => (
    // sx props will now use spaceDarkTheme from ThemeProvider context
    <Box sx={{ p: { xs: 2, sm: 3 }, height: '100vh', overflowY: 'auto', bgcolor: 'background.default', color: 'text.primary' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 3 }}> 
        {formValues.userInfo.name || "User"}&apos;s Portfolio (2D Map)
      </Typography>

      <Accordion defaultExpanded> {/* Keep About Me open by default */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccountCircleIcon sx={{ mr: 1.5 }} /> <Typography variant="h6">About Me</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: 1.6 }}>{formValues.userInfo.bio}</Typography>
        </AccordionDetails>
      </Accordion>

      {formValues.isTechStack && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <CodeIcon sx={{ mr: 1.5 }} /> <Typography variant="h6">Tech Stack</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {formValues.techStack.map((tech, i) => (
              <Chip 
                key={i} 
                label={`${tech.language} (${tech.year} yr${tech.year > 1 ? 's' : ''})`} 
                // sx={{ m: 0.5 }} // Using gap in parent now
              /> 
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {formValues.isProject && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <WorkIcon sx={{ mr: 1.5 }} /> <Typography variant="h6">Projects</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {formValues.projects.map((project, i) => (
              <Paper key={i} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: '8px' }}> 
                <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 0.5 }}>{project.name}</Typography>
                <Typography variant="body2" paragraph sx={{ fontSize: '0.9rem', lineHeight: 1.55, mb: 1.5 }}>{project.description}</Typography>
                {project.link && (
                  <Button 
                    variant="outlined" 
                    size="medium" // Increased size for better tappability
                    href={project.link} 
                    target={project.link.startsWith('http') ? '_blank' : undefined}
                    sx={{ mt: 1, alignSelf: 'flex-start' }} // Align button nicely
                  >
                    View
                  </Button>
                )}
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {formValues.isExperience && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <BusinessIcon sx={{ mr: 1.5 }} /> <Typography variant="h6">Experience</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {formValues.experience.map((exp, i) => (
              <Paper key={i} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: '8px' }}> 
                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{exp.position} at {exp.company}</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '0.95rem', color: 'text.secondary', mb: 0.5 }}>{exp.location} ({exp.from} - {exp.to})</Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {exp.keySkills.map(skill => <Chip key={skill} label={skill} size="small" />)}
                </Box>
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {formValues.isContact && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ContactMailIcon sx={{ mr: 1.5 }} /> <Typography variant="h6">Contact</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {formValues.contact.map((item, i) => (
              <MuiLink 
                key={i} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  textDecoration: 'none', 
                  color: 'primary.main', // Use theme's primary color for links
                  p: 0.5, // Add padding for better tap area
                  borderRadius: '4px',
                  '&:hover': {
                    textDecoration: 'underline',
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                {item.icon && React.cloneElement(item.icon as React.ReactElement<any>, { sx: { mr: 1.5 }})}
                <Typography variant="body1" sx={{ fontSize: '1rem' }}>{item.app}</Typography>
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
      {/* Sound Control Buttons */}
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1500, display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          sx={{
            color: 'text.primary', 
            backgroundColor: 'background.paper',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
          aria-label="toggle music"
        >
          {isMusicPlaying ? <MusicOffIcon /> : <MusicNoteIcon />}
        </IconButton>
        <IconButton
          onClick={() => setIsSoundEffectsEnabled(!isSoundEffectsEnabled)}
          sx={{
            color: 'text.primary', 
            backgroundColor: 'background.paper',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
          aria-label="toggle sound effects"
        >
          {isSoundEffectsEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </Box>
      
      <audio ref={audioRef} src="https://www.soundjay.com/ambient/sounds/dream-journey-01.mp3" loop style={{ display: 'none' }} />
      
      {isMobile ? renderMobileView() : (
        // ErrorBoundary should ideally wrap only the main scene, not the wormhole,
        // so if the main scene fails, wormhole could still potentially exit or show a message.
        // However, for simplicity, wrapping the canvas means if R3F itself fails, it's caught.
        <ErrorBoundary fallbackMessage="Oops! The 3D universe hit an asteroid. Try refreshing.">
          <Canvas style={{ height: '100vh', width: '100vw', background: 'black' }} camera={{ fov: 75 }} invalidateFrameloop={showWormholeEffect}>
            {showWormholeEffect ? (
              <WormholeEffect 
                onAnimationComplete={() => {
                  setShowWormholeEffect(false);
                  // playSound('wormhole_exit.mp3', 0.5); // Exit sound is now handled inside WormholeEffect
                }} 
                isSoundEffectsEnabled={isSoundEffectsEnabled}
                playSound={playSound}
              />
            ) : (
              <>
                <InnerCanvasComponent /> {/* For R3F hooks like camera reset and lerping */}
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <GalaxyBackground />
                <ShootingStars />
                <OrbitControls
                  ref={orbitControlsRef}
                  enableDamping
                  dampingFactor={0.05}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI - Math.PI / 6}
                  minDistance={2}
                  maxDistance={25}
                  enabled={!showWormholeEffect && !isBlackHoleSequenceActive} // Disable controls
                />
                {!isBlackHoleSequenceActive && ( // Conditionally render main scene if BH is not active
                  <Suspense fallback={null}> {/* Main scene content */}
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
                icon={panelIcon} // Pass the icon
                position={panelPosition}
                  isVisible={!!activePanel}
                  onClose={() => {
                    console.log("FloatingTextPanel onClose triggered -> calling clearAllSelections"); // Logging
                    clearAllSelections();
                  }}
                />
                  </Suspense> 
                )}
                {/* InteractiveBlackHole is rendered outside the conditional main scene rendering, so it's always there unless wormhole is active */}
                <InteractiveBlackHole
                  position={blackHolePosition.toArray() as [number, number, number]}
                  isActive={isBlackHoleSequenceActive}
                  onActivate={handleBlackHoleActivate}
                  onAnimationComplete={handleBlackHoleAnimationComplete}
                  isSoundEffectsEnabled={isSoundEffectsEnabled}
                  playSound={playSound}
                />
              </>
            )}
          </Canvas>
        </ErrorBoundary>
      )}
    </ThemeProvider>
  );
};

export default ThreeDPortfolioPage;
