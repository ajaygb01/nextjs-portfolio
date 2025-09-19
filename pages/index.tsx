import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

// Import data
import { projects } from '../data/projects';
import { heroContent, aboutContent, experienceContent, footerContent } from '../data/content';

// Import components
import Card from '../components/Card';
import ProjectCard from '../components/ProjectCard';

const IndexPage = () => {
    return (
        <>
            <Head>
                <title>Ajay GB - Portfolio</title>
                <meta name="description" content="The portfolio of Ajay GB, a full-stack developer." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Analytics />
            <div className="main-container">
                <div className="content-area">
                    <header className="header">
                        <h1 className="text-xl font-bold">./ajay_gb</h1>
                        <nav>
                            <ul className="flex space-x-2 font-mono">
                                <li><a href="#about" className="button-style">~/about</a></li>
                                <li><a href="#experience" className="button-style">~/experience</a></li>
                                <li><a href="#projects" className="button-style">~/projects</a></li>
                                <li><a href="mailto:ajaygb7@gmail.com" className="button-style">~/contact</a></li>
                            </ul>
                        </nav>
                    </header>

                    <main className="main-content">
                        {/* Hero Section */}
                        <Card title="~/hero">
                            <div className="text-lg">
                                <p className="text-2xl font-bold mb-2">{heroContent.name}</p>
                                <p className="mb-4">{heroContent.subline}</p>
                                <p className="italic">{heroContent.oneLiner}</p>
                            </div>
                        </Card>

                        {/* About Section */}
                        <section id="about" className="my-8">
                            <Card title="~/about">
                                <h2 className="text-2xl mb-4">{aboutContent.title}</h2>
                                <ul className="list-disc list-inside space-y-2">
                                    {aboutContent.bullets.map((bullet, index) => (
                                        <li key={index}><span className="text-[var(--secondary)]">{'>'}</span> {bullet}</li>
                                    ))}
                                </ul>
                                <a href={aboutContent.resumeUrl} className="mt-4 inline-block bg-[var(--accent)] text-[var(--bg)] px-4 py-2 rounded hover:bg-green-700 transition-colors">
                                    Download Resume
                                </a>
                            </Card>
                        </section>

                        {/* Experience Section */}
                        <section id="experience" className="my-8">
                            <Card title="~/experience">
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
                            </Card>
                        </section>

                        {/* Projects Section */}
                        <section id="projects" className="my-8">
                            <Card title="~/projects">
                                <h2 className="text-2xl mb-4">My Projects</h2>
                                <div className="space-y-8">
                                    {projects.map((project) => (
                                        <ProjectCard key={project.name} project={project} />
                                    ))}
                                </div>
                            </Card>
                        </section>
                    </main>

                    <footer className="footer">
                        <p className="text-sm text-[var(--secondary)]">{footerContent.copyright}</p>
                        <a href={footerContent.builtBy.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--secondary)] hover:underline">
                            {footerContent.builtBy.name}
                        </a>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default IndexPage;

export default IndexPage;
