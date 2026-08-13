const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'copy-result.txt');
let log = [];

try {
  const root = 'G:\\downloads';
  const dirs = fs.readdirSync(root);
  const adDirName = dirs.find(d => d.includes('اعلان'));
  log.push('adDirName: ' + adDirName);

  if (adDirName) {
    const adPath = path.join(root, adDirName);
    const subDirs = fs.readdirSync(adPath);
    log.push('subDirs: ' + JSON.stringify(subDirs));

    const campDir = subDirs.find(s => s.includes('campign'));
    if (campDir) {
      const srcCamp = path.join(adPath, campDir);
      const dstCamp = path.join(__dirname, 'public', 'images', 'campaigns');
      if (!fs.existsSync(dstCamp)) fs.mkdirSync(dstCamp, { recursive: true });
      const cFiles = fs.readdirSync(srcCamp);
      cFiles.forEach(f => {
        fs.copyFileSync(path.join(srcCamp, f), path.join(dstCamp, f));
      });
      log.push('Campaigns copied count: ' + cFiles.length);
    }
  }
} catch (err) {
  log.push('ERROR: ' + err.stack);
}

fs.writeFileSync(logFile, log.join('\n'), 'utf8');
