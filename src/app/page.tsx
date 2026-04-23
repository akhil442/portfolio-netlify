import ScrollyCanvas from '@/components/ScrollyCanvas';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] font-sans selection:bg-white/30">
      <ScrollyCanvas />
      <Projects />
      <Experience />
      <Footer />
    </main>
  );
}
