import React, { ReactNode } from 'react';
import { Html } from '@react-three/drei';
import { Paper, Typography, IconButton, Box, Theme } from '@mui/material'; // Added Theme
import { SxProps } from '@mui/material/styles'; // Added SxProps
import CloseIcon from '@mui/icons-material/Close';
import * as THREE from 'three'; // Import THREE for Vector3 type

interface FloatingTextPanelProps {
  title: string;
  content: ReactNode;
  icon?: React.ReactElement; // New icon prop
  position: THREE.Vector3 | [number, number, number];
  onClose: () => void;
  isVisible: boolean;
  panelMaxWidth?: number | string;
  panelMaxHeight?: number | string;
}

// Define Keyframes for scanline animation at the top level
const scanlineAnimKeyframes = {
  '@keyframes scanlineAnim': {
    '0%': { backgroundPosition: '0 0' },
    '100%': { backgroundPosition: '0 100%' },
  },
};

// Define sx prop for the header Box
const headerBoxStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 1.5,
};

// Removed getPaperSx as styles will be directly applied or simplified

const FloatingTextPanel: React.FC<FloatingTextPanelProps> = ({
  title,
  content,
  icon, // Destructure new icon prop
  position,
  onClose,
  isVisible,
  // Update defaults for better responsiveness
  panelMaxWidth = 'min(90vw, 450px)', // Responsive max width: 90% of viewport width, capped at 450px
  panelMaxHeight = '75vh', // Responsive max height: 75% of viewport height
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
        elevation={6}
        sx={(theme) => ({ 
          ...scanlineAnimKeyframes, // Spread the keyframes here
          padding: 0, 
          width: panelMaxWidth, 
          maxWidth: '100%', 
          maxHeight: panelMaxHeight,
          overflow: 'hidden', 
          backgroundColor: 'rgba(25, 25, 40, 0.85)', 
          color: theme.palette.text.primary, 
          backdropFilter: 'blur(10px)', 
          borderRadius: theme.shape.borderRadius * 2, 
          border: `1px solid ${theme.palette.primary.light}33`, 
          boxShadow: `0 0 20px 8px ${theme.palette.primary.main}4D`, 
          display: 'flex',
          flexDirection: 'column',
          position: 'relative', 
          '&::before': { 
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            background: `repeating-linear-gradient(
              transparent,
              transparent 2px,
              ${theme.palette.primary.dark}22 2.5px, 
              ${theme.palette.primary.dark}22 3px
            )`,
            animation: 'scanlineAnim 12s linear infinite', // Reference the animation name
          },
          // Keyframes are now defined via scanlineAnimKeyframes spread
        })}
        onClick={(e) => e.stopPropagation()} 
      >
        <Box sx={{ // Header Box
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: '12px 16px', 
          borderBottom: 1, 
          borderColor: (theme) => `${theme.palette.primary.main}55`, 
        }}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {icon && React.cloneElement(icon, { sx: { color: 'primary.light', fontSize: '1.5rem' } })}
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'primary.light' }}>
              {title}
            </Typography>
          </Box>
          <IconButton
            aria-label="close"
            onClick={(e) => {
              e.stopPropagation(); 
              onClose();
            }}
            size="small"
            sx={{ color: 'primary.light', '&:hover': { backgroundColor: (theme) => `${theme.palette.primary.main}22`} }} 
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Box sx={{ // Content Box
          p: 2, 
          flexGrow: 1, 
          minHeight: 0, 
          overflowY: 'auto', 
          // Custom scrollbar for holographic feel (WebKit browsers)
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent', // Or a very dark, semi-transparent color
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: (theme) => `${theme.palette.primary.main}99`, // Semi-transparent primary color
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: (theme) => theme.palette.primary.main,
          }
        }}>
          {content}
        </Box>
      </Paper>
    </Html>
  );
};

export default FloatingTextPanel;
