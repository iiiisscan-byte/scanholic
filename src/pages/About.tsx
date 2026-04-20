import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">회사소개</h1>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="text-xl leading-relaxed mb-12">
            스캔홀릭은 아날로그 데이터의 완벽한 디지털화를 추구하는 전문 기업입니다.<br />
            최첨단 스캐너 장비와 독자적인 이미지 처리 기술을 바탕으로, 고객의 소중한 자산을 영구적으로 보존하고 활용 가치를 극대화합니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">우리의 비전</h2>
              <p>
                모든 아날로그 정보가 디지털 세계에서 새로운 생명력을 얻도록 돕는 것.<br />
                그것이 스캔홀릭의 존재 이유입니다.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">핵심 가치</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>정밀성:</strong> 원본의 미세한 디테일까지 놓치지 않는 완벽한 스캐닝</li>
                <li><strong>안전성:</strong> 원본 훼손없는 비파괴 스캔 추구</li>
                <li><strong>혁신성:</strong> OCR 및 이미지 보정 기술의 지속적인 연구 개발</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
