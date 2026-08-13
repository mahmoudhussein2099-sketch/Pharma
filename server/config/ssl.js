/**
 * SSL Configuration for HTTPS server
 * In production, you would use real SSL certificates from a certificate authority
 * For development, we generate self-signed certificates
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths for SSL certificates
const sslDir = path.join(__dirname, '../ssl');
const keyPath = path.join(sslDir, 'key.pem');
const certPath = path.join(sslDir, 'cert.pem');

/**
 * Generate self-signed SSL certificates for development
 */
const generateSelfSignedCertificates = () => {
  try {
    // Create SSL directory if it doesn't exist
    if (!fs.existsSync(sslDir)) {
      fs.mkdirSync(sslDir, { recursive: true });
    }

    // Check if certificates already exist
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      console.log('SSL certificates already exist');
      return { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) };
    }

    // Generate self-signed certificates using OpenSSL
    console.log('Generating self-signed SSL certificates...');
    
    // This requires OpenSSL to be installed on the system
    execSync(
      `openssl req -x509 -newkey rsa:4096 -keyout ${keyPath} -out ${certPath} -days 365 -nodes -subj "/CN=localhost"`,
      { stdio: 'inherit' }
    );

    console.log('SSL certificates generated successfully');
    return { key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) };
  } catch (error) {
    console.error('Error generating SSL certificates:', error);
    console.log('Falling back to HTTP (not secure)');
    return null;
  }
};

/**
 * Get SSL configuration for HTTPS server
 */
const getSSLConfig = () => {
  try {
    // For production, load real certificates
    if (process.env.NODE_ENV === 'production') {
      if (process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
        return {
          key: fs.readFileSync(process.env.SSL_KEY_PATH),
          cert: fs.readFileSync(process.env.SSL_CERT_PATH)
        };
      } else {
        console.warn('SSL certificate paths not provided in production environment');
        return null;
      }
    } 
    // For development, generate self-signed certificates
    else {
      return generateSelfSignedCertificates();
    }
  } catch (error) {
    console.error('Error loading SSL certificates:', error);
    return null;
  }
};

module.exports = { getSSLConfig };