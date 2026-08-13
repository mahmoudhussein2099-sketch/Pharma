const { execSync } = require('child_process');

try {
  // Kill process on port 3000 for Windows
  execSync('netstat -ano | findstr :3000', { stdio: 'pipe' });
  execSync('for /f "tokens=5" %a in (\'netstat -ano ^| findstr :3000\') do taskkill /PID %a /F', { shell: true });
  console.log('Port 3000 has been freed');
} catch (error) {
  // Port might already be free
  console.log('Port 3000 is already free or no process found');
}