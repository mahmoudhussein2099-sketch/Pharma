const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Shadow\\.gemini\\antigravity\\brain\\6e50f974-823c-4e47-926b-d2f46f01aa6f';
const targetDir = 'I:\\update 06-07-2025\\awon-pharmacy\\client\\public\\images\\ads';

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const files = fs.readdirSync(brainDir);

files.forEach(f => {
  if (f.startsWith('products_catalog_banner') && f.endsWith('.jpg')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'products_catalog_banner.jpg'));
    console.log('Copied products_catalog_banner.jpg');
  }
  if (f.startsWith('prescription_rx_banner') && f.endsWith('.jpg')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'prescription_rx_banner.jpg'));
    console.log('Copied prescription_rx_banner.jpg');
  }
  if (f.startsWith('services_health_banner') && f.endsWith('.jpg')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'services_health_banner.jpg'));
    console.log('Copied services_health_banner.jpg');
  }
});
