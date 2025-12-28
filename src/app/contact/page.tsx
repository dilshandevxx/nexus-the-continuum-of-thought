import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { Contact } from "@/components/Contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="relative w-full pt-20">
         <ParticleBackground />
         <div className="relative z-10">
            <Contact />
         </div>
      </div>
      <Footer />
    </main>
  );
}
