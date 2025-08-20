import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

// Import data
import { projects } from '../data/projects';
import { heroContent, aboutContent, experienceContent, footerContent } from '../data/content';

// Import components
import TerminalFrame from '../components/TerminalFrame';
import ProjectCard from '../components/ProjectCard';

const IndexPage = () => {
    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head>
                <title>Ajay GB - Portfolio</title>
                <meta name="description" content="The portfolio of Ajay GB, a full-stack developer." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Analytics />
            <div className="container mx-auto px-4 max-w-4xl text-[var(--primary)]">
                <header className="sticky top-0 z-50 bg-[var(--bg)] py-4 mb-8">
                    <nav className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                        <h1 className="text-xl font-bold">./ajay_gb</h1>
                        <ul className="flex space-x-2 font-mono">
                            <li><button onClick={() => handleScrollTo('about')} className="button-style">~/about</button></li>
                            <li><button onClick={() => handleScrollTo('experience')} className="button-style">~/experience</button></li>
                            <li><button onClick={() => handleScrollTo('projects')} className="button-style">~/projects</button></li>
                            <li><a href="mailto:ajaygb7@gmail.com" className="button-style">~/contact</a></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    {/* Hero Section */}
                    <TerminalFrame title="~/hero">
                        <div className="text-lg">
                            <p className="text-2xl font-bold mb-2">{heroContent.name}</p>
                            <p className="mb-4">{heroContent.subline}</p>
                            <p className="italic">{heroContent.oneLiner}</p>
                        </div>
                    </TerminalFrame>

                    {/* About Section */}
                    <section id="about" className="my-16">
                        <TerminalFrame title="~/about">
                            <h2 className="text-2xl mb-4">{aboutContent.title}</h2>
                            <ul className="list-disc list-inside space-y-2">
                                {aboutContent.bullets.map((bullet, index) => (
                                    <li key={index}><span className="text-[var(--secondary)]">{'>'}</span> {bullet}</li>
                                ))}
                            </ul>
                            <a href={aboutContent.resumeUrl} className="mt-4 inline-block bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded hover:bg-green-700 transition-colors">
                                Download Resume
                            </a>
                        </TerminalFrame>
                    </section>

                    {/* Experience Section */}
                    <section id="experience" className="my-16">
                        <TerminalFrame title="~/experience">
                            <h2 className="text-2xl mb-4">{experienceContent.title}</h2>
                            <div className="space-y-6">
                                {experienceContent.roles.map((role, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-xl">{role.position} @ {role.company}</h3>
                                        <p className="text-sm text-[var(--secondary)] mb-2">{role.duration}</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            {role.highlights.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </TerminalFrame>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="my-16">
                        <TerminalFrame title="~/projects">
                            <h2 className="text-2xl mb-4">My Projects</h2>
                            <div className="space-y-8">
                                {projects.map((project) => (
                                    <ProjectCard key={project.name} project={project} />
                                ))}
                            </div>
                        </TerminalFrame>
                    </section>
                </main>

                <footer className="text-center py-8 border-t border-[var(--border)] mt-16">
                    <p className="text-sm text-[var(--secondary)]">{footerContent.copyright}</p>
                    <a href={footerContent.builtBy.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--secondary)] hover:underline">
                        {footerContent.builtBy.name}
                    </a>
                </footer>
            </div>
        </>
    );
};

export default IndexPage;
