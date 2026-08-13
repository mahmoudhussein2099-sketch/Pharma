import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// The "hidden gateway" previously used a hardcoded client-side access code,
// which provides no real security. It now routes directly to the protected
// admin login (/admin/login), which is backed by the real admin API.
const AdminAccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  return null;
};

export default AdminAccess;
