"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent px-4 py-24 text-white md:px-12 lg:px-20">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -right-20 top-20 z-0 opacity-[0.03]">
        <span className="text-[15vw] font-bold leading-none">LET'S TALK</span>
      </div>
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-8 md:px-12 lg:flex-row">
        
        {/* Contact Info */}
        <div className="flex flex-1 flex-col justify-center gap-10">
            <div>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
                    Get in Touch
                </h2>
                <h3 className="mb-6 text-4xl font-bold md:text-5xl">
                    Ready to Transform <br /> Your Business?
                </h3>
                <p className="max-w-md text-lg text-zinc-500">
                    Let's discuss how we can help you achieve your digital goals. Reach out to us for a consultation.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                {[
                    { icon: Mail, label: "Email Us", value: "hello@nexus-agency.com" },
                    { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                    { icon: MapPin, label: "Visit Us", value: "101 Tech Blvd, San Francisco, CA" }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        className="group flex items-center gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-white/10 hover:bg-white/5"
                        whileHover={{ x: 10 }}
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                            <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-zinc-400">{item.label}</h4>
                            <p className="text-lg font-medium">{item.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1">
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl md:p-12"
          >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="group flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">First Name</label>
                    <input type="text" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/50 focus:bg-white/10 focus:outline-none" placeholder="John" />
                </div>
                <div className="group flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">Last Name</label>
                    <input type="text" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/50 focus:bg-white/10 focus:outline-none" placeholder="Doe" />
                </div>
            </div>
            
            <div className="group flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">Email Address</label>
                <input type="email" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/50 focus:bg-white/10 focus:outline-none" placeholder="john@example.com" />
            </div>

            <div className="group flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">Message</label>
                <textarea rows={4} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/50 focus:bg-white/10 focus:outline-none" placeholder="Tell us about your project..." />
            </div>

            <button className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-center font-bold text-black transition-all hover:bg-zinc-200">
                Send Message
                <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.form>
        </div>

      </div>
    </section>
  );
}
