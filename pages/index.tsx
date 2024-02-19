"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TechStackIcon from "@mui/icons-material/Code"; // Import the icons you want to use
import ExperienceIcon from "@mui/icons-material/BusinessCenter";
import ContactIcon from "@mui/icons-material/Contacts";
import AboutIcon from "@mui/icons-material/Info";
import ProjectsIcon from "@mui/icons-material/Work";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChatIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Link from 'next/link';

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f1daff", // purple
    },
    secondary: { main: "#ffe8a3" },
    text: {
      primary: "#000000", // black text for light theme
    },
    success: {
      main: "#bdf6ce", // green
    },
    info: {
      main: "#c87fff", // purple
    },
    // Add your light theme colors here
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000", // dark grey for dark theme
    },
    secondary: {
      main: "#121212", // white for dark theme
    },
    text: {
      primary: "#ffffff", // white text for dark theme
    },
    success: {
      main: "#3c3c3c", // green
    },
    info: {
      main: "#121212", // blue
    },
    // Add your dark theme colors here
  },
});

const icons = {
  techstack: <TechStackIcon />,
  experience: <ExperienceIcon />,
  contact: <ContactIcon />,
  // about: <AboutIcon />,
  projects: <ProjectsIcon />,
};

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);

  const [open, setOpen] = useState<{ [key: string]: boolean }>({
    techstack: false,
    experience: false,
    contact: false,
    about: false,
    projects: false,
  });

  const handleToggle = (section: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [section]: !prevOpen[section] }));
  };

  const techStack = [
    { language: "Java", years: "3" },
    { language: "Python", years: "4" },
    { language: "Angular", years: "2" },
    { language: "TypeScript", years: "2" },
    { language: "React", years: "3" },
    { language: "Node.js", years: "3" },
    { language: "CI/CD Pipelines", years: "3" },
    { language: "Azure Cloud", years: "3" },
    { language: "SpringBoot", years: "2" },
    { language: "Unix", years: "5" },
    { language: "Aws Cloud", years: "2" },
  ];

  const experience = [
    {
      from: "2016-Jan",
      to: "2018-Feb",
      company: "Infosys Limited",
      location: "Chennai, India",
      position: "Intern + Systems Engineer",
      keySkills: ["Java", "Spring Boot", "Microservices", "Unix"],
    },
    {
      from: "2019-May",
      to: "2021-Feb",
      company: "Company B",
      location: "Location B",
      position: "Intern + Full Stack Developer",
      keySkills: ["Python", "Django", "REST APIs"],
    },
    {
      from: "2021-Feb",
      to: "2024-Feb",
      company: "Company B",
      location: "Location B",
      position: "Software Developer",
      keySkills: ["Python", "Django", "REST APIs"],
    },
    // Add more experiences as needed
  ];

  const contact = [
    {
      icon: <LinkedInIcon />,
      link: "https://www.linkedin.com/in/ajay-vigneshwar-gb-b3b665179/",
    },
    { icon: <ChatIcon />, link: "https://wa.me/+12269758056" },
    { icon: <EmailIcon />, link: "ajaygb7@gmail.com" },
  ];

  const projects = [
    {
      name: "Portfolio Website",
      description: "Built using Next.js and Material-UI / Randomize user info",
      link: "/portfolio",
    },
    {
      name: "Project 2",
      description: "Description 2",
      link: "https://www.google.com",
    },
  ];

  const footer = {
    companyName: "Ajay GB",
    year: "2024",
  };

  const sectionContent = {
    techstack: (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {techStack.map((tech, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderSpacing: 3,
              color: darkMode
                ? darkTheme.palette.text.primary
                : lightTheme.palette.text.primary,
              borderBottom:
                index !== techStack.length - 1 ? "0.01px solid grey" : "none",
            }}
            key={tech.language}
          >
            <Typography component="div">{tech.language}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "auto",
                minWidth: "50px",
              }}
            >
              <Typography component="div">{tech.years}</Typography>
              <Typography component="div">-Years</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    ),
    experience: (
      <>
        {experience.map((exp) => {
          const fromDate = new Date(exp.from);
          const toDate = exp.to === "Present" ? new Date() : new Date(exp.to);

          const diffInMonths =
            toDate.getMonth() -
            fromDate.getMonth() +
            12 * (toDate.getFullYear() - fromDate.getFullYear());

          const years = Math.floor(diffInMonths / 12);
          const months = diffInMonths % 12;

          return (
            <Card
              key={exp.from}
              sx={{
                borderRadius: 1,
                boxShadow: "none",
                marginBottom: 2,
                backgroundColor: darkMode
                  ? darkTheme.palette.success.main
                  : lightTheme.palette.success.main,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {exp.position}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  color="textSecondary"
                >
                  {exp.company}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    {exp.from} to {exp.to}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    {years} years {months} months
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  {exp.location}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: 2,
                    "& > :not(style)": {
                      margin: "4px",
                    },
                  }}
                >
                  {exp.keySkills.map((skill) => (
                    <Chip
                      sx={{
                        backgroundColor: darkMode
                          ? darkTheme.palette.info.main
                          : lightTheme.palette.info.main,
                      }}
                      key={skill}
                      label={skill}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </>
    ),
    contact: (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {contact.map((item, index) => (
          <IconButton
            key={index}
            href={item.link}
            sx={{
              backgroundColor: darkMode
                ? darkTheme.palette.success.main
                : lightTheme.palette.success.main,
              color: darkMode
                ? darkTheme.palette.text.primary
                : lightTheme.palette.text.primary,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.icon}
          </IconButton>
        ))}
      </Box>
    ),
    projects: (
      <Box>
        {projects.map((project, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="div">
                {project.name}
              </Typography>
              <Typography variant="body1" component="div">
                {project.description}
              </Typography>
            </Box>
            <Button
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ alignItems: "center" }}
            >
              View Project
            </Button>

          </Box>
        ))}
      </Box>
    ),
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          padding: 2,
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: darkMode
            ? darkTheme.palette.primary.main
            : lightTheme.palette.primary.main,
          color: darkMode
            ? darkTheme.palette.text.primary
            : lightTheme.palette.text.primary,
        }}
      >
        <AppBar
          position="static"
          sx={{
            boxShadow: "none",
            borderRadius: 3,
            backgroundColor: darkMode
              ? darkTheme.palette.secondary.main
              : lightTheme.palette.secondary.main,
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
                Ajay GB
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  fontSize: "0.8rem",
                  opacity: 0.6,
                }}
              >
                Software Developer
              </Typography>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="mode"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
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
            I am a software developer with 5+ years of experience working in
            multiple technologies, including the MERN stack and full-stack
            development practices. I have experience in building CI/CD pipelines
            and deploying applications to Microsoft Cloud. I am eager to
            collaborate with a team of developers to build applications using
            microservices. I am committed to continuous learning and
            implementing new technologies and practices to enhance my skills and
            contribute to my team&apos;s success.
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
                    backgroundColor: darkMode
                      ? darkTheme.palette.secondary.main
                      : lightTheme.palette.secondary.main,
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
                          color: darkMode
                            ? darkTheme.palette.text.primary
                            : lightTheme.palette.text.primary,
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
    </ThemeProvider>
  );
}
