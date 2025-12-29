"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// --- TEXT CONSTANTS ---
const STAGE_1_WORDS = [
  "We are the Nexus",
  "We Build AI Products",
  "Automate Your Business",
  "Transform Ideas into Software",
  "Empowering Innovation"
];

const STAGE_2_WORDS = [
  "AI-Driven Solutions",
  "Web Development Redefined",
  "Smart Automation for You",
  "Engineering the Future",
  "Designing Digital Experiences"
];

const STAGE_3_WORDS = [
  "Innovate with Us",
  "We Code the Future",
  "Automate Everything",
  "AI Meets Creativity",
  "Your Vision, Our Code"
];

const BACKGROUND_IMAGES = [
  "/hero_user_1.jpg", "/hero_user_2.png", "/hero_user_3.jpg",
  "/hero_user_4.png", "/hero_user_5.png", "/hero_user_1.jpg",
  "/hero_user_2.png", "/hero_user_3.jpg", "/hero_user_4.png",
];

// --- STAGE 1: TYPEWRITER COMPONENT ---
function TypewriterText({ words, onComplete }: { words: string[], onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink(prev => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typing logic
  useEffect(() => {
    if (index === words.length) {
      // Completed all words
      onComplete();
      return;
    }

    const currentWord = words[index];

    if (subIndex === currentWord.length + 1 && !isDeleting) {
      // Finished typing word, wait then delete
      setTimeout(() => setIsDeleting(true), 1200);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setIndex(prev => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, onComplete]);

  // Graceful handling if index exceeds bounds during transition
  const displayWord = words[index] || "";

  return (
    <span className="inline-block relative">
      {displayWord.substring(0, subIndex)}
      <span className={`absolute -right-1 top-0 h-full w-[2px] bg-white ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
}

// --- STAGE 2: SCATTERED FLOATING COMPONENT ---
function ScatteredText({ words, onComplete }: { words: string[], onComplete: () => void }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Show each word for 3 seconds then move to next
        if (index >= words.length) {
            onComplete();
            return;
        }

        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 3000);
        
        return () => clearInterval(interval);
    }, [index, words.length, onComplete]);

    if (index >= words.length) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                className="absolute flex gap-4 whitespace-nowrap"
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {words[index].split(" ").map((word, i) => (
                    <motion.span
                        key={`${word}-${i}`}
                        className="inline-block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
                        variants={{
                            hidden: { 
                                opacity: 0, 
                                y: Math.random() * 60 - 30, 
                                x: Math.random() * 60 - 30,
                                filter: "blur(8px)"
                            },
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                x: 0, 
                                filter: "blur(0px)",
                                transition: {
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    type: "spring"
                                }
                            },
                            exit: { 
                                opacity: 0, 
                                y: -50, 
                                filter: "blur(10px)",
                                transition: { duration: 0.5 }
                            }
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        </AnimatePresence>
    );
}

// --- STAGE 3: RANDOM REVEAL COMPONENT ---
function RandomRevealText({ words, onComplete }: { words: string[], onComplete: () => void }) {
    const [index, setIndex] = useState(0);
    const [revealKey, setRevealKey] = useState(0); // Force re-render for random animation

    useEffect(() => {
        if (index >= words.length) {
            onComplete();
            return;
        }

        const timeout = setTimeout(() => {
            setIndex(prev => prev + 1);
            setRevealKey(prev => prev + 1);
        }, 4000); // 4 seconds per sentence

        return () => clearTimeout(timeout);
    }, [index, words.length, onComplete]);

    if (index >= words.length) return null;

    const currentSentenceWords = words[index].split(" ");
    
    // Create a random order for indices
    const indices = currentSentenceWords.map((_, i) => i);
    const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
    
    // Map original index to its delay order
    const delayMap = new Map();
    shuffledIndices.forEach((originalIndex, order) => {
        delayMap.set(originalIndex, order * 0.15); // 0.15s delay between each random word appearance
    });

    return (
        <motion.div 
            key={revealKey}
            className="flex gap-3 relative"
            animate={{
                y: [0, -10, 5, -5, 0], // Subtle floating after reveal
                x: [0, 5, -5, 3, 0],
            }}
            transition={{
                duration: 4,
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: "easeInOut"
            }}
        >
            {currentSentenceWords.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.5,
                        delay: delayMap.get(i), // Random delay
                        ease: "easeOut"
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

// --- PARALLAX IMAGE COMPONENT ---
function ParallaxImage({ el, mouseX, mouseY }: { el: any, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
    // Unique depth factor for each image (random between 20 and 80)
    // We use a fixed value based on the element's start properties to keep it stable across renders if useMemo isn't enough
    const depth = 20 + (el.id * 10) % 60; // Deterministic depth based on ID to avoid hydration mismatch
    
    const x = useTransform(mouseX, [-1, 1], [-depth, depth]);
    const y = useTransform(mouseY, [-1, 1], [-depth, depth]);

    return (
        <motion.div
            className="absolute aspect-[4/3] w-64 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm"
            style={{ x, y }} // Apply parallax here
            initial={{ top: `${el.startTop}%`, left: `${el.startLeft}%`, scale: el.scale, opacity: 0 }}
            animate={{ 
                top: [`${el.startTop}%`, `${el.endTop}%`], 
                left: [`${el.startLeft}%`, `${el.endLeft}%`],
                opacity: [0, 0.4, 0],
            }}
            transition={{ duration: el.duration, ease: "linear", repeat: Infinity, delay: el.delay }}
        >
            <Image src={el.src} alt="Background" fill className="object-cover" />
        </motion.div>
    );
}

// --- MAGNETIC BUTTON COMPONENT ---
function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouse = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX, y: middleY });
    };
  
    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };
  
    const { x, y } = position;
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

// --- MAIN HERO COMPONENT ---
export function Hero() {
  const [phase, setPhase] = useState(1); // 1, 2, or 3
  const [isMounted, setIsMounted] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Background animation logic (memoized)
  const backgroundElements = useMemo(() => {
    return BACKGROUND_IMAGES.map((src, i) => {
      const startLeft = Math.random() * 100;
      const startTop = Math.random() * 100;
      return {
        src,
        id: i,
        startLeft,
        startTop,
        endLeft: Math.random() > 0.5 ? 110 : -10,
        endTop: Math.random() > 0.5 ? 110 : -10,
        duration: 25 + Math.random() * 20,
        delay: Math.random() * -20,
        scale: 0.5 + Math.random() * 0.5,
      };
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse position to -1 to 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Phase Transition Logic
  const handlePhaseComplete = () => {
    setPhase((prev) => (prev === 3 ? 1 : prev + 1));
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#0A0A0A] px-4 py-24 text-white md:px-12 lg:px-20">
      
      {/* --- Background --- */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isMounted && backgroundElements.map((el) => (
            <ParallaxImage key={el.id} el={el} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        
        {/* Top Badges */}
        <div className="flex w-full items-start justify-between">
            <div className="rounded-r-xl rounded-bl-xl border-l-4 border-t border-b border-r border-white/10 border-l-white bg-white/5 px-6 py-3 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase leading-tight tracking-widest text-zinc-400">
                    Innovative <br /> IT-Solutions
                </p>
            </div>
            <div className="hidden rounded-l-xl rounded-br-xl border-r-4 border-t border-b border-l border-white/10 border-r-white bg-white/5 px-6 py-3 backdrop-blur-sm md:block">
                <p className="text-xs font-bold uppercase leading-tight tracking-widest text-right text-zinc-400">
                    Program <br /> Products
                </p>
            </div>
        </div>

        {/* Center: Title & Animation */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <div className="relative flex flex-col items-center">
              {/* Glowing Nebula Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120%] h-[120%] z-[-1] pointer-events-none">
                  <motion.div
                    className="w-full h-full rounded-full blur-[80px] opacity-40"
                    animate={{
                        background: [
                            "radial-gradient(closest-side, rgba(59,130,246,0.6), transparent)", // Blue
                            "radial-gradient(closest-side, rgba(168,85,247,0.6), transparent)", // Purple
                            "radial-gradient(closest-side, rgba(6,182,212,0.6), transparent)", // Cyan
                            "radial-gradient(closest-side, rgba(59,130,246,0.6), transparent)", // Loop
                        ],
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                  />
              </div>

              <h1 className="relative text-[12vw] font-bold leading-none tracking-tighter text-white mix-blend-overlay md:text-[15vw]">
                  NEXUS
              </h1>
              
              {/* --- ANIMATION CONTAINER --- */}
              <div className="relative flex h-32 w-full items-center justify-center text-center text-xl font-light tracking-widest md:text-3xl text-zinc-300">
                {isMounted && (
                    <>
                        {phase === 1 && (
                            <TypewriterText 
                                words={STAGE_1_WORDS} 
                                onComplete={handlePhaseComplete} 
                            />
                        )}
                        {phase === 2 && (
                            <ScatteredText 
                                words={STAGE_2_WORDS} 
                                onComplete={handlePhaseComplete} 
                            />
                        )}
                        {phase === 3 && (
                            <RandomRevealText 
                                words={STAGE_3_WORDS} 
                                onComplete={handlePhaseComplete} 
                            />
                        )}
                    </>
                )}
              </div>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-12 border-t border-white/10 pt-12 md:grid-cols-3 md:gap-4">
            {/* Rating */}
            <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                     <span className="text-3xl font-bold text-white">4.9/5</span>
                     <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                     </div>
                </div>
                <p className="max-w-[240px] text-xs leading-relaxed text-zinc-500">
                    The average rating of our quality and efficiency based on <span className="text-white">1000+ completed projects</span>
                </p>
            </div>

             {/* Buttons */}
            <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:justify-center">
                 <MagneticButton>
                     <button className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200">
                        <span className="relative z-10">Require a Call</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                     </button>
                 </MagneticButton>
                 
                 <MagneticButton>
                     <button className="whitespace-nowrap rounded-lg border border-white/20 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black">
                    See All Services
                     </button>
                 </MagneticButton>
            </div>

            {/* Description */}
            <div className="flex items-end justify-end">
                <p className="max-w-xs text-right text-sm leading-relaxed text-zinc-400">
                    We build <span className="text-white">powerful software</span> that simplifies your work and helps your business grow.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}
