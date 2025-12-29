const fs = require('fs');
const content = `DATABASE_URL="postgresql://postgres:Dilshan775944600@db.qtdnqdlcnrlekmvwbzoq.supabase.co:5432/postgres"`;
fs.writeFileSync('.env', content, { encoding: 'utf8' });
console.log('.env file updated with new credentials');
