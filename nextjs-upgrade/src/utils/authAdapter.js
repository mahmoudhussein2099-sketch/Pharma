// This adapter helps bridge the gap between the existing admin authentication
// and our new authentication system

export const setupAdminAuth = () => {
  // Check if we have an admin token from the old system
  const adminToken = localStorage.getItem('adminToken');
  
  if (adminToken) {
    // Create a user object for the new system
    const adminUser = {
      email: 'admin@admin.com', // Default admin email
      role: 'admin'
    };
    
    // Store in localStorage for the new system
    localStorage.setItem('user', JSON.stringify(adminUser));
  }
};

export const handleAdminLogin = (token) => {
  // Store the admin token (old system)
  localStorage.setItem('adminToken', token);
  
  // Create a user object for the new system
  const adminUser = {
    email: 'admin@admin.com', // Default admin email
    role: 'admin'
  };
  
  // Store in localStorage for the new system
  localStorage.setItem('user', JSON.stringify(adminUser));
};