// src/services/adminApi.js
// Authenticated API helper for the admin panel.
// All admin endpoints live under /api/admin/* and require a Bearer token.
export const getToken = () =>
  typeof window !== 'undefined' ? window.localStorage.getItem('adminToken') : null;

export async function adminApi(path, { method = 'GET', body, formData } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (formData) {
    payload = formData;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const res = await fetch(`/api${path}`, { method, headers, body: payload });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('adminToken');
      window.localStorage.removeItem('user');
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}
