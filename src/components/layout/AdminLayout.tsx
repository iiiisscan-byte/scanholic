import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, MessageSquare, Layers, LogOut } from 'lucide-react';
import { cn } from './Header';
import { Login } from '../../pages/admin/Login';

export function AdminLayout() {
  const location = useLocation();
  const token = sessionStorage.getItem('admin_token');

  if (!token) {
    return <Login />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    window.location.reload();
  };

  const navItems = [
    { name: '?€?œë³´??, path: '/admin', icon: LayoutDashboard },
    { name: 'ì½˜í…ì¸?ê´€ë¦?, path: '/admin/content', icon: FileText },
    { name: '?œë¹„??ê´€ë¦?, path: '/admin/services', icon: Layers },
    { name: '?ë‹´ë¬¸ì˜ ê´€ë¦?, path: '/admin/inquiries', icon: MessageSquare },
    { name: '?”ì???¤ì •', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-black tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 bg-black flex items-center justify-center rounded-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            Admin
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-black text-white" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            ë¡œê·¸?„ì›ƒ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.path === location.pathname)?.name || 'ê´€ë¦¬ì ?˜ì´ì§€'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">ê´€ë¦¬ì???˜ì˜?©ë‹ˆ??</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              A
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
