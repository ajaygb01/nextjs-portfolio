// import React from 'react';
// import { Button, TextField, Typography, Box, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DatePicker from '@mui/lab/DatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { Experience } from '../state/initialState';


// interface ExperienceFormProps {
//   experience: Experience;
//   onChange: (index: number, experience: Experience) => void;
//   onRemove: (index: number) => void;
// }

// const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onChange, onRemove }) => {
//     const handleExperienceChange = (index: number, key: keyof Experience, value: any) => {
//         const updatedExperience: Experience = {
//           ...experience,
//           [key]: value,
//         };
//         onChange(index, updatedExperience);
//       };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//           label="From"
//           value={experience.from}
//           onChange={(newValue: any) => handleExperienceChange(index,'from', newValue)}
//           renderInput={(params: any) => <TextField {...params} />}
//         />
//         <DatePicker
//           label="To"
//           value={experience.to}
//           onChange={(newValue: any) => handleExperienceChange(index,'to', newValue)}
//           renderInput={(params: any) => <TextField {...params} />}
//         />
//       </LocalizationProvider>
//       <TextField
//         label="Company"
//         value={experience.company}
//         onChange={(e) => handleExperienceChange(index,'company', e.target.value)}
//       />
//       <TextField
//         label="Location"
//         value={experience.location}
//         onChange={(e) => handleExperienceChange(index,'location', e.target.value)}
//       />
//       <TextField
//         label="Position"
//         value={experience.position}
//         onChange={(e) => handleExperienceChange(index,'position', e.target.value)}
//       />
//       <TextField
//         label="Key Skills"
//         value={experience.keySkills.join(',')}
//         onChange={(e) => handleExperienceChange(index,'keySkills', e.target.value.split(','))}
//       />
//       {/* <IconButton onClick={onRemove}>
//         <AddIcon />
//       </IconButton> */}
//     </Box>
//   );
// };

// interface RenderExperienceProps {
//   experiences: Experience[];
//   onAddExperience: () => void;
//   onChangeExperience: (index: number, experience: Experience) => void;
//   onRemoveExperience: (index: number) => void;
// }

// const RenderExperience: React.FC<RenderExperienceProps> = ({
//   experiences,
//   onAddExperience,
//   onChangeExperience,
//   onRemoveExperience,
// }) => {
//   return (
//     <div>
//       {experiences.map((experience, index) => (
//         <ExperienceForm
//           key={index}
//           experience={experience}
//           onChange={(exp) => onChangeExperience(index, exp)}
//           onRemove={() => onRemoveExperience(index)}
//         />
//       ))}
//       <Button onClick={onAddExperience} variant="contained" color="primary">
//         Add Experience
//       </Button>
//     </div>
//   );
// };

// export default RenderExperience;
