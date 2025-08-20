import React from 'react';

// Define the Project type right in this component file
// as it's only used here now.
interface Project {
  name: string;
  description: string;
  links: {
    live: string;
    docs?: string;
  };
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="border-b-2 border-dashed border-[var(--border)] pb-4 mb-4">
      <h3 className="font-bold text-xl mb-2">{project.name}</h3>
      <p className="text-sm text-[var(--secondary)] mb-2">{project.tags.join(' · ')}</p>
      <p className="mb-3">{project.description}</p>
      <div>
        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="button-style">
          View Live
        </a>
        {project.links.docs && (
          <a href={project.links.docs} target="_blank" rel="noopener noreferrer" className="button-style ml-2">
            Documentation
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
