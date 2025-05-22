import React, { ReactNode } from 'react';
import { Html } from '@react-three/drei';
import { Paper, Typography, IconButton, Box, Theme } from '@mui/material'; // Added Theme
import { SxProps } from '@mui/material/styles'; // Added SxProps
import CloseIcon from '@mui/icons-material/Close';
import * as THREE from 'three'; // Import THREE for Vector3 type

interface FloatingTextPanelProps {
  title: string;
  content: ReactNode;
  position: THREE.Vector3 | [number, number, number];
  onClose: () => void;
  isVisible: boolean;
  panelMaxWidth?: number | string;
  panelMaxHeight?: number | string;
}

// Define sx prop for the header Box
const headerBoxStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 1.5,
};

// Define the function that generates the Paper's sx object
// Removed explicit : SxProps<Theme> return type annotation to allow inference
const getPaperSx = (theme: Theme, panelMaxWidth: string | number, panelMaxHeight: string | number) => ({
  padding: theme.spacing(2),
  maxWidth: panelMaxWidth,
  maxHeight: panelMaxHeight,
  width: 'auto',
  ...(panelMaxHeight !== 'auto' && { overflowY: 'auto' as const }), // Conditionally spread 'overflowY'
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  backdropFilter: 'blur(5px)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[6],
});

const FloatingTextPanel: React.FC<FloatingTextPanelProps> = ({
  title,
  content,
  position,
  onClose,
  isVisible,
  panelMaxWidth = 350,
  panelMaxHeight = 'auto',
}) => {
  if (!isVisible) {
    return null;
  }

  // Ensure position is always an array for Html component
  const htmlPosition: [number, number, number] = position instanceof THREE.Vector3
    ? [position.x, position.y, position.z]
    : position;

  return (
    <Html position={htmlPosition} center>
      <Paper
        elevation={6} // Add elevation for better depth
        sx={(theme) => getPaperSx(theme, panelMaxWidth, panelMaxHeight)} // Correctly use the factory with the theme callback
        onClick={(e) => e.stopPropagation()}
      >
        {/* @ts-ignore - Attempting to suppress stubborn type complexity error */}
        <Box sx={{ // Inlining the styles directly
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={(e) => {
              e.stopPropagation(); 
              onClose();
            }}
            size="small"
            sx={{ color: (theme) => theme.palette.text.secondary }} // Use secondary text color for icon
          >
            <CloseIcon fontSize="small" /> {/* Explicitly smaller icon */}
          </IconButton>
        </Box>
        <Box sx={(theme) => ({ /* Ensure theme is accessed via callback */
            maxHeight: panelMaxHeight === 'auto' 
              ? undefined 
              : `calc(${typeof panelMaxHeight === 'string' ? panelMaxHeight : panelMaxHeight + 'px'} - ${theme.spacing(8)})`, 
            overflowY: 'auto' 
          })}>
          {content}
        </Box>
      </Paper>
    </Html>
  );
};

export default FloatingTextPanel;
