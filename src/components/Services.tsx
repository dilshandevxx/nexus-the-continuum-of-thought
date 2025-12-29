"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Smartphone, Cloud, Bot, Palette, Briefcase, MessageSquareText, Layers, Network, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    title: "Web Development",
    description: "Scalable, high-performance web applications built with modern frameworks like Next.js and React.",
    icon: Code,
  },
  {
    title: "AI & Data Science",
    description: "Machine learning models and data analytics that turn data into actionable business insights.",
    icon: Bot,
  },
  {
    title: "AI Automation & Chatbots",
    description: "Intelligent automation and AI-powered chatbots to streamline operations and enhance customer engagement.",
    icon: MessageSquareText,
  },
  {
    title: "Mobile Solutions",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
    icon: Smartphone,
  },
  {
    title: "Custom Software Development",
    description: "Tailor-made software solutions designed to meet specific business needs and scale with growth.",
    icon: Layers,
  },
  {
    title: "Cloud Infrastructure",
    description: "Secure, resilient cloud architecture and DevOps automation on AWS, Azure, and GCP.",
    icon: Cloud,
  },
  {
    title: "Product Design",
    description: "User-centric UI/UX design that blends aesthetics with intuitive, functional experiences.",
    icon: Palette,
  },
  {
    title: "API & System Integration",
    description: "Seamless integration of third-party services, APIs, and internal systems for smooth data flow.",
    icon: Network,
  },
  {
    title: "IT Consulting",
    description: "Strategic technology roadmapping to align digital initiatives with long-term business goals.",
    icon: Briefcase,
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing monitoring, updates, and support to keep systems secure, stable, and performant.",
    icon: Wrench,
  },
];

// --- TILT CARD COMPONENT ---
function TiltCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10"
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white ring-1 ring-white/10 transition-all group-hover:bg-white group-hover:text-black"
      >
        <service.icon className="h-6 w-6" />
      </div>
      
      <h4 style={{ transform: "translateZ(20px)" }} className="mb-3 text-xl font-bold">{service.title}</h4>
      <p style={{ transform: "translateZ(10px)" }} className="mb-6 text-sm text-zinc-400">
        {service.description}
      </p>
      
      <div style={{ transform: "translateZ(30px)" }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
        Learn More <span className="text-lg">→</span>
      </div>

      {/* Hover Glow */}
      <div className="absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-full bg-white/20 blur-3xl transition-all group-hover:bg-blue-500/20" />
    </motion.div>
  );
}


export function Services({ isPreview = false }: { isPreview?: boolean }) {
  const displayedServices = isPreview ? SERVICES.slice(0, 6) : SERVICES;

  return (
    <section className="relative w-full bg-transparent px-4 py-24 text-white md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div className="text-center md:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500"
              >
                Our Expertise
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold md:text-5xl"
              >
                Comprehensive <br /> IT Solutions
              </motion.h3>
            </div>
            
            {isPreview && (
                <Link 
                    href="/services" 
                    className="group hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black md:flex"
                >
                    View All Services
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 perspective-1000">
          {displayedServices.map((service, i) => (
             <TiltCard key={i} service={service} index={i} />
          ))}
        </div>
        
        {/* Mobile View All Button */}
        {isPreview && (
             <div className="mt-8 flex justify-center md:hidden">
                <Link 
                    href="/services" 
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black"
                >
                    View All Services
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
             </div>
        )}
      </div>
    </section>
  );
}
