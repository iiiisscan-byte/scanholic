import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--color-scan-point)] text-[var(--color-scan-bg)] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">?¤ìº” ?€ë¦?/h2>
            <p className="text-sm text-gray-400 mb-2">
              ?„ë¬¸ ?¤ìº?ˆë? ?œìš©??B2B/B2C ?”ì??¸í™” ?œë¹„???œê³µ
            </p>
            <address className="not-italic text-sm text-gray-400 leading-relaxed">
              ê²½ê¸°???©ì¸??ê¸°í¥êµ??¥ë•1ë¡?3<br />
              ?¥ë•ITë°¸ë¦¬ ì»´í”Œ?‰ìŠ¤ B??508??br />
              <a href="tel:031-273-9175" className="hover:text-white transition-colors">031-273-9175</a> | <a href="mailto:scanholic25@gmail.com" className="hover:text-white transition-colors">scanholic25@gmail.com</a>
            </address>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">?Œì‚¬?Œê°œ</Link></li>
              <li><Link to="/tech" className="hover:text-white transition-colors">ê¸°ìˆ </Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">?”ì??¸í™” ?œë¹„??/Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">?ë‹´ë¬¸ì˜</Link></li>
              <li><Link to="/location" className="hover:text-white transition-colors">?¤ì‹œ?”ê¸¸</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/terms" className="hover:text-white transition-colors">?´ìš©?½ê?</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">ê°œì¸?•ë³´ì²˜ë¦¬ë°©ì¹¨</Link></li>
            </ul>
            
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ?¤ìº” ?€ë¦? All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed & Built for Professional Digitalization.</p>
        </div>
      </div>
    </footer>
  );
}
