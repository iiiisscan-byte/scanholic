import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-scan-bg)]">
      <Header />
      <main className="flex-grow pt-20">
        {/* pt-20 to account for sticky header */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
