import React from 'react';

interface Role {
  company: string;
  position: string;
  duration: string;
  highlights: string[];
}

interface ExperienceTimelineProps {
  experience: Role[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  return (
    <section id="experience">
      <h2 className="text-3xl font-bold mb-6 text-center">Experience</h2>
      <div className="relative border-l-2 border-[var(--border)] pl-6">
        {experience.map((role, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <div className="absolute w-4 h-4 bg-[var(--primary)] rounded-full -left-2 mt-1.5"></div>
            <p className="text-sm text-[var(--muted)]">{role.duration}</p>
            <h3 className="text-xl font-bold text-[var(--primary)]">{role.position}</h3>
            <p className="text-lg mb-2">{role.company}</p>
            <ul className="list-disc list-inside text-[var(--fg)] space-y-1">
              {role.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
