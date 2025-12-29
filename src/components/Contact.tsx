"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { submitContactForm } from "@/app/actions/contact";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [isPending, startTransition] = useTransition();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const result = await submitContactForm({ success: false }, formData);

      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message);
        console.error(result.errors);
      }
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent px-4 py-24 text-white md:px-12 lg:px-20">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -right-20 top-20 z-0 opacity-[0.03]">
        <span className="text-[15vw] font-bold leading-none">LET'S TALK</span>
      </div>
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-8 md:px-12 lg:flex-row">
        
        {/* Contact Info */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-1 flex-col justify-center gap-10"
        >
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
        </motion.div>

        {/* Contact Form */}
        <div className="flex-1">
          <motion.form 
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl md:p-12"
          >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="group flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">First Name</label>
                    <input 
                      {...register("firstName")}
                      type="text" 
                      className={cn(
                        "rounded-lg border bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/40 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/40",
                        errors.firstName ? "border-red-500/50" : "border-white/10"
                      )}
                      placeholder="John" 
                    />
                    {errors.firstName && <span className="text-xs text-red-400">{errors.firstName.message}</span>}
                </div>
                <div className="group flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">Last Name</label>
                    <input 
                      {...register("lastName")}
                      type="text" 
                      className={cn(
                        "rounded-lg border bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/40 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/40",
                        errors.lastName ? "border-red-500/50" : "border-white/10"
                      )}
                      placeholder="Doe" 
                    />
                    {errors.lastName && <span className="text-xs text-red-400">{errors.lastName.message}</span>}
                </div>
            </div>
            
            <div className="group flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">Email Address</label>
                <input 
                  {...register("email")}
                  type="email" 
                  className={cn(
                    "rounded-lg border bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/40 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/40",
                    errors.email ? "border-red-500/50" : "border-white/10"
                  )}
                  placeholder="john@example.com" 
                />
                {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
            </div>

            <div className="group flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400 transition-colors group-focus-within:text-white">Message</label>
                <textarea 
                  {...register("message")}
                  rows={4} 
                  className={cn(
                    "rounded-lg border bg-white/5 px-4 py-3 text-white placeholder-zinc-600 transition-all focus:border-white/40 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/40",
                    errors.message ? "border-red-500/50" : "border-white/10"
                  )}
                  placeholder="Tell us about your project..." 
                />
                {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
            </div>

            <button 
              disabled={isPending}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-center font-bold text-black transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
            </button>
          </motion.form>
        </div>

      </div>
    </section>
  );
}
