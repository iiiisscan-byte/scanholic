import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Tech() {
  const [contents, setContents] = useState<any>({});
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:8000/api/contents')
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
        <h1 className="text-4xl md:text-5xl font-bold mb-16">기술</h1>
        
        <div className="space-y-24">
          <section id="image-processing" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{contents.tech_image_processing_title || '고도화된 이미지 처리'}</h2>
                {contents.tech_image_processing_desc ? (
                  <div 
                    className="text-lg text-gray-600 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: contents.tech_image_processing_desc }}
                  />
                ) : (
                  <>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      스캔홀릭의 독자적인 이미지 보정 기술은 훼손되거나 변색된 원본의 상태를 분석하여 최적의 상태로 복원합니다.
                    </p>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">1</span>
                        <span><strong>노이즈 제거 및 선명도 향상:</strong> 오래된 문서의 미세한 노이즈를 제거하고 윤곽선을 뚜렷하게 보정합니다.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">2</span>
                        <span><strong>색상 복원:</strong> 빛바랜 사진이나 문서의 원래 색상을 자연스럽게 복원합니다.</span>
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
                <h2 className="text-3xl font-bold mb-6">{contents.tech_ocr_title || 'OCR (광학 문자 인식)'}</h2>
                {contents.tech_ocr_desc ? (
                  <div 
                    className="text-lg text-gray-600 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: contents.tech_ocr_desc }}
                  />
                ) : (
                  <>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      단순한 이미지 파일이 아닌, 검색과 편집이 가능한 살아있는 데이터로 변환합니다.
                    </p>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">1</span>
                        <span><strong>다국어 인식:</strong> 한국어, 영어, 한자 등 복잡한 다국어 문서도 높은 정확도로 인식합니다.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0 mt-1">2</span>
                        <span><strong>구조화 데이터 변환:</strong> 표, 그래프, 단락 구조를 유지하며 엑셀, 워드 등 편집 가능한 포맷으로 제공합니다.</span>
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
