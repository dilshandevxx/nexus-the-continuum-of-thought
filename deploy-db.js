const { execSync } = require('child_process');

console.log("Setting up database...");
try {
    process.env.DATABASE_URL = "postgresql://postgres:Dilshan775944600@db.nyrskezlhwqcanxryyuf.supabase.co:5432/postgres";
    
    console.log("Running: prisma generate");
    execSync('npx prisma generate', { stdio: 'inherit', env: process.env });

    console.log("Running: prisma db push");
    execSync('npx prisma db push', { stdio: 'inherit', env: process.env });

    console.log("Running: seed");
    execSync('npx tsx prisma/seed.ts', { stdio: 'inherit', env: process.env });
    
    console.log("Database successfully deployed!");
} catch (error) {
    console.error("Deployment failed:", error.message);
    process.exit(1);
}
