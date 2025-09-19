"use client";

const ContactCta = () => {
  return (
    <section id="contact" className="w-full py-20 bg-surface">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 font-heading">Get in Touch</h2>
        <p className="text-text/80 mb-8 max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <a href="https://wa.me/918056189086" target="_blank" rel="noopener noreferrer" className="bg-accent text-background font-bold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors">
            WhatsApp
          </a>
          <a href="mailto:ajaygb7@gmail.com" className="bg-accent-secondary text-background font-bold py-3 px-6 rounded-lg hover:bg-accent-secondary/90 transition-colors">
            Email
          </a>
          <a href="https://www.linkedin.com/in/ajay-vigneshwar-gb-b3b665179/" target="_blank" rel="noopener noreferrer" className="bg-accent text-background font-bold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactCta;
