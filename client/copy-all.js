const fs = require('fs');
const path = require('path');

const root = 'G:\\downloads';
const adDirName = fs.readdirSync(root).find(d => d.includes('اعلان'));
console.log('adDirName:', adDirName);

if (adDirName) {
  const adPath = path.join(root, adDirName);
  const subDirs = fs.readdirSync(adPath);
  console.log('subDirs:', subDirs);

  // 1. Copy 3D icons
  const iconDir = subDirs.find(s => s.includes('3d icons'));
  if (iconDir) {
    const srcIcons = path.join(adPath, iconDir);
    const dstIcons = path.join(__dirname, 'public', 'images', '3d-icons');
    if (!fs.existsSync(dstIcons)) fs.mkdirSync(dstIcons, { recursive: true });
    fs.readdirSync(srcIcons).forEach(f => {
      fs.copyFileSync(path.join(srcIcons, f), path.join(dstIcons, f));
    });
    console.log('Icons copied:', fs.readdirSync(dstIcons).length);
  }

  // 2. Copy campaign banners
  const campDir = subDirs.find(s => s.includes('campign'));
  if (campDir) {
    const srcCamp = path.join(adPath, campDir);
    const dstCamp = path.join(__dirname, 'public', 'images', 'campaigns');
    if (!fs.existsSync(dstCamp)) fs.mkdirSync(dstCamp, { recursive: true });
    fs.readdirSync(srcCamp).forEach(f => {
      fs.copyFileSync(path.join(srcCamp, f), path.join(dstCamp, f));
    });
    console.log('Campaigns copied:', fs.readdirSync(dstCamp).length);
  }
}
