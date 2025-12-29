import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning database...');
  await prisma.contactMessage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.techStack.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.admin.deleteMany();

  // 1. Projects
  await prisma.project.createMany({
    data: [
      {
        title: "Global Banking Platform",
        category: "FinTech",
        description: "A secure, high-performance dashboard for next-gen financial institutions.",
        gradient: "from-zinc-100 to-zinc-500",
        featured: true,
      },
      {
        title: "Luxury Retail Suite",
        category: "E-Commerce",
        description: "Immersive shopping experience for high-end fashion brands.",
        gradient: "from-white to-neutral-400",
        featured: true,
      },
      {
        title: "MedTech Analytics",
        category: "Healthcare",
        description: "AI-powered diagnostics dashboard for modern hospitals.",
        gradient: "from-zinc-200 to-zinc-600",
        featured: true,
      },
    ],
  })

  // 2. Services
  await prisma.service.createMany({
    data: [
        { title: "Web Development", description: "Scalable, high-performance web applications built with modern frameworks like Next.js and React.", icon: "Code" },
        { title: "Mobile Solutions", description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.", icon: "Smartphone" },
        { title: "Cloud Infrastructure", description: "Secure, resilient cloud architecting and DevOps automation on AWS, Azure, and GCP.", icon: "Cloud" },
        { title: "AI & Data Science", description: "Machine learning models and data analytics to unlock actionable insights for your business.", icon: "Bot" },
        { title: "Product Design", description: "User-centric UI/UX design that combines aesthetics with intuitive functionality.", icon: "Palette" },
        { title: "IT Consulting", description: "Strategic technology roadmapping to align digital initiatives with business goals.", icon: "Briefcase" },
    ]
  })

  // 3. Tech Stack
  await prisma.techStack.createMany({
    data: [
        { name: "React", category: "Frontend" },
        { name: "Next.js", category: "Frontend" },
        { name: "TypeScript", category: "Frontend" },
        { name: "Node.js", category: "Backend" },
        { name: "Python", category: "Backend" },
        { name: "AWS", category: "Cloud" },
        { name: "Docker", category: "Cloud" },
        { name: "Kubernetes", category: "Cloud" },
        { name: "TensorFlow", category: "AI" },
        { name: "PostgreSQL", category: "Backend" },
    ]
  })

   // 4. Testimonials
   await prisma.testimonial.createMany({
    data: [
        {
            quote: "Nexus didn't just build an app; they engineered a scalable business foundation. Their architectural decisions saved us millions in the long run.",
            author: "Sarah Jenkins",
            role: "CTO, FinEdge",
        },
        {
            quote: "The visual attention to detail is unmatched. We wanted 'premium' and they delivered something that feels like science fiction.",
            author: "Marcus Thorne",
            role: "Founder, LuxeRetail",
        },
        {
            quote: "Reliability was our #1 concern. Nexus delivered a system that hasn't had a single second of downtime in two years.",
            author: "Dr. Aris Vane",
            role: "Director, VitalHealth",
        }
    ]
   })

  // 5. Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@nexus.com' },
    update: {},
    create: {
      email: 'admin@nexus.com',
      password: passwordHash,
    },
  });

  console.log('Seeding completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
