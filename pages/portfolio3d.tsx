import { Canvas, useFrame } from '@react-three/fiber'; // Added useFrame
import { OrbitControls, Text, Box, Sphere, Plane, Cylinder, Stars } from '@react-three/drei'; // Added Stars
import * as THREE from 'three';
import { useState, useRef, useMemo } from 'react'; // Added useRef, useMemo
import { useSpring, animated } from '@react-spring/three'; // Added react-spring
import { initialFormValues } from '@/app/state/initialState';
import type { UserInfo, Experience, Project, TechStack, Contact } from '@/app/state/initialState'; // Added Contact

// Scene layout:
// - Central area: Hero section (name, title, bio) - Potentially represented by a central 3D text or model.
// - Left of center: Experience timeline (interactive 3D objects representing past roles/projects). User might click to expand.
// - Right of center: Projects grid (clickable 3D cards or representations of projects). Hovering could show previews.
// - Background/Skybox: Skills cloud (animated skill icons or text forming a dynamic backdrop).
// - Floor/Base: Contact information (interactive elements, perhaps 3D icons for email, LinkedIn, GitHub).

interface HeroSection3DProps {
  name: string;
  title: string;
  bio: string;
}

const AnimatedText = animated(Text); // Create an animated version of Text

const HeroSection3D = ({ name, title, bio }: HeroSection3DProps) => {
  const { opacity, yPos } = useSpring({
    from: { opacity: 0, yPos: -1 }, // Start from invisible and slightly below
    to: { opacity: 1, yPos: 0 },    // End at visible and original position
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200, // Optional delay for the animation to start
  });

  return (
    <>
      <AnimatedText
        position-y={yPos.to(y => 0.6 + y)} // Apply animated yPos to base position
        position-x={0}
        position-z={0}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-opacity={opacity} // Apply animated opacity
      >
        {name || "Your Name"}
      </AnimatedText>
      <AnimatedText
        position-y={yPos.to(y => 0 + y)}
        position-x={0}
        position-z={0}
        fontSize={0.3}
        color="lightblue"
        anchorX="center"
        anchorY="middle"
        material-opacity={opacity}
      >
        {title || "Software Developer"}
      </AnimatedText>
      <AnimatedText
        position-y={yPos.to(y => -0.6 + y)}
        position-x={0}
        position-z={0}
        fontSize={0.2}
        color="gray"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
        material-opacity={opacity}
      >
        {bio || "A passionate developer creating amazing things."}
      </AnimatedText>
    </>
  );
};

interface ExperienceSection3DProps {
  experiences: Experience[];
}

// Individual Experience Item Component for hover state management
const ExperienceItem = ({ exp, index }: { exp: Experience, index: number }) => {
  const [hovered, setHover] = useState(false);
  const itemBaseX = -2.5;
  const itemOffsetY = 0.8;
  const boxSize: [number, number, number] = [0.4, 0.4, 0.4];
  const textColor = "white";
  const textLineHeight = 0.12;
  const textFontSize = 0.1;
  const yPos = 0.5 - (index * itemOffsetY);
  const originalColor = exp.company ? (index % 2 === 0 ? 'skyblue' : 'lightgreen') : 'grey';
  const hoverColor = 'yellow'; // Example hover color

  return (
    <group
      position={[itemBaseX, yPos, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
    >
      <Box args={boxSize} position={[0, 0, 0]} scale={hovered ? 1.1 : 1} castShadow receiveShadow>
        <meshStandardMaterial color={hovered ? hoverColor : originalColor} />
      </Box>
      <Text
        position={[boxSize[0] + 0.05, textLineHeight, 0]}
        fontSize={textFontSize}
        color={textColor}
        anchorX="left"
        anchorY="middle"
        maxWidth={1.5}
      >
        {exp.position || "Position Title"}
      </Text>
      <Text
        position={[boxSize[0] + 0.05, -textLineHeight / 2, 0]}
        fontSize={textFontSize * 0.9}
        color="lightgray"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.5}
      >
        {exp.company || "Company Name"}
      </Text>
    </group>
  );
};

const ExperienceSection3D = ({ experiences }: ExperienceSection3DProps) => {
  return (
    <group position={[0,0,0]}>
      {experiences.map((exp, index) => (
        <ExperienceItem key={index} exp={exp} index={index} />
      ))}
    </group>
  );
};

interface ProjectsSection3DProps {
  projects: Project[];
}

const ProjectsSection3D = ({ projects }: ProjectsSection3DProps) => {
  const itemBaseX = 2.0; // Base X for this section, to the right of hero
  const itemSpacingX = 1.1; // Horizontal spacing
  const itemSpacingY = 1.2; // Vertical spacing
  const cardSize: [number, number, number] = [0.9, 1.1, 0.1]; // width, height, depth
  const textFontSize = 0.1;
  const maxItemsPerRow = 2;

  // State for hovered items - using a map to store hover state by index
  const [hoveredStates, setHoveredStates] = useState<Record<number, boolean>>({});

  const originalColor = (index: number, projName?: string) => projName ? (index % 2 === 0 ? 'lightsalmon' : 'khaki') : 'grey';
  const hoverHighlightColor = 'gold';


  return (
    <group position={[0,0,0]}>
      {projects.map((proj, index) => {
        const rowIndex = Math.floor(index / maxItemsPerRow);
        const colIndex = index % maxItemsPerRow;

        const xPos = itemBaseX + (colIndex * itemSpacingX);
        const yPos = 0.6 - (rowIndex * itemSpacingY); // Start high and go down

        return (
          <group
            key={index}
            position={[xPos, yPos, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredStates(prev => ({ ...prev, [index]: true }));
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredStates(prev => ({ ...prev, [index]: false }));
              document.body.style.cursor = 'auto';
            }}
          >
            <Box args={cardSize} scale={hoveredStates[index] ? 1.05 : 1} castShadow receiveShadow>
              <meshStandardMaterial color={hoveredStates[index] ? hoverHighlightColor : originalColor(index, proj.name)} />
            </Box>
            <Text
              position={[0, 0, cardSize[2] / 2 + 0.01]} // Position text slightly in front of the card
              fontSize={textFontSize}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={cardSize[0] * 0.9} // Max width relative to card width
              textAlign="center"
            >
              {proj.name || "Project Name"} {/* Fallback for empty string */}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

interface SkillsSection3DProps {
  skills: TechStack[];
}

// Individual Skill Item for animation
const SkillItem = ({ skill, index, basePosition, color }: { skill: TechStack, index: number, basePosition: number[], color: string }) => {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef<any>(null!); // Using any for Text ref due to potential type complexities with Drei Text
  const randomFactor = useMemo(() => Math.random() * 2 + 0.5, []); // Random factor for animation speed/offset

  useFrame(({ clock }) => {
    if (sphereRef.current && textRef.current) {
      const elapsedTime = clock.getElapsedTime();
      // Bobbing animation for sphere
      sphereRef.current.position.y = basePosition[1] + Math.sin(elapsedTime * randomFactor + index) * 0.1;
      // Text follows sphere's y position
      textRef.current.position.y = sphereRef.current.position.y + sphereRadius + 0.05;
    }
  });

  const sphereRadius = 0.25;
  const skillSphereArgs: [number, number, number] = [sphereRadius, 32, 32];
  const textFontSize = 0.08;

  return (
    <group position-x={basePosition[0]} position-z={basePosition[2]}> {/* Initial X and Z from basePosition */}
      <Sphere ref={sphereRef} args={skillSphereArgs} castShadow position-y={basePosition[1]}> {/* Initial Y from basePosition */}
        <meshStandardMaterial color={color} />
      </Sphere>
      <Text
        ref={textRef}
        position-x={0} // Text is centered horizontally with sphere
        position-z={0} // Text is aligned in Z with sphere
        // position-y will be set by useFrame
        fontSize={textFontSize}
        color="white"
        anchorX="center"
        anchorY="bottom"
        maxWidth={1}
        textAlign="center"
      >
        {skill.language || "Skill"}
      </Text>
    </group>
  );
};

const SkillsSection3D = ({ skills }: SkillsSection3DProps) => {
  const basePositions = [
    [-0.8, 1.8, -2.2], [0, 2.2, -2.8], [0.8, 1.8, -2.2],
    [-0.4, 1.3, -2.0], [0.4, 1.3, -2.0], [0, 0.8, -1.8],
    [-1.2, 1.0, -2.5], [1.2, 1.0, -2.5],
  ];
  const defaultColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'magenta'];

  return (
    <group position={[0,0,0]}>
      {skills.map((skill, index) => {
        const posIndex = index % basePositions.length;
        const basePosition = basePositions[posIndex];
        const color = skill.language ? defaultColors[index % defaultColors.length] : 'grey';
        return (
          <SkillItem
            key={index}
            skill={skill}
            index={index}
            basePosition={basePosition}
            color={color}
          />
        );
      })}
    </group>
  );
};

interface ContactSection3DProps {
  contacts: Contact[];
}

const ContactSection3D = ({ contacts }: ContactSection3DProps) => {
  const floorYPosition = -1.5;
  const iconHeight = 0.3;
  const iconRadius = 0.15; // Made icons a bit smaller
  const contactIconArgs: [number, number, number, number] = [iconRadius, iconRadius, iconHeight, 16];
  const textFontSize = 0.07;
  const itemSpacingX = 0.8; // Spacing between contact items

  // Default colors for icons if not specified or to cycle through
  const defaultIconColors = ['turquoise', 'mediumpurple', 'gold', 'lightcoral', 'lightseagreen'];


  return (
    <group>
      {/* Floor Plane */}
      <Plane args={[10, 5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, floorYPosition, 0]} receiveShadow>
        <meshStandardMaterial color="dimgray" />
      </Plane>

      {/* Contact Items */}
      {contacts.map((contact, index) => {
        const xPos = (index - (contacts.length - 1) / 2) * itemSpacingX; // Center the items
        const yPosCylinder = floorYPosition + iconHeight / 2;
        const yPosText = floorYPosition + iconHeight + textFontSize; // Text above cylinder
        const color = contact.app ? defaultIconColors[index % defaultIconColors.length] : 'grey';

        return (
          <group key={index} position={[xPos, 0, 0.5]}> {/* Position each contact item group */}
            <Cylinder args={contactIconArgs} position={[0, yPosCylinder, 0]} castShadow>
              <meshStandardMaterial color={color} />
            </Cylinder>
            <Text
              position={[0, yPosText, 0]}
              fontSize={textFontSize}
              color="white"
              anchorX="center"
              anchorY="bottom"
              maxWidth={itemSpacingX * 0.9}
              textAlign="center"
            >
              {contact.app || "Contact"} {/* Fallback for empty string */}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const Portfolio3D = () => {
  const { name, title, bio } = initialFormValues.userInfo;
  const experiences = initialFormValues.experience;
  const projects = initialFormValues.projects;
  const techStack = initialFormValues.techStack;
  const contacts = initialFormValues.contact; // Get contact data

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}> {/* Enabled shadows, adjusted camera */}
        <ambientLight intensity={0.5} /> {/* Reduced ambient light for more prominent shadows */}

        {/* Main directional light for shadows */}
        <directionalLight
          castShadow
          position={[5, 10, 7.5]} // Positioned to cast angled shadows
          intensity={1.0} // Adjusted intensity
          shadow-mapSize-width={2048} // Increased shadow map size
          shadow-mapSize-height={2048}
          shadow-camera-far={30}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0005} // Fine-tune shadow bias if needed for artifacts
        />

        {/* Fill point light - reduced intensity, maybe adjusted position */}
        <pointLight position={[10, 5, 10]} intensity={0.3} />
        <pointLight position={[-10, -5, -5]} intensity={0.2} />


        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <HeroSection3D name={name} title={title} bio={bio} />
        <ExperienceSection3D experiences={experiences} />
        <ProjectsSection3D projects={projects} />
        <SkillsSection3D skills={techStack} />
        <ContactSection3D contacts={contacts} />

        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default Portfolio3D;
