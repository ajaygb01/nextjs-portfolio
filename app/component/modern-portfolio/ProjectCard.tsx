import React from 'react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="border border-[var(--border)] p-4 rounded-lg flex flex-col h-full">
      <h3 className="text-xl text-[var(--primary)] font-bold mb-2">{project.name}</h3>
      <p className="text-[var(--fg)] flex-grow mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs bg-[rgba(0,255,65,0.1)] text-[var(--muted)] px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex space-x-4">
        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="button-style text-sm">
          Live Site
        </a>
        {project.links.docs && (
          <a href={project.links.docs} target="_blank" rel="noopener noreferrer" className="button-style text-sm">
            Docs
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
