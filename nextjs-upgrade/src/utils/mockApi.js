// This file provides mock API responses for development

// Mock admin login
export const mockAdminLogin = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check credentials
  if (email === 'admin@admin.com' && password === 'password') {
    return {
      success: true,
      token: 'mock-admin-token-12345',
      user: {
        id: 1,
        email: 'admin@admin.com',
        role: 'admin',
        name: 'Admin User'
      }
    };
  }
  
  // Failed login
  throw new Error('Invalid email or password');
};

// Mock user login
export const mockUserLogin = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check credentials
  if (email === 'user@example.com' && password === 'password') {
    return {
      success: true,
      token: 'mock-user-token-12345',
      user: {
        id: 2,
        email: 'user@example.com',
        role: 'user',
        name: 'Regular User'
      }
    };
  }
  
  // Failed login
  throw new Error('Invalid email or password');
};