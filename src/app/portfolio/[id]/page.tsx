import { ALL_PROJECTS } from "@/lib/portfolio-data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { ArrowLeft, CheckCircle, Calendar, User, Building } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all projects
export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = ALL_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />
      
      <div className="relative pt-20">
        <ParticleBackground />
        
        {/* HERO SECTION */}
        <section className="relative z-10 px-6 py-20 md:px-12 lg:px-20 lg:py-32">
            <div className="mx-auto max-w-7xl">
                
                {/* Back Link */}
                <Link href="/portfolio" className="mb-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-white">
                    <ArrowLeft className="h-4 w-4" /> Back to Works
                </Link>

                {/* Header Content */}
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
                    <div className="flex flex-col justify-center">
                        <div className="mb-6 flex items-center gap-4">
                            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
                            <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">{project.category}</span>
                        </div>
                        <h1 className="mb-8 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                            {project.title}
                        </h1>
                        <p className="text-xl leading-relaxed text-zinc-300">
                            {project.fullDescription}
                        </p>
                    </div>

                    {/* Meta Data Card */}
                    <div className="flex flex-col justify-center">
                         <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-12">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        <Building className="h-4 w-4" /> Client
                                    </div>
                                    <div className="text-lg font-semibold text-white">{project.client}</div>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        <Calendar className="h-4 w-4" /> Timeline
                                    </div>
                                    <div className="text-lg font-semibold text-white">{project.timeline}</div>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        <User className="h-4 w-4" /> Role
                                    </div>
                                    <div className="text-lg font-semibold text-white">{project.role}</div>
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                                        <CheckCircle className="h-4 w-4" /> Status
                                    </div>
                                    <div className="text-lg font-semibold text-white">Completed</div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="relative z-10 border-t border-white/5 bg-zinc-950 px-6 py-20 md:px-12 lg:px-20">
             <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
                
                {/* Left Col: Challenge & Solution */}
                <div className="flex flex-col gap-16 lg:col-span-8">
                    
                    {/* Challenge */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">The Challenge</h2>
                        <p className="text-lg leading-relaxed text-zinc-400">
                            {project.challenge}
                        </p>
                    </div>

                    {/* Solution */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">Our Solution</h2>
                        <p className="text-lg leading-relaxed text-zinc-400">
                            {project.solution}
                        </p>
                    </div>

                    {/* Tech Stack */}
                     <div>
                        <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl">Technologies Used</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Col: Key Results & Features */}
                <div className="flex flex-col gap-12 lg:col-span-4">
                    
                    {/* Key Results */}
                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                        <h3 className="mb-6 text-xl font-bold text-white">Key Outcomes</h3>
                        <ul className="flex flex-col gap-4">
                            {project.results.map((result, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br ${project.gradient}`} />
                                    <span className="text-zinc-400">{result}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Key Features */}
                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                        <h3 className="mb-6 text-xl font-bold text-white">Core Features</h3>
                        <ul className="flex flex-col gap-4">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-4 w-4 text-zinc-500" />
                                    <span className="text-zinc-400">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

             </div>
        </section>

        {/* NEXT PROJECT CTA */}
        <section className="relative z-10 border-t border-white/5 px-6 py-20 text-center md:px-12 lg:px-20">
             <div className="mx-auto max-w-3xl">
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your Project?</h2>
                <p className="mb-10 text-zinc-400">Let's build something extraordinary together.</p>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-zinc-200">
                    Get in Touch
                </Link>
             </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
