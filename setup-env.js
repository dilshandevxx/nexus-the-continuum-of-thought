const fs = require('fs');
const content = 'DATABASE_URL="postgresql://postgres:Dilshan775944600@db.nyrskezlhwqcanxryyuf.supabase.co:5432/postgres"';
fs.writeFileSync('.env', content, { encoding: 'utf-8' });
console.log('.env file created successfully');
