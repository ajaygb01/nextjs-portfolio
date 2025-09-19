import { caseStudies } from "@/data/caseStudies";

const JsonLdSchema = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ajay Vigneshwar GB",
    "url": "https://ajaygb.dev", // TODO: Replace with actual domain
    "jobTitle": "Senior Software Engineer",
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": caseStudies.map((study, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": study.title,
      "description": study.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
    </>
  );
};

export default JsonLdSchema;
