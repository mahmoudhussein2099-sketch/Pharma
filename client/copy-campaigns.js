const fs = require('fs');
const path = require('path');

const src = 'G:\\downloads\\\u0627\u0639\u0644\u0627\u0646\\campign';
const dst = 'I:\\update 06-07-2025\\awon-pharmacy\\client\\public\\images\\campaigns';

if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });

const files = fs.readdirSync(src);
let count = 0;
files.forEach(f => {
  const sPath = path.join(src, f);
  const dPath = path.join(dst, f);
  if (fs.statSync(sPath).isFile()) {
    fs.copyFileSync(sPath, dPath);
    console.log('Copied campaign asset:', f);
    count++;
  }
});
console.log('Total campaign assets copied:', count);
