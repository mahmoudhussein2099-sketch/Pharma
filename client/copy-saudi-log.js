const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Shadow\\.gemini\\antigravity\\brain\\6e50f974-823c-4e47-926b-d2f46f01aa6f';
const targetDir = 'I:\\update 06-07-2025\\awon-pharmacy\\client\\public\\images\\ads';

const bFiles = fs.readdirSync(brainDir);
const logs = [];

bFiles.forEach(f => {
  if (f.startsWith('products_catalog_saudi_banner')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'saudi_catalog_banner.jpg'));
    logs.push('Copied saudi_catalog_banner.jpg');
  }
  if (f.startsWith('prescription_rx_saudi_banner')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'saudi_rx_banner.jpg'));
    logs.push('Copied saudi_rx_banner.jpg');
  }
  if (f.startsWith('services_health_saudi_banner')) {
    fs.copyFileSync(path.join(brainDir, f), path.join(targetDir, 'saudi_services_banner.jpg'));
    logs.push('Copied saudi_services_banner.jpg');
  }
});

fs.writeFileSync('I:\\update 06-07-2025\\awon-pharmacy\\client\\copy_status.txt', logs.join('\n'), 'utf8');
