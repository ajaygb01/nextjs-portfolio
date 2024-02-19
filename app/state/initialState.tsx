export interface TechStack {
    language: string;
    year: number;
  }
  
  export interface Experience {
    from: string;
    to: string;
    company: string;
    location: string;
    position: string;
    keySkills: string[];
  }
  
  export interface Contact {
    app: string;
    link: string;
  }
  
  export interface Project {
    name: string;
    description: string;
    link: string;
  }
  
  export interface FormValues {
    isTechStack: boolean;
    techStack: TechStack[];
    isExperience: boolean;
    experience: Experience[];
    isContact: boolean;
    contact: Contact[];
    isProject: boolean;
    projects: Project[];
  }
  
  export const initialFormValues: FormValues = {
    isTechStack: false,
    techStack: [{ language: '', year: 0 }],
    isExperience: false,
    experience: [{ from: '', to: '', company: '', location: '', position: '', keySkills: [''] }],
    isContact: false,
    contact: [{ app: '', link: '' }],
    isProject: false,
    projects: [{ name: '', description: '', link: '' }],
  };
  