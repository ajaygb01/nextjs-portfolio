import React from 'react';
import { Project } from '@/data/projects';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
            ))}
        </div>
    </div>
  );
};

export default ProjectsGrid;
