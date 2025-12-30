import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { TechExpertise } from "@/components/TechExpertise";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { GridBackground } from "@/components/ui/GridBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <div className="relative w-full bg-black">
         <GridBackground />
         <div className="relative z-10">
            <About />
            <Services isPreview />
            <Portfolio />
            <TechExpertise />
            <Contact />
            <Footer />
         </div>
      </div>
    </main>
  );
}
