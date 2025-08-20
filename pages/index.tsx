import React from 'react';
import { Analytics } from '@vercel/analytics/react';

// Import data
import { projects } from '../data/projects';
import { heroContent, aboutContent, experienceContent, footerContent } from '../data/content';

// Import components (some will be created/refactored in the next step)
import HeroSection from '@/app/component/modern-portfolio/heroSection';
import ProjectsGrid from '@/app/component/modern-portfolio/projectsGrid';
import ExperienceTimeline from '@/app/component/modern-portfolio/experienceTimeline';
import Footer from '@/app/component/modern-portfolio/footer';
import TerminalFrame from '@/app/component/TerminalFrame'; // This will be a new component

// A simple component to render the About section
const AboutSection = () => (
  <section id="about" className="py-16">
    <h2 className="text-2xl mb-4">{aboutContent.title}</h2>
    <ul className="list-disc list-inside space-y-2">
      {aboutContent.bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
    <a href={aboutContent.resumeUrl} className="button-style mt-4 inline-block">Download Resume</a>
  </section>
);

const IndexPage = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Analytics />
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="sticky top-0 z-50 bg-[var(--bg)] py-4 border-b border-[var(--border)]">
          <nav className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-[var(--primary)]">AJAY GB</h1>
            <ul className="flex space-x-6">
              <li><button onClick={() => handleScrollTo('about')}>About</button></li>
              <li><button onClick={() => handleScrollTo('projects')}>Projects</button></li>
              <li><a href="mailto:ajaygb7@gmail.com">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main className="py-12">
          <TerminalFrame title="~/hero">
            <HeroSection
              name={heroContent.name}
              title={heroContent.subline}
              bio={heroContent.oneLiner}
              onSeeProjectsClick={() => handleScrollTo('projects')}
              onContactMeClick={() => window.location.href = 'mailto:ajaygb7@gmail.com'}
            />
          </TerminalFrame>

          <AboutSection />

          <section id="experience" className="py-16">
             <ExperienceTimeline experience={experienceContent.roles} />
          </section>

          <section id="projects" className="py-16">
            <TerminalFrame title="~/projects">
              <ProjectsGrid projects={projects} />
            </TerminalFrame>
          </section>
        </main>

        <Footer
            copyright={footerContent.copyright}
            builtBy={footerContent.builtBy}
        />
      </div>
    </>
  );
};

export default IndexPage;
