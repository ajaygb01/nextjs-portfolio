import { jobs } from "@/data/jobs";

const Timeline = () => {
  return (
    <section id="timeline" className="w-full py-20 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-heading">Experience Timeline</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 w-0.5 h-full bg-accent/20"></div>
          {jobs.map((job, index) => (
            <div key={index} className="mb-8 flex justify-between items-center w-full">
              <div className="order-1 w-5/12"></div>
              <div className="z-10 flex items-center order-1 bg-accent text-background w-8 h-8 rounded-full shadow-xl">
                <h1 className="mx-auto font-semibold text-lg">{jobs.length - index}</h1>
              </div>
              <div className="order-1 bg-surface rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="font-bold text-text text-xl">{job.role}</h3>
                <p className="text-sm font-medium text-accent/80 mb-2">{job.company}</p>
                <p className="text-sm text-text/60">{job.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
