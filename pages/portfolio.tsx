import React, { useState } from 'react';
import { Button,Toolbar,Modal, TextField, FormControlLabel, Checkbox, Typography, Box, Container } from '@mui/material';
import { Contact, Experience, FormValues, Project, TechStack, initialFormValues } from '@/app/state/initialState';

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
  
  const renderTechStackFields = () => {
    return (
      formValues.techStack.map((stack, index) => (
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
        </div>
      ))
    );
  };

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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Modal Form
          </Typography>
          {/* Your modal form content goes here */}
          {/* Example: */}
          <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h4" gutterBottom>
                Form
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={formValues.isTechStack} onChange={(e) => handleChange('isTechStack', e.target.checked)} />}
                label="Tech Stack"
              />
              {formValues.isTechStack && renderTechStackFields()}

              <FormControlLabel
                control={<Checkbox checked={formValues.isExperience} onChange={(e) => handleChange('isExperience', e.target.checked)} />}
                label="Experience"
              />
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
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
