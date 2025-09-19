const impactData = [
  {
    metric: "-80%",
    description: "release time with Azure DevOps",
  },
  {
    metric: "+60%",
    description: "manual support reduction via AI assistant",
  },
  {
    metric: "Faster",
    description: "feature delivery with microservices rollout",
  },
];

const ImpactStrip = () => {
  return (
    <section className="w-full py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {impactData.map((item, index) => (
            <div key={index} className="p-6 rounded-lg">
              <p className="text-4xl font-bold text-accent mb-2">{item.metric}</p>
              <p className="text-text/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStrip;
