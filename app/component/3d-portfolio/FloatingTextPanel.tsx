import React, { ReactNode } from 'react';
import { Html } from '@react-three/drei';
import { Paper, Typography, IconButton, Box } from '@mui/material';
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
        sx={(theme) => ({ // Use theme callback for dynamic styling
          padding: theme.spacing(2),
          maxWidth: panelMaxWidth,
          maxHeight: panelMaxHeight,
          width: 'auto', 
          overflowY: panelMaxHeight !== 'auto' ? 'auto' : undefined,
          // Use theme's paper color, but allow for transparency if desired (e.g., by adding alpha to theme's paper color)
          // For a semi-transparent effect that respects the theme's paper color:
          // backgroundColor: alpha(theme.palette.background.paper, 0.95), 
          // For now, let's use the theme's paper color directly for simplicity and better theme adherence.
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary, // Ensure text color contrasts with paper
          backdropFilter: 'blur(5px)', // Keep blur if desired, works best if background has some transparency
          borderRadius: theme.shape.borderRadius, // Use theme's border radius
          boxShadow: theme.shadows[6], // Use theme's shadow
        })}
        onClick={(e) => e.stopPropagation()} 
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.5, // Increased margin bottom
          }}
        >
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
        <Box sx={{ maxHeight: panelMaxHeight === 'auto' ? undefined : `calc(${typeof panelMaxHeight === 'string' ? panelMaxHeight : panelMaxHeight + 'px'} - ${theme.spacing(8)})`, overflowY: 'auto' }}> {/* Adjust content max height for scroll */}
          {content}
        </Box>
      </Paper>
    </Html>
  );
};

export default FloatingTextPanel;
