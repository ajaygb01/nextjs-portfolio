type CaseStudyProps = {
  title: string;
  description: string;
  tags: string[];
};

const CaseStudyCard = ({ title, description, tags }: CaseStudyProps) => {
  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg transition-transform transform hover:-translate-y-2">
      <h3 className="text-2xl font-bold font-heading mb-2">{title}</h3>
      <p className="text-text/80 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-accent/10 text-accent text-sm font-mono px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyCard;
