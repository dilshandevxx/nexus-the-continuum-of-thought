import { Code, Bot, Layout, Cpu, Layers, type LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  gradient: string;
  icon: LucideIcon;
  // Details Content
  client: string;
  timeline: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  features: string[];
  techStack: string[];
}

export const ALL_PROJECTS: Project[] = [
  {
    id: "finedge-banking-core",
    category: "Web Development",
    title: "FinEdge Banking Core",
    shortDescription: "A secure, microservices-based banking ledger system handling 1M+ transactions daily.",
    fullDescription: "FinEdge required a complete overhaul of their legacy banking infrastructure. We engineered a high-performance, distributed ledger system capable of processing millions of transactions with near-zero latency.",
    gradient: "from-blue-600/20 to-purple-600/20",
    icon: Code,
    client: "FinEdge Global",
    timeline: "14 Months",
    role: "Full-Cycle Development",
    challenge: "Replacing a 20-year-old monolithic mainframe system without disrupting daily banking operations for 5 million customers.",
    solution: "We implemented a strangler-fig pattern migration, gradually replacing legacy modules with Go-based microservices running on Kubernetes. We utilized Kafka for event streaming and Postgres for consistent data storage.",
    results: [
      "99.999% system uptime achieved",
      "Transaction processing speed improved by 400%",
      "Infrastructure costs reduced by 35%"
    ],
    features: [
      "Real-time fraud detection",
      "Multi-currency ledger",
      "Automated compliance reporting",
      "Biometric authentication API"
    ],
    techStack: ["Go", "Kubernetes", "Kafka", "PostgreSQL", "React", "AWS"]
  },
  {
    id: "supportbot-3000",
    category: "AI Automation",
    title: "SupportBot 3000",
    shortDescription: "Automated customer support agent reducing ticket volume by 65%.",
    fullDescription: "An intelligent conversational AI designed to handle L1 and L2 support tickets autonomously, freeing up human agents for complex problem-solving.",
    gradient: "from-emerald-600/20 to-teal-600/20",
    icon: Bot,
    client: "TechStream Inc.",
    timeline: "4 Months",
    role: "AI Engineering",
    challenge: "Customer support was overwhelmed by repetitive queries, leading to long wait times and high churn.",
    solution: "We fine-tuned a vibrant LLM on the company's knowledge base and integrated it with their CRM. The bot uses RAG (Retrieval-Augmented Generation) to provide accurate, context-aware answers.",
    results: [
      "65% reduction in support ticket volume",
      "24/7 instant response capabilities",
      "$200k estimated annual savings"
    ],
    features: [
      "Context-aware conversation memory",
      "Auto-escalation to human agents",
      "Sentiment analysis",
      "Multi-language support"
    ],
    techStack: ["Python", "LangChain", "OpenAI GPT-4", "Pinecone", "FastAPI"]
  },
  {
    id: "luxeretail-launch",
    category: "Landing Page",
    title: "LuxeRetail Launch",
    shortDescription: "High-conversion landing page for a luxury fashion brand's seasonal drop.",
    fullDescription: "A visually stunning, immersive digital experience designed to showcase a limited-edition luxury fashion collection.",
    gradient: "from-orange-600/20 to-red-600/20",
    icon: Layout,
    client: "LuxeRetail",
    timeline: "3 Weeks",
    role: "Frontend Design & Dev",
    challenge: "The brand needed a digital presence that matched the exclusivity and craftsmanship of their physical products.",
    solution: "We built a WebGL-powered experience with smooth scroll-jacking animations, high-fidelity image loading, and a seamless checkout integration.",
    results: [
      "Sold out inventory in 48 hours",
      "12% conversion rate (industry avg 2-3%)",
      "Awarded 'Site of the Day' on Awwwards"
    ],
    features: [
      "WebGL cloth simulations",
      "Custom smooth scrolling",
      "Interactive lookbook",
      "Instant checkout"
    ],
    techStack: ["Next.js", "Three.js", "GSAP", "Shopify API", "Tailwind CSS"]
  },
  {
    id: "marketanalyst-agent",
    category: "Agentic AI",
    title: "MarketAnalyst Agent",
    shortDescription: "Autonomous AI agent that scrapes, analyzes, and reports on competitor pricing strategies.",
    fullDescription: "An autonomous agent system that monitors competitor activities, analyzes pricing shifts, and generates strategic reports for executive decision-making.",
    gradient: "from-indigo-600/20 to-violet-600/20",
    icon: Cpu,
    client: "RetailGiant Corp",
    timeline: "6 Months",
    role: "AI & Backend Dev",
    challenge: "Manual market research was too slow to react to dynamic pricing models of agile competitors.",
    solution: "We deployed a swarm of autonomous agents to scrape public data, normalize it, and run predictive analytics models to forecast competitor moves.",
    results: [
      "Real-time market visibility",
      "Dynamic pricing strategy enabled",
      "15% revenue increase in Q1"
    ],
    features: [
      "Autonomous web scraping",
      "Trend forecasting",
      "Automated PDF report generation",
      "Slack/Teams alerts"
    ],
    techStack: ["Python", "Playwright", "AutoGPT", "Pandas", "AWS Lambda"]
  },
  {
    id: "global-logistics-grid",
    category: "System Design",
    title: "Global Logistics Grid",
    shortDescription: "Distributed system architecture for real-time fleet tracking across 4 continents.",
    fullDescription: "A massive IoT-enabled tracking system providing real-time visibility into a fleet of 50,000+ vehicles and shipping containers globally.",
    gradient: "from-zinc-600/20 to-zinc-800/20",
    icon: Layers,
    client: "TransWorld Logistics",
    timeline: "18 Months",
    role: "System Architecture",
    challenge: "Tracking assets across inconsistent network zones with high latency and data loss issues.",
    solution: "We designed an edge-computing architecture where vehicle units cache data and sync incrementally. We used MQTT for lightweight messaging and TimescaleDB for time-series data.",
    results: [
      "99.8% data accuracy",
      "Reduced fuel theft by 20%",
      "Optimized route planning saved 1M miles"
    ],
    features: [
      "Offline-first data sync",
      "Geofencing alerts",
      "Driver behavior analytics",
      "predictive maintenance"
    ],
    techStack: ["Rust", "MQTT", "TimescaleDB", "React Native", "Azure IoT"]
  },
  {
    id: "healthverify-portal",
    category: "Web Development",
    title: "HealthVerify Portal",
    shortDescription: "HIPAA-compliant patient portal for secure medical record access.",
    fullDescription: "A secure gateway for patients to access lab results, schedule appointments, and communicate with providers, fully compliant with healthcare regulations.",
    gradient: "from-cyan-600/20 to-blue-600/20",
    icon: Code,
    client: "HealthPlus Systems",
    timeline: "9 Months",
    role: "Full Stack Dev",
    challenge: "Balancing strict security/compliance requirements with a user-friendly experience for elderly patients.",
    solution: "We implemented OAuth2 with MFA, end-to-end encryption for messages, and a high-contrast, accessible UI design.",
    results: [
      "100% HIPAA audit pass rate",
      "Reduced phone appointments by 40%",
      "High patient satisfaction score (4.8/5)"
    ],
    features: [
      "End-to-End Encrypted Chat",
      "Integration with EPIC EHR",
      "Appointment Scheduling",
      "Telehealth Video Integration"
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Socket.io", "WebRTC"]
  },
  {
    id: "coderefactor-auto",
    category: "Agentic AI",
    title: "CodeRefactor Auto",
    shortDescription: "AI agent that autonomously scans codebases and proposes optimization PRs.",
    fullDescription: "An internal developer tool that acts as an always-on senior engineer, reviewing code for performance bottlenecks and security vulnerabilities.",
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    icon: Cpu,
    client: "DevOps Solutions",
    timeline: "3 Months",
    role: "Internal Tooling",
    challenge: "Technical debt was accumulating faster than the team could address it.",
    solution: "Be built an agent that hooks into GitHub webhooks, analyzes changed files, runs static analysis, and uses an LLM to generate refactoring suggestions as Pull Requests.",
    results: [
      "Reduced technical debt by 25%",
      "Caught 10+ critical security bugs",
      "Improved code consistency"
    ],
    features: [
      "Automated PR generation",
      "Security vulnerability scanning",
      "Complexity analysis",
      "Documentation generation"
    ],
    techStack: ["TypeScript", "GitHub API", "OpenAI API", "Docker"]
  },
  {
    id: "neonenergy-fest",
    category: "Landing Page",
    title: "NeonEnergy Fest",
    shortDescription: "Event landing page with WebGL interactive background and ticket booking.",
    fullDescription: "The official digital hub for the year's biggest electronic music festival, featuring an immersive 3D environment.",
    gradient: "from-yellow-600/20 to-orange-600/20",
    icon: Layout,
    client: "Neon Events",
    timeline: "4 Weeks",
    role: "Creative Development",
    challenge: "Creating hype and handling massive traffic spikes during ticket release windows.",
    solution: "We used a serverless architecture to handle traffic bursts and created a highly shared 'virtual festival' preview using Three.js.",
    results: [
      "100k concurrent users at peak",
      "Tickets sold out in record time",
      "Viral social media engagement"
    ],
    features: [
      "3D Interactive Stage Preview",
      "Real-time ticket availability",
      "Spotify playlist integration",
      "Social sharing generator"
    ],
    techStack: ["Next.js", "Vercel", "Three.js", "Stripe"]
  },
];
