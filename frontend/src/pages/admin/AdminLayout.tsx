import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Building2, Inbox, LogOut } from 'lucide-react';
import { isLoggedIn, clearToken } from '../../services/adminApi';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-gray-900 text-white'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  }`;

const AdminLayout = () => {
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-gray-900">
              Sadguru Estate — Admin
            </span>
            <nav className="flex items-center gap-2">
              <NavLink to="/admin" end className={navLinkClass}>
                <Building2 className="h-4 w-4" /> Properties
              </NavLink>
              <NavLink to="/admin/leads" className={navLinkClass}>
                <Inbox className="h-4 w-4" /> Leads
              </NavLink>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
