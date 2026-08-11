import ScrollyCanvas from '@/components/ScrollyCanvas';
import ProfessionalJourney from '@/components/ProfessionalJourney';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SocialRail from '@/components/SocialRail';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] font-sans selection:bg-white/30">
      <SocialRail />
      <ScrollyCanvas />
      <Experience />
      <ProfessionalJourney />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
