import MatrixRain from '@/components/MatrixRain';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden p-4 md:p-8">
      <MatrixRain />
      <div className="relative z-10 w-full max-w-4xl mx-auto bg-black bg-opacity-75 p-6 rounded-lg shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-accent mb-2">
            Ajay Vigneshwar GB
          </h1>
          <p className="text-lg md:text-xl text-text/80">
            Software Developer @ Lithia Motors | React, Next.js, Express | CI/CD Pipelines | Azure Cloud & Docker
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <aside className="md:col-span-1">
            <section className="mb-6">
              <h2 className="text-2xl font-bold font-heading text-accent-secondary mb-3">Contact</h2>
              <ul className="text-text/90 space-y-1">
                <li>809-150 Hollywood crt, Cambridge</li>
                <li>+12269758056 (Home)</li>
                <li>aj.gb8056@gmail.com</li>
                <li><a href="https://www.linkedin.com/in/ajayvigneshwar-gb-b3b665179" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-bold font-heading text-accent-secondary mb-3">Top Skills</h2>
              <ul className="text-text/90 space-y-1">
                <li>Next.js</li>
                <li>Full-Stack Development</li>
                <li>Software Development</li>
                <li>Methodologies</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold font-heading text-accent-secondary mb-3">Languages</h2>
              <ul className="text-text/90 space-y-1">
                <li>English (Professional Working)</li>
                <li>Tamil (Native or Bilingual)</li>
                <li>French (Elementary)</li>
              </ul>
            </section>
          </aside>

          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">Summary</h2>
              <p className="text-text/90">
                Proficient in React.js, Next.js, Express.js, MongoDB, and MySQL. Currently at Lithia Motors, I manage multiple applications, maintain code efficiency, build scalable architectures, and implement CI/CD pipelines. I contribute to AI chatbot development, handle cloud resource management, and modernize legacy systems. I enjoy collaboration, process optimization, and delivering innovative solutions in dynamic environments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">Experience</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-accent">Lithia Motors, Inc.</h3>
                  <p className="text-sm text-text/70 mb-2">Software Developer | April 2022 - Present</p>
                  <ul className="list-disc list-inside text-text/90 space-y-1">
                    <li>Leveraged React.js, ExpressJs, and MongoDB/MySQL to deliver full-stack solutions.</li>
                    <li>Architected and implemented a "Build Once, Deploy Many" CI/CD pipeline model.</li>
                    <li>Maintained and modernized legacy applications used across Canada.</li>
                    <li>Contributed to the development of an AI chatbot using Next.js, Express.js, and Azure Cloud Services.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent">Insyght.AI</h3>
                  <p className="text-sm text-text/70 mb-2">Full Stack Engineer | May 2019 - January 2021</p>
                   <ul className="list-disc list-inside text-text/90 space-y-1">
                    <li>Worked on Front and Back-end web development and design.</li>
                    <li>Created custom solutions using Node.js, Java and responsive web development technologies.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent">Infosys</h3>
                  <p className="text-sm text-text/70 mb-2">System Engineer | June 2016 - February 2018</p>
                   <ul className="list-disc list-inside text-text/90 space-y-1">
                     <li>Created Single Page Applications (SPA) using Angular 6, Spring Boot.</li>
                     <li>Created REST APIs using Spring Boot, Microservices and experience with Docker containers.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold font-heading text-accent-secondary mb-4">Education</h2>
               <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-accent">University of Windsor</h3>
                  <p className="text-text/90">Master of Engineering, Computer Engineering (2018 - 2019)</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent">SRM University</h3>
                  <p className="text-text/90">Bachelor's degree, Computer Science (2013 - 2016)</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
