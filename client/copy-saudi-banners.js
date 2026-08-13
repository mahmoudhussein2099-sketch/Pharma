const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Shadow\\.gemini\\antigravity\\brain\\6e50f974-823c-4e47-926b-d2f46f01aa6f';
const targetDir = 'I:\\update 06-07-2025\\awon-pharmacy\\client\\public\\images\\ads';

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const files = fs.readdirSync(brainDir);

files.forEach(f => {
  if (f.startsWith('products_catalog_saudi_banner') && f.endsWith('.jpg')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'saudi_catalog_banner.jpg'));
    console.log('Copied saudi_catalog_banner.jpg');
  }
  if (f.startsWith('prescription_rx_saudi_banner') && f.endsWith('.jpg')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'saudi_rx_banner.jpg'));
    console.log('Copied saudi_rx_banner.jpg');
  }
  if (f.startsWith('services_health_saudi_banner') && f.endsWith('.jpg')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'saudi_services_banner.jpg'));
    console.log('Copied saudi_services_banner.jpg');
  }
});
