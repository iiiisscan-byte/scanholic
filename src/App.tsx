import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Popup } from './components/Popup';
import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Tech } from './pages/Tech';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Location } from './pages/Location';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Dashboard } from './pages/admin/Dashboard';
import { ContentManager } from './pages/admin/ContentManager';
import { ServiceManager } from './pages/admin/ServiceManager';
import { InquiryManager } from './pages/admin/InquiryManager';
import { Settings } from './pages/admin/Settings';

export default function App() {
  const [settings, setSettings] = useState<any>(null);
  const [popups, setPopups] = useState<any[]>([]);

  // 웹사이트 설정 불러오기 및 적용
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/settings');
        const data = await response.json();
        setSettings(data);
        
        // CSS 변수 업데이트
        const root = document.documentElement;
        if (data.primaryColor) root.style.setProperty('--primary-color', data.primaryColor);
        if (data.backgroundColor) root.style.setProperty('--bg-color', data.backgroundColor);
        
        // 폰트 설정
        if (data.fontFamily === 'Noto Serif KR') {
          root.style.setProperty('--font-family', '"Noto Serif KR", serif');
        } else {
          root.style.setProperty('--font-family', '"Pretendard", sans-serif');
        }

        // 웹사이트 제목 설정
        if (data.siteTitle) {
          document.title = data.siteTitle;
        }
      } catch (error) {
        console.error('Failed to apply settings:', error);
      }
    };

    const fetchPopups = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/popups');
        const data = await response.json();
        setPopups(data);
      } catch (error) {
        console.error('Failed to fetch popups:', error);
      }
    };

    fetchSettings();
    fetchPopups();
  }, []);

  return (
    <Router>
      <div className="fixed top-20 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-[100] flex flex-col gap-4 p-4 w-full max-w-md pointer-events-none">
        {popups.map((popup) => (
          <Popup key={popup.id} id={popup.id} title={popup.title} content={popup.content} />
        ))}
      </div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="tech" element={<Tech />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="location" element={<Location />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="services" element={<ServiceManager />} />
          <Route path="inquiries" element={<InquiryManager />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
