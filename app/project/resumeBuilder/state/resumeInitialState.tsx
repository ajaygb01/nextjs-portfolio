interface PersonalInfo {
    fullName: string
    email: string
    phoneNumber: string
    address: string
    linkedIn: string
    personalWebsite: string
}

interface Education {
    schoolName: string
    degree: string
    fieldOfStudy: string
    graduationYear: number
    gpa: number
}

interface WorkExperience {
    jobTitle: string
    companyName: string
    location: string
    startDate: Date
    endDate: Date
    jobDescription: string
    achievements: string[]
}

interface Skill {
    skillName: string
    proficiencyLevel: string // This could be 'Beginner', 'Intermediate', 'Advanced'
}

interface Achievement {
    title: string
    issuingOrganization: string
    dateReceived: Date
    description: string
}

interface CustomQuestion {
    question: string
    answer: string
}

// The state for the resume builder app
interface ResumeBuilderState {
    personalInfo: PersonalInfo
    education: Education[]
    workExperience: WorkExperience[]
    skills: Skill[]
    achievements: Achievement[]
    customQuestions: CustomQuestion[]
}
