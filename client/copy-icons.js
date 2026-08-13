const fs = require('fs');
const path = require('path');

const src = 'G:\\downloads\\\u0627\u0639\u0644\u0627\u0646\\3d icons';
const dst = 'I:\\update 06-07-2025\\awon-pharmacy\\client\\public\\images\\3d-icons';

if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });

const files = fs.readdirSync(src).filter(f => f.endsWith('.png'));
files.forEach(f => {
  fs.copyFileSync(path.join(src, f), path.join(dst, f));
  console.log('Copied:', f);
});
console.log('Done. Total:', files.length);
