import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedScenarioImage, setSelectedScenarioImage] = useState<string | null>(null);
  const location = useLocation();
  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Failed to fetch services:', err));
  }, []);

  useLayoutEffect(() => {
    const isSamePage = lastPathname.current === location.pathname;

    if (location.hash && services.length > 0) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: isSamePage ? 'smooth' : 'auto' });
      }
    } else if (!location.hash && (!isSamePage || location.pathname === '/services')) {
      window.scrollTo({ top: 0, behavior: isSamePage ? 'smooth' : 'auto' });
    }
    
    lastPathname.current = location.pathname;
  }, [location, services]);

  useEffect(() => {
    if (selectedScenarioImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedScenarioImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-16">디지털화 서비스</h1>
        
        <div className="space-y-32">
          {services.map((service, index) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Image;
            const isEven = index % 2 === 0;
            return (
              <section key={service.id} id={`service-${service.id}`} className="scroll-mt-32">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    {service.scenario && (
                      <button 
                        onClick={() => setSelectedScenarioImage(service.scenario)}
                        className="px-6 py-3 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        디지털화 시나리오 보기 <LucideIcons.Search className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className={`bg-gray-200 rounded-2xl h-96 overflow-hidden flex items-center justify-center text-gray-400 ${!isEven ? 'lg:order-1' : ''}`}>
                    {service.image_url ? (
                      <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full text-center font-bold text-xl uppercase bg-gray-900/50 text-white flex flex-col items-center justify-center">
                        <Icon className="w-16 h-16 mb-4" />
                        <span>{service.icon || 'No Image'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedScenarioImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90"
            onClick={() => setSelectedScenarioImage(null)}
          >
            <div className="min-h-full flex flex-col items-center justify-start py-12 px-4 sm:px-6">
              <button 
                className="fixed top-6 right-6 z-[60] text-gray-300 bg-white/10 p-2 rounded-full hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
                onClick={() => setSelectedScenarioImage(null)}
              >
                <LucideIcons.X className="w-6 h-6" />
              </button>
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={selectedScenarioImage}
                alt="디지털화 시나리오 상세페이지"
                className="w-full max-w-5xl h-auto rounded-xl shadow-2xl relative z-50"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
