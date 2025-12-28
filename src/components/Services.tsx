"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Cloud, Bot, Palette, Briefcase } from "lucide-react";

const SERVICES = [
  {
    title: "Web Development",
    description: "Scalable, high-performance web applications built with modern frameworks like Next.js and React.",
    icon: Code,
  },
  {
    title: "Mobile Solutions",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
    icon: Smartphone,
  },
  {
    title: "Cloud Infrastructure",
    description: "Secure, resilient cloud architecting and DevOps automation on AWS, Azure, and GCP.",
    icon: Cloud,
  },
  {
    title: "AI & Data Science",
    description: "Machine learning models and data analytics to unlock actionable insights for your business.",
    icon: Bot,
  },
  {
    title: "Product Design",
    description: "User-centric UI/UX design that combines aesthetics with intuitive functionality.",
    icon: Palette,
  },
  {
    title: "IT Consulting",
    description: "Strategic technology roadmapping to align digital initiatives with business goals.",
    icon: Briefcase,
  },
];

export function Services() {
  return (
    <section className="relative w-full bg-transparent px-4 py-24 text-white md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 md:px-12">
        <div className="text-center md:text-left">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
            Our Expertise
          </h2>
          <h3 className="text-3xl font-bold md:text-5xl">
            Comprehensive <br /> IT Solutions
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-white/5"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white ring-1 ring-white/10 transition-all group-hover:bg-white group-hover:text-black">
                <service.icon className="h-6 w-6" />
              </div>
              
              <h4 className="mb-3 text-xl font-bold">{service.title}</h4>
              <p className="mb-6 text-sm text-zinc-400">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100">
                Learn More <span className="text-lg">→</span>
              </div>

              {/* Hover Glow */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-all group-hover:bg-white/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
