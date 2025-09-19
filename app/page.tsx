import Hero from '@/components/Hero';
import ImpactStrip from '@/components/ImpactStrip';
import CaseStudyCard from '@/components/CaseStudyCard';
import Timeline from '@/components/Timeline';
import SkillsMatrix from '@/components/SkillsMatrix';
import ContactCta from '@/components/ContactCta';
import { caseStudies } from '@/data/caseStudies';
import SectionAnimator from '@/components/SectionAnimator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <SectionAnimator>
        <ImpactStrip />
      </SectionAnimator>
      <SectionAnimator>
        <section id="case-studies" className="w-full py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-heading">Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.title} {...study} />
              ))}
            </div>
          </div>
        </section>
      </SectionAnimator>
      <SectionAnimator>
        <Timeline />
      </SectionAnimator>
      <SectionAnimator>
        <SkillsMatrix />
      </SectionAnimator>
      <SectionAnimator>
        <ContactCta />
      </SectionAnimator>
    </main>
  );
}
