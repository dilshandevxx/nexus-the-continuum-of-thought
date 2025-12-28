import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { DetailedTechExpertise } from "@/components/DetailedTechExpertise";

export default function TechExpertisePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="relative w-full pt-20">
         <ParticleBackground />
         <div className="relative z-10">
            <DetailedTechExpertise />
         </div>
      </div>
      <Footer />
    </main>
  );
}
