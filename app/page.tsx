import MatrixRain from '@/components/MatrixRain';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold font-heading text-accent mb-4">
          Jules
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-text/80 mb-8">
          AI Engineer & Full-Stack Developer
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="text-accent hover:underline">GitHub</a>
          <a href="#" className="text-accent hover:underline">LinkedIn</a>
          <a href="#" className="text-accent hover:underline">Resume</a>
        </div>
      </div>
    </main>
  );
}
