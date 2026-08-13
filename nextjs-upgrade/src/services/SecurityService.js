/**
 * Security Service for handling encryption, decryption, and security-related functionality
 * Uses the Web Crypto API for secure cryptographic operations
 */

// Generate a random encryption key
export const generateEncryptionKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
  
  return key;
};

// Export key to string format for storage
export const exportKey = async (key) => {
  const exported = await window.crypto.subtle.exportKey("jwk", key);
  return JSON.stringify(exported);
};

// Import key from string format
export const importKey = async (keyStr) => {
  const keyData = JSON.parse(keyStr);
  const key = await window.crypto.subtle.importKey(
    "jwk",
    keyData,
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
  
  return key;
};

// Encrypt data
export const encryptData = async (data, key) => {
  // Convert data to ArrayBuffer
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(JSON.stringify(data));
  
  // Generate initialization vector
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  // Encrypt the data
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    dataBuffer
  );
  
  // Convert encrypted data to Base64
  const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));
  const encryptedBase64 = btoa(String.fromCharCode.apply(null, encryptedArray));
  
  // Convert IV to Base64
  const ivBase64 = btoa(String.fromCharCode.apply(null, Array.from(iv)));
  
  // Return both the encrypted data and IV
  return {
    encryptedData: encryptedBase64,
    iv: ivBase64
  };
};

// Decrypt data
export const decryptData = async (encryptedObj, key) => {
  try {
    // Convert Base64 encrypted data back to ArrayBuffer
    const encryptedData = Uint8Array.from(atob(encryptedObj.encryptedData), c => c.charCodeAt(0));
    
    // Convert Base64 IV back to ArrayBuffer
    const iv = Uint8Array.from(atob(encryptedObj.iv), c => c.charCodeAt(0));
    
    // Decrypt the data
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv
      },
      key,
      encryptedData
    );
    
    // Convert decrypted data back to original format
    const decoder = new TextDecoder();
    const decryptedText = decoder.decode(decryptedBuffer);
    
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Hash sensitive data (like passwords) using SHA-256
export const hashData = async (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
  
  // Convert hash to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};

// Detect suspicious behavior based on various factors
export const calculateSuspiciousScore = (userBehavior) => {
  let score = 0;
  
  // Check for rapid page navigation
  if (userBehavior.pageChanges > 10 && userBehavior.timeOnSite < 30) {
    score += 0.3;
  }
  
  // Check for multiple failed login attempts
  if (userBehavior.failedLogins > 2) {
    score += 0.4;
  }
  
  // Check for unusual geolocation
  if (userBehavior.unusualLocation) {
    score += 0.2;
  }
  
  // Check for bot-like behavior
  if (userBehavior.noMouseMovement || userBehavior.tooFastInteractions) {
    score += 0.3;
  }
  
  return score;
};

// Secure localStorage wrapper with encryption
export const secureStorage = {
  // Initialize with a key
  async init() {
    let key = localStorage.getItem('encryptionKey');
    
    if (!key) {
      const newKey = await generateEncryptionKey();
      key = await exportKey(newKey);
      localStorage.setItem('encryptionKey', key);
    }
    
    return importKey(key);
  },
  
  // Set item with encryption
  async setItem(key, value) {
    const encryptionKey = await this.init();
    const encrypted = await encryptData(value, encryptionKey);
    localStorage.setItem(key, JSON.stringify(encrypted));
  },
  
  // Get item with decryption
  async getItem(key) {
    const encryptionKey = await this.init();
    const encryptedObj = JSON.parse(localStorage.getItem(key));
    
    if (!encryptedObj) return null;
    
    return decryptData(encryptedObj, encryptionKey);
  },
  
  // Remove item
  removeItem(key) {
    localStorage.removeItem(key);
  }
};

// Secure payment data handling
export const securePayment = {
  // Encrypt payment details before sending to server
  async encryptPaymentDetails(paymentDetails) {
    const key = await generateEncryptionKey();
    const encrypted = await encryptData(paymentDetails, key);
    
    // In a real app, you would securely transmit the key to the server
    // For demo purposes, we're just returning both
    return {
      encryptedPayment: encrypted,
      key: await exportKey(key)
    };
  },
  
  // Mask credit card number for display
  maskCreditCard(cardNumber) {
    if (!cardNumber) return '';
    const last4 = cardNumber.slice(-4);
    return `**** **** **** ${last4}`;
  }
};

export default {
  generateEncryptionKey,
  exportKey,
  importKey,
  encryptData,
  decryptData,
  hashData,
  calculateSuspiciousScore,
  secureStorage,
  securePayment
};