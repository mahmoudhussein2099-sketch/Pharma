import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
