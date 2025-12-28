import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { About } from "@/components/About";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="relative w-full pt-20">
         <ParticleBackground />
         <div className="relative z-10">
            <About />
         </div>
      </div>
      <Footer />
    </main>
  );
}
