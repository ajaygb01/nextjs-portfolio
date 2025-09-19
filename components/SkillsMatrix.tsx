const skillsData = {
  "Frontend": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  "Backend": ["FastAPI", "Python", "Node.js", "Express"],
  "Data/ETL": ["SQL", "PostgreSQL", "MongoDB", "Pandas"],
  "DevOps": ["Azure", "Docker", "CI/CD", "GitHub Actions"],
  "AI": ["OpenAI API", "LangChain", "Vector Databases", "LLM Fine-tuning"],
  "Leadership": ["Agile", "Scrum", "Project Management", "Mentoring"],
};

const SkillsMatrix = () => {
  return (
    <section id="skills" className="w-full py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-heading">Skills Matrix</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="bg-surface p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-accent mb-4">{category}</h3>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill} className="text-text/80">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
