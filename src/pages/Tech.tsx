import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Tech() {
  const [contents, setContents] = useState<any>({});
  const location = useLocation();

  useEffect(() => {
    fetch('/api/contents')
      .then(res => res.json())
      .then(data => setContents(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-16">ê¸°ìˆ </h1>
        
        <div className="space-y-24">
          <section id="image-processing" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{contents.tech_image_processing_title || 'ê³ ë„?”ëœ ?´ë?ì§€ ì²˜ë¦¬'}</h2>
                {contents.tech_image_processing_desc ? (
                  <div 
                    className="text-lg text-gray-600 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: contents.tech_image_processing_desc }}
                  />
                ) : (
                  <>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      ?¤ìº”?€ë¦?˜ ?…ì?ì¸ ?´ë?ì§€ ë³´ì • ê¸°ìˆ ?€ ?¼ì†?˜ê±°??ë³€?‰ëœ ?ë³¸???íƒœë¥?ë¶„ì„?˜ì—¬ ìµœì ???íƒœë¡?ë³µì›?©ë‹ˆ??
                    </p>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">1</span>
                        <span><strong>?¸ì´ì¦??œê±° ë°?? ëª…???¥ìƒ:</strong> ?¤ë˜??ë¬¸ì„œ??ë¯¸ì„¸???¸ì´ì¦ˆë? ?œê±°?˜ê³  ?¤ê³½? ì„ ?œë ·?˜ê²Œ ë³´ì •?©ë‹ˆ??</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">2</span>
                        <span><strong>?‰ìƒ ë³µì›:</strong> ë¹›ë°”???¬ì§„?´ë‚˜ ë¬¸ì„œ???ë˜ ?‰ìƒ???ì—°?¤ëŸ½ê²?ë³µì›?©ë‹ˆ??</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
              <div className="bg-gray-200 rounded-2xl h-96 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="Image Processing" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </section>

          <section id="ocr" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gray-200 rounded-2xl h-96 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80" alt="OCR Technology" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">{contents.tech_ocr_title || 'OCR (ê´‘í•™ ë¬¸ì ?¸ì‹)'}</h2>
                {contents.tech_ocr_desc ? (
                  <div 
                    className="text-lg text-gray-600 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: contents.tech_ocr_desc }}
                  />
                ) : (
                  <>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      ?¨ìˆœ???´ë?ì§€ ?Œì¼???„ë‹Œ, ê²€?‰ê³¼ ?¸ì§‘??ê°€?¥í•œ ?´ì•„?ˆëŠ” ?°ì´?°ë¡œ ë³€?˜í•©?ˆë‹¤.
                    </p>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">1</span>
                        <span><strong>?¤êµ­???¸ì‹:</strong> ?œêµ­?? ?ì–´, ?œì ??ë³µì¡???¤êµ­??ë¬¸ì„œ???’ì? ?•í™•?„ë¡œ ?¸ì‹?©ë‹ˆ??</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">2</span>
                        <span><strong>êµ¬ì¡°???°ì´??ë³€??</strong> ?? ê·¸ë˜?? ?¨ë½ êµ¬ì¡°ë¥?? ì??˜ë©° ?‘ì?, ?Œë“œ ???¸ì§‘ ê°€?¥í•œ ?¬ë§·?¼ë¡œ ?œê³µ?©ë‹ˆ??</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
