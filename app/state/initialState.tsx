import { StaticImageData } from 'next/image'
import { ReactElement } from 'react'

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
    icon?: ReactElement
}

export interface Project {
    name: string
    description: string
    link: string
    public: boolean
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
    isBadge: boolean
    profileImage: string | StaticImageData
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
    projects: [{ name: '', description: '', link: '', public: false }],
    isUseUserInfo: false,
    isBadge: false,
    profileImage: {} as StaticImageData,
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

// Initialize Firebase
export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const firebaseConfigCustomer = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_CUSTOMER,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_CUSTOMER,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_CUSTOMER,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_CUSTOMER,
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_CUSTOMER,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_CUSTOMER,
}
