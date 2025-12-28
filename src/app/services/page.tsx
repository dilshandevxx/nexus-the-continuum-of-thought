import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServicesBackground } from "@/components/ui/ServicesBackground";
import { DetailedServices } from "@/components/DetailedServices";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="relative w-full pt-20">
         <ServicesBackground />
         <div className="relative z-10">
            <DetailedServices />
         </div>
      </div>
      <Footer />
    </main>
  );
}
