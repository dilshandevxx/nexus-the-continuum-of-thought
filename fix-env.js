const fs = require('fs');
fs.writeFileSync('.env', 'DATABASE_URL="file:./dev.db"', { encoding: 'utf-8' });
console.log('.env fixed (UTF-8)');
