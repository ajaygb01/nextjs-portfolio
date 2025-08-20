import React from 'react';

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  onSeeProjectsClick: () => void;
  onContactMeClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  title,
  bio,
  onSeeProjectsClick,
  onContactMeClick,
}) => {
  return (
    <div className="text-left">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        {name} <span className="blinking-cursor">_</span>
      </h1>
      <p className="text-lg text-[var(--muted)] mb-4">{title}</p>
      <p className="max-w-xl mb-6">{bio}</p>
      <div className="flex space-x-4">
        <button onClick={onSeeProjectsClick} className="button-style">
          Projects
        </button>
        <button onClick={onContactMeClick} className="button-style">
          Contact
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
