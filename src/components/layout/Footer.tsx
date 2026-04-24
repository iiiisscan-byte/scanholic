import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--color-scan-point)] text-[var(--color-scan-bg)] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">스캔홀릭</h2>
            <p className="text-sm text-gray-400 mb-2">
              전문 스캐너를 활용한 B2B/B2C 디지털화 서비스 제공
            </p>
            <address className="not-italic text-sm text-gray-400 leading-relaxed">
              경기도 용인시 기흥구 흥덕1로 13, 흥덕IT밸리 컴플렉스 B동 508호<br />
              사업자번호 : 124-52-67965 &nbsp;|&nbsp; 대표자 : 김수연<br />
              전화 : <a href="tel:031-273-9175" className="hover:text-white transition-colors">031-273-9175</a> &nbsp;|&nbsp; 이메일 : <a href="mailto:scanholic25@gmail.com" className="hover:text-white transition-colors">scanholic25@gmail.com</a>
            </address>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">회사소개</Link></li>
              <li><Link to="/tech" className="hover:text-white transition-colors">기술</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">디지털화 서비스</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">상담문의</Link></li>
              <li><Link to="/location" className="hover:text-white transition-colors">오시는길</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
            </ul>
            
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.556 1.7 4.8 4.27 6.05-.15.524-.48 1.764-.55 2.05-.08.34.11.34.25.24.11-.08 1.75-1.18 2.45-1.66.83.2 1.69.3 2.58.3 4.97 0 9-3.185 9-7.115C21 6.185 16.97 3 12 3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} 스캔홀릭. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed & Built for Professional Digitalization.</p>
        </div>
      </div>
    </footer>
  );
}
