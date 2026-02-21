import React, { useState } from 'react';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  userRole: 'admin' | 'teacher' | 'student';
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userRole, userName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = {
    admin: [
      { label: 'Dashboard', path: '/admin/dashboard' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Analytics', path: '/admin/analytics' },
      { label: 'Settings', path: '/admin/settings' },
    ],
    teacher: [
      { label: 'Dashboard', path: '/teacher/dashboard' },
      { label: 'Upload Materials', path: '/teacher/upload' },
      { label: 'Attendance', path: '/teacher/attendance' },
      { label: 'Meetings', path: '/teacher/meetings' },
      { label: 'Analytics', path: '/teacher/analytics' },
    ],
    student: [
      { label: 'Dashboard', path: '/student/dashboard' },
      { label: 'Materials', path: '/student/materials' },
      { label: 'Quizzes', path: '/student/quizzes' },
      { label: 'Meetings', path: '/student/meetings' },
    ],
  };

  const currentNavItems = navItems[userRole];
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">HS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">HS LearnPath+</h1>
              <p className="text-xs text-muted-foreground -mt-1">Educational Hub</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {currentNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-card/50'
                }`}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-popover rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/settings')}
              className="p-2 hover:bg-card/50 rounded-lg transition-colors duration-200"
              aria-label="Settings"
            >
              <Settings size={20} className="text-muted-foreground" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut size={20} className="text-destructive-foreground" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-card/50 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-muted-foreground" />
              ) : (
                <Menu size={24} className="text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-border/10"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {currentNavItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium text-left ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-card/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;