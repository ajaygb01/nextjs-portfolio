export interface TechStack {
    language: string
    year: number
}

export interface Experience {
    from: string
    to: string
    company: string
    location: string
    position: string
    keySkills: string[]
}

export interface Contact {
    app: string
    link: string
    icon?: React.JSX.Element
}

export interface Project {
    name: string
    description: string
    link: string
}
export interface UserInfo {
    name: string
    title: string
    bio: string
}

export interface Footer {
    year: number
    companyName: string
}

export interface FormValues {
    userInfo: UserInfo
    isTechStack: boolean
    techStack: TechStack[]
    isExperience: boolean
    experience: Experience[]
    isContact: boolean
    contact: Contact[]
    isProject: boolean
    projects: Project[]
    isUseUserInfo: boolean
    footer: Footer
}

export const initialFormValues: FormValues = {
    userInfo: { name: '', title: '', bio: '' },
    isTechStack: false,
    techStack: [{ language: '', year: 0 }],
    isExperience: false,
    experience: [
        {
            from: '',
            to: '',
            company: '',
            location: '',
            position: '',
            keySkills: [],
        },
    ],
    isContact: false,
    contact: [{ app: '', link: '' }],
    isProject: false,
    projects: [{ name: '', description: '', link: '' }],
    isUseUserInfo: false,
    footer: { year: 0, companyName: '' },
}

export const techChips = [
    'Html',
    'Css',
    'Javascript',
    'Typescript',
    'React',
    'Redux',
    'Node',
    'Express',
    'MongoDB',
    'Mongoose',
    'PostgreSQL',
    'Sequelize',
    'Python',
    'Laravel',
    'Ruby',
    'Ruby on Rails',
    'Swift',
    'Kotlin',
    'Android',
    'iOS',
    'Kubernetes',
    'Docker',
    'AWS',
    'GCP',
    'Azure',
    'Firebase',
]
