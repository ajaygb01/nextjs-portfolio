import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles'; // To access theme for button styling

interface ThemeToggleButtonProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme(); // Access current theme

  return (
    <IconButton
      onClick={toggleDarkMode}
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1500, // Ensure it's above most other elements
        color: theme.palette.text.primary, // Use theme's primary text color for the icon
        backgroundColor: theme.palette.background.paper, // Use theme's paper color for button background
        '&:hover': {
          backgroundColor: theme.palette.action.hover, // Use theme's hover color
        },
      }}
      aria-label="toggle theme"
    >
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
