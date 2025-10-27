'use client';

import MatrixRain from '@/components/MatrixRain';
import { useState } from 'react';

const content = {
  en: {
    name: 'Ajay Vigneshwar GB',
    title: 'Software Developer @ Lithia Motors | React, Next.js, Express | CI/CD Pipelines | Azure Cloud & Docker',
    contact: 'Contact',
    address: '809-150 Hollywood crt, Cambridge',
    phone: '+12269758056 (Home)',
    email: 'aj.gb8056@gmail.com',
    linkedin: 'LinkedIn',
    skills: 'Top Skills',
    skillsList: [
      'Next.js',
      'Full-Stack Development',
      'Software Development',
      'Methodologies',
    ],
    languages: 'Languages',
    languagesList: [
      'English (Professional Working)',
      'Tamil (Native or Bilingual)',
      'French (Elementary)',
    ],
    summary: 'Summary',
    summaryText: 'Proficient in React.js, Next.js, Express.js, MongoDB, and MySQL. Currently at Lithia Motors, I manage multiple applications, maintain code efficiency, build scalable architectures, and implement CI/CD pipelines. I contribute to AI chatbot development, handle cloud resource management, and modernize legacy systems. I enjoy collaboration, process optimization, and delivering innovative solutions in dynamic environments.',
    experience: 'Experience',
    experienceList: [
      {
        company: 'Lithia Motors, Inc.',
        role: 'Software Developer | April 2022 - Present',
        duties: [
          'Leveraged React.js, ExpressJs, and MongoDB/MySQL to deliver full-stack solutions.',
          'Architected and implemented a "Build Once, Deploy Many" CI/CD pipeline model.',
          'Maintained and modernized legacy applications used across Canada.',
          'Contributed to the development of an AI chatbot using Next.js, Express.js, and Azure Cloud Services.',
        ],
      },
      {
        company: 'Insyght.AI',
        role: 'Full Stack Engineer | May 2019 - January 2021',
        duties: [
          'Worked on Front and Back-end web development and design.',
          'Created custom solutions using Node.js, Java and responsive web development technologies.',
        ],
      },
      {
        company: 'Infosys',
        role: 'System Engineer | June 2016 - February 2018',
        duties: [
          'Created Single Page Applications (SPA) using Angular 6, Spring Boot.',
          'Created REST APIs using Spring Boot, Microservices and experience with Docker containers.',
        ],
      },
    ],
    education: 'Education',
    educationList: [
      {
        institution: 'University of Windsor',
        degree: 'Master of Engineering, Computer Engineering (2018 - 2019)',
      },
      {
        institution: 'SRM University',
        degree: "Bachelor's degree, Computer Science (2013 - 2016)",
      },
    ],
  },
  fr: {
    name: 'Ajay Vigneshwar GB',
    title: 'Développeur de logiciels @ Lithia Motors | React, Next.js, Express | Pipelines CI/CD | Cloud Azure & Docker',
    contact: 'Contact',
    address: '809-150 Hollywood crt, Cambridge',
    phone: '+12269758056 (Domicile)',
    email: 'aj.gb8056@gmail.com',
    linkedin: 'LinkedIn',
    skills: 'Compétences principales',
    skillsList: [
      'Next.js',
      'Développement Full-Stack',
      'Développement de logiciels',
      'Méthodologies',
    ],
    languages: 'Langues',
    languagesList: [
      'Anglais (Professionnel)',
      'Tamoul (Natif ou Bilingue)',
      'Français (Élémentaire)',
    ],
    summary: 'Résumé',
    summaryText: "Maîtrise de React.js, Next.js, Express.js, MongoDB et MySQL. Actuellement chez Lithia Motors, je gère plusieurs applications, maintiens l'efficacité du code, construis des architectures évolutives et mets en œuvre des pipelines CI/CD. Je contribue au développement de chatbots IA, gère les ressources cloud et modernise les systèmes existants. J'apprécie la collaboration, l'optimisation des processus et la livraison de solutions innovantes dans des environnements dynamiques.",
    experience: 'Expérience',
    experienceList: [
      {
        company: 'Lithia Motors, Inc.',
        role: 'Développeur de logiciels | Avril 2022 - Aujourd\'hui',
        duties: [
          'Utilisé React.js, ExpressJs et MongoDB/MySQL pour fournir des solutions full-stack.',
          'Architecturé et mis en œuvre un modèle de pipeline CI/CD "Build Once, Deploy Many".',
          'Maintenu et modernisé des applications existantes utilisées à travers le Canada.',
          "Contribué au développement d'un chatbot IA avec Next.js, Express.js et Azure Cloud Services.",
        ],
      },
      {
        company: 'Insyght.AI',
        role: 'Ingénieur Full Stack | Mai 2019 - Janvier 2021',
        duties: [
          'Travaillé sur le développement et la conception web Front-end et Back-end.',
          'Créé des solutions personnalisées avec Node.js, Java et des technologies de développement web réactives.',
        ],
      },
      {
        company: 'Infosys',
        role: 'Ingénieur système | Juin 2016 - Février 2018',
        duties: [
          'Créé des applications monopages (SPA) avec Angular 6, Spring Boot.',
          'Créé des API REST avec Spring Boot, des microservices et une expérience avec les conteneurs Docker.',
        ],
      },
    ],
    education: 'Éducation',
    educationList: [
      {
        institution: 'Université de Windsor',
        degree: 'Master en ingénierie, Génie informatique (2018 - 2019)',
      },
      {
        institution: 'Université SRM',
        degree: "Baccalauréat, Informatique (2013 - 2016)",
      },
    ],
  },
};

export default function Home() {
  const [language, setLanguage] = useState('en');
  const t = content[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden p-4 md:p-8">
      <MatrixRain />
      <div className="relative z-10 w-full max-w-4xl mx-auto bg-black bg-opacity-75 p-6 rounded-lg shadow-lg">
        <button
          onClick={toggleLanguage}
          className="absolute top-4 right-4 bg-accent text-white py-1 px-3 rounded-md hover:bg-accent-secondary transition-colors"
        >
          {language === 'en' ? 'Français' : 'English'}
        </button>

        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-accent mb-2">
            {t.name}
          </h1>
          <p className="text-lg md:text-xl text-text/80">
            {t.title}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <aside className="md:col-span-1">
            <section className="mb-6">
              <h2 className="text-2xl font-bold font-heading text-accent-secondary mb-3">{t.contact}</h2>
              <ul className="text-text/90 space-y-1">
                <li>{t.address}</li>
                <li>{t.phone}</li>
                <li>{t.email}</li>
                <li><a href="https://www.linkedin.com/in/ajayvigneshwar-gb-b3b665179" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">{t.linkedin}</a></li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-bold font-heading text-accent-secondary mb-3">{t.skills}</h2>
              <ul className="text-text/90 space-y-1">
                {t.skillsList.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold font-heading text-accent-secondary mb-3">{t.languages}</h2>
              <ul className="text-text/90 space-y-1">
                {t.languagesList.map(lang => <li key={lang}>{lang}</li>)}
              </ul>
            </section>
          </aside>

          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">{t.summary}</h2>
              <p className="text-text/90">
                {t.summaryText}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">{t.experience}</h2>
              <div className="space-y-6">
                {t.experienceList.map(job => (
                  <div key={job.company}>
                    <h3 className="text-xl font-bold text-accent">{job.company}</h3>
                    <p className="text-sm text-text/70 mb-2">{job.role}</p>
                    <ul className="list-disc list-inside text-text/90 space-y-1">
                      {job.duties.map(duty => <li key={duty}>{duty}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">{t.education}</h2>
               <div className="space-y-3">
                {t.educationList.map(edu => (
                  <div key={edu.institution}>
                    <h3 className="text-xl font-bold text-accent">{edu.institution}</h3>
                    <p className="text-text/90">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
