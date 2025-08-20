import React from 'react';

interface FooterProps {
    copyright: string;
    builtBy: {
        name: string;
        url: string;
    }
}

const Footer: React.FC<FooterProps> = ({ copyright, builtBy }) => {
  return (
    <footer className="text-center py-8 border-t border-[var(--border)] mt-16">
      <p className="text-sm text-[var(--muted)]">{copyright}</p>
      <p className="text-sm text-[var(--muted)]">
        <a href={builtBy.url} target="_blank" rel="noopener noreferrer">
          {builtBy.name}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
