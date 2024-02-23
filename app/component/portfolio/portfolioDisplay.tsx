'use client'
import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Grid, Card, CardContent } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

interface PortfolioDisplayProps {
  theme: any;
  setDarkMode: (mode: boolean) => void;
  userInfo: any; // replace with your actual type
  icons: any; // replace with your actual type
  handleToggle: (section: string) => void;
  open: any; // replace with your actual type
  sectionContent: any; // replace with your actual type
  prevMode: boolean;
  setPrevMode: (mode: boolean) => void;
  footer: any; // replace with your actual type
}

const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({ theme, setDarkMode, userInfo, icons, handleToggle, open, sectionContent,prevMode, setPrevMode, footer }) => {
  
  return(
        <Box
    component={"div"}
    sx={{
      display: "flex",
      padding: 2,
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    }}
  >
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        borderRadius: 3,
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div" sx={{}}>
            {userInfo.name}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              fontSize: "0.8rem",
              opacity: 0.6,
            }}
          >
            {userInfo.title}
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => {
            const newPrevMode = theme.palette.mode === "light" ? true : false;
            setPrevMode(newPrevMode);
            setDarkMode(newPrevMode);
          }}
          aria-label="mode"
        >
          {theme.palette.mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
    <Box
      sx={{
        p: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body1" component="div">
        {userInfo.bio}
      </Typography>
    </Box>
    <Box
      sx={{
        marginBottom: "5px",
      }}
    >
      <Grid container spacing={1}>
        {Object.keys(icons).map((section) => (
          <Grid item xs={12} sm={6} md={3} key={section}>
            <Card
              sx={{
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onClick={() => handleToggle(section)}
                >
                  <IconButton
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    {icons[section as keyof typeof icons]}
                  </IconButton>
                  <Typography variant="h6" component="div">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Typography>
                </Box>
                {open[section] && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    {sectionContent[section as keyof typeof sectionContent]}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Box
      component={"footer"}
      sx={{
        mt: 2,
        py: 2,
        borderRadius: 3,
        textAlign: "center",
        position: "relative",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {footer.year} {footer.companyName}
      </Typography>
    </Box>
  </Box>
    );
};

export default PortfolioDisplay;