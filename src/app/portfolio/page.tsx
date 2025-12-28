import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { DetailedPortfolio } from "@/components/DetailedPortfolio";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="relative w-full pt-20">
         <ParticleBackground />
         <div className="relative z-10">
            <DetailedPortfolio />
         </div>
      </div>
      <Footer />
    </main>
  );
}
