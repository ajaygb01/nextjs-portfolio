import React, { useState } from 'react';
import { Button,Toolbar,Modal, TextField, FormControlLabel, Checkbox, Typography, Box, IconButton, Autocomplete,Container } from '@mui/material';
import { Contact, Experience, FormValues, Project, TechStack, initialFormValues } from '@/app/state/initialState';
import { Add, Delete } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { Close } from '@mui/icons-material';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  // Add other fields as needed
}

const Portfilo: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchRandomUserInfo = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const user = data.results[0];
      const userInfo: UserInfo = {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        // Add other fields as needed
      };
      setUserInfo(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleChange = (key: keyof FormValues, value: any) => {
    setFormValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleTechStackChange = (index: number, key: keyof TechStack, value: any) => {
    const updatedArray = [...formValues.techStack];
    updatedArray[index] = { ...updatedArray[index], [key]: value };
    handleChange('techStack', updatedArray);
  };
  
  const handleExperienceChange = (index: number, key: keyof Experience, value: any) => {
    const updatedArray = [...formValues.experience];
    updatedArray[index] = { ...updatedArray[index], [key]: value };
    handleChange('experience', updatedArray);
  };
  
  const handleContactChange = (index: number, key: keyof Contact, value: any) => {
    const updatedArray = [...formValues.contact];
    updatedArray[index] = { ...updatedArray[index], [key]: value };
    handleChange('contact', updatedArray);
  };
  
  const handleProjectChange = (index: number, key: keyof Project, value: any) => {
    const updatedArray = [...formValues.projects];
    updatedArray[index] = { ...updatedArray[index], [key]: value };
    handleChange('projects', updatedArray);
  };


  const [experiences, setExperiences] = useState<Experience[]>([initialFormValues.experience[0]]);


  const handleAddExperience = () => {
    setExperiences([...experiences, initialFormValues.experience[0]]);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };


  
  const renderTechStackFields = () => {
    const handleAddTechStack = () => {
      setFormValues({
        ...formValues,
        techStack: [...formValues.techStack, { language: '', year: 0 }]
      });
    };
  
    const handleRemoveTechStack = (index: number) => {
      const newTechStack = [...formValues.techStack];
      newTechStack.splice(index, 1);
      setFormValues({
        ...formValues,
        techStack: newTechStack
      });
    };
  
    return (
      <>
        {formValues.techStack.map((stack, index) => (
          <div key={index}>
            <TextField
              label="Language"
              value={stack.language}
              onChange={(e) => handleTechStackChange(index, 'language', e.target.value)}
            />
            <TextField
              label="Year"
              type="number"
              value={stack.year}
              onChange={(e) => handleTechStackChange(index, 'year', parseInt(e.target.value))}
            />
            <IconButton onClick={() => handleRemoveTechStack(index)}>
              <Delete />
            </IconButton>
          </div>
        ))}
        <IconButton onClick={handleAddTechStack}>
          <Add />
        </IconButton>
      </>
    );
  };

  const renderExperienceFields = () => {
    return (<form>
      {experiences.map((experience, index) => (
        <div key={index}>
          <DatePicker
            views={['year', 'month']}
            label="From"
            value={experience.from}
            onChange={(newValue: any) => handleExperienceChange(index, 'from', newValue)}
            renderInput={(params: any) => <TextField {...params} />}
          />
          <DatePicker
            views={['year', 'month']}
            label="To"
            value={experience.to}
            onChange={(newValue: any) => handleExperienceChange(index, 'to', newValue)}
            renderInput={(params: any) => <TextField {...params} />}
          />
          <TextField
            label="Company"
            value={experience.company}
            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
          />
          <TextField
            label="Location"
            value={experience.location}
            onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
          />
          <TextField
            label="Position"
            value={experience.position}
            onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
          />
          <Autocomplete
            multiple
            options={[]}
            value={experience.keySkills}
            onChange={(event, newValue) => handleExperienceChange(index, 'keySkills', newValue)}
            renderInput={(params) => <TextField {...params} label="Key Skills" />}
          />
          <IconButton onClick={() => handleRemoveExperience(index)}>
            <Delete />
          </IconButton>
        </div>
      ))}
      <button type="button" onClick={handleAddExperience}>Add Experience</button>
    </form>);
  }

  const handleCheckboxChange = (key: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(key, event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form values:', formValues);
    // Perform form submission or further processing here
  };

  return (
    <Box>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleOpenModal}>
          Open Modal
        </Button>
        <Button variant="contained" onClick={fetchRandomUserInfo}>
          Fetch Random User Info
        </Button>
      </Toolbar>
      <Modal open={openModal} onClose={handleCloseModal}>
      <Box
  sx={{
    position: 'absolute',
    top: { xs: '0%', md: '50%' },
    left: { xs: '0%', md: '50%' },
    transform: { md: 'translate(-50%, -50%)' },
    backgroundColor: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: { xs: '100%', md: 'auto' },
    height: { xs: '100%', md: 'auto' },
    overflowY: { xs: 'scroll', md: 'auto' },
  }}
>
<Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    }}
  >
  <Typography variant="h6" gutterBottom>
    Portfolio Writer
  </Typography>
  <IconButton onClick={handleCloseModal}>
      <Close />
    </IconButton>
</Box>
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      maxWidth: 1200,
      margin: 'auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
  >
    <FormControlLabel
      control={
        <Checkbox
          checked={formValues.isTechStack}
          onChange={(e) => handleChange('isTechStack', e.target.checked)}
        />
      }
      label="Tech Stack"
    />
    {formValues.isTechStack && (
      <Box sx={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
        {renderTechStackFields()}
      </Box>
    )}

    <FormControlLabel
      control={
        <Checkbox
          checked={formValues.isExperience}
          onChange={(e) => handleChange('isExperience', e.target.checked)}
        />
      }
      label="Experience"
    />
    {formValues.isExperience && (
      <Box sx={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
        {renderExperienceFields()}
      </Box>
    )}
    <Button type="submit" variant="contained" color="primary">
      Submit
    </Button>
  </Box>
</Box>
      </Modal>
      {userInfo && (
        <div>
          <Typography variant="h6" gutterBottom>
            Random User Info
          </Typography>
          <Typography>Name: {userInfo.name}</Typography>
          <Typography>Email: {userInfo.email}</Typography>
          <Typography>Phone: {userInfo.phone}</Typography>
          {/* Display other user info fields as needed */}
        </div>
      )}
    </Box>
  );
};

export default Portfilo;
