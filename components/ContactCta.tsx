"use client";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactCta = () => {
  const { register, handleSubmit } = useForm<FormData>();

  // TODO: Implement actual form submission logic (e.g., send to an API endpoint)
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Form submitted! Check the console for data.");
  };

  return (
    <section id="contact" className="w-full py-20 bg-surface">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 font-heading">Get in Touch</h2>
        <p className="text-text/80 mb-8 max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          {/* TODO: Replace with actual Calendly link */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-accent text-background font-bold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors">
            Schedule a Call (Calendly)
          </a>
          {/* TODO: Replace with actual email */}
          <a href="mailto:ajaygb7@gmail.com" className="bg-accent-secondary text-background font-bold py-3 px-6 rounded-lg hover:bg-accent-secondary/90 transition-colors">
            Send an Email
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto text-left">
          <div className="mb-4">
            <label htmlFor="name" className="block text-text/80 mb-2">Name</label>
            <input type="text" id="name" {...register("name")} className="w-full bg-background p-3 rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-text/80 mb-2">Email</label>
            <input type="email" id="email" {...register("email")} className="w-full bg-background p-3 rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-text/80 mb-2">Message</label>
            <textarea id="message" {...register("message")} rows={4} className="w-full bg-background p-3 rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
          </div>
          <button type="submit" className="w-full bg-accent text-background font-bold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactCta;
