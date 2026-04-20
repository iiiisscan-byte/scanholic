import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dbServices, setDbServices] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    fetch('http://localhost:8000/api/services')
      .then(res => res.json())
      .then(data => setDbServices(data))
      .catch(err => console.error('Failed to fetch services for nav:', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: '회사소개', path: '/about' },
    { 
      name: '기술', 
      path: '/tech',
      dropdown: [
        { name: '이미지 처리', path: '/tech#image-processing' },
        { name: 'OCR', path: '/tech#ocr' }
      ]
    },
    { 
      name: '디지털화 서비스', 
      path: '/services',
      dropdown: dbServices.map(service => ({
        name: service.title,
        path: `/services#service-${service.id}`
      }))
    },
    { name: '상담문의', path: '/contact' },
    { name: '오시는길', path: '/location' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-[var(--color-scan-bg)]/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="스캔홀릭 로고" className="w-8 h-8 object-cover rounded-sm" />
            <span className="text-2xl font-bold tracking-tighter">스캔 홀릭</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gray-600 flex items-center gap-1",
                    location.pathname === link.path ? "text-black" : "text-gray-800"
                  )}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown */}
                {link.dropdown && link.dropdown.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-max min-w-[12rem] bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                    <div className="py-2">
                      {link.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          to={dropItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black whitespace-nowrap"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link to="/admin" className="text-xs text-gray-400 hover:text-black transition-colors ml-4">
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-scan-bg)] border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-2">
                  <Link 
                    to={link.path}
                    className="block text-lg font-medium text-black"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && link.dropdown.length > 0 && (
                    <div className="pl-4 space-y-2 border-l-2 border-gray-300">
                      {link.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          to={dropItem.path}
                          className="block text-sm text-gray-600"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-300">
                <Link to="/admin" className="text-sm font-medium text-gray-500">
                  관리자 페이지
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
