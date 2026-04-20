import { motion } from 'framer-motion';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-12">스캔홀릭 이용약관</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제1조 (목적)</h2>
            <p>
              본 약관은 "스캔홀릭(ScanHolic)" (이하 "회사")이 제공하는 문서, 도면, 사진, 영상 등의 디지털화(스캔) 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제2조 (용어의 정의)</h2>
            <p>1. "이용자"란 회사에 스캔 대상물(문서, 도서 등)의 디지털화 작업을 의뢰하고 본 약관에 따라 회사가 제공하는 서비스를 받는 자를 말합니다.</p>
            <p>2. "스캔 대상물"이란 이용자가 디지털화(스캔)를 목적으로 회사에 제공하는 각종 문서, 도서, 도면, 필름, 표본 등의 실물 자산을 의미합니다.</p>
            <p>3. "결과물"이란 스캔 대상물을 스캔하여 생성된 디지털 파일(PDF, JPG, TIFF 등)을 의미합니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제3조 (서비스 신청 및 계약의 성립)</h2>
            <p>1. 이용자는 회사의 웹사이트(상담문의) 또는 유선 연락을 통해 서비스를 신청할 수 있습니다.</p>
            <p>2. 회사는 서비스 신청 내용을 확인한 후 견적을 산출하여 안내하며, 이용자가 견적을 승낙하고 스캔 대상물을 회사에 인도하거나 결제(계약금 등)를 진행한 시점에 계약이 성립된 것으로 봅니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제4조 (회사의 의무 및 파손 책임 한도)</h2>
            <p>1. 회사는 이용자가 의뢰한 스캔 대상물을 선량한 관리자의 주의의무를 다하여 보관하고 스캔 작업을 수행해야 합니다.</p>
            <p>2. 재단(파괴형) 스캔을 의뢰한 경우, 문서의 복원은 원칙적으로 제공되지 않으며 작업 후 폐기 또는 파쇄가 진행됩니다.</p>
            <p>3. 비파괴형 스캔의 경우 원본 훼손을 최소화하여 작업하나, 스캔 대상물의 노후화나 기기적 한계 등으로 인해 불가피하게 미세한 손상(종이 구김 등)이 발생할 수 있습니다.</p>
            <p>4. 회사의 명백한 고의 또는 중과실로 인하여 스캔 대상물이 분실 또는 훼손된 경우를 제외하고 회사는 손해배상 책임을 지지 않습니다. (손해배상 시 서비스 의뢰 비용을 초과할 수 없습니다.)</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제5조 (저작권 및 법적 책임)</h2>
            <p>1. <strong>가장 중요한 사항:</strong> 이용자는 자신이 의뢰하는 스캔 대상물에 대해 적법한 권리(저작권 등)를 보유하거나 적법하게 이용할 수 있는 권한을 가지고 있어야 합니다.</p>
            <p>2. 회사는 이용자의 요청에 따라 물리적 자료를 디지털 형식으로 변환하는 기술적 용역만을 제공합니다.</p>
            <p>3. 결과물의 무단 배포, 공유, 상업적 이용 등으로 발생하는 저작권법 등 관련 법률 위반에 대한 모든 책임은 전적으로 "이용자"에게 있으며, 이로 인해 회사가 제3자로부터 손해배상 청구를 받는 경우 이용자는 자신의 비용과 책임으로 회사를 면책시켜야 합니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제6조 (결과물의 보관 및 폐기)</h2>
            <p>1. 회사는 결과물(파일)을 이용자에게 전송하거나 전달 완료한 후, 개인정보보호 및 보안을 위하여 최대 30일(또는 협의된 기간) 이내에 서버에서 완전히 삭제(영구 파기)합니다.</p>
            <p>2. 이용자는 결과물을 전달받은 즉시 백업을 수행해야 하며, 회사의 데이터 파기 이후의 재다운로드 요청은 불가합니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제7조 (면책 조항)</h2>
            <p>1. 회사는 천재지변, 전쟁, 테러, 전력 차단, 통신망 장애 등 불가항력적 사유로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임을 지지 않습니다.</p>
            <p>2. 이용자가 제공한 연락처 오기재, 부재 등으로 인해 발생한 불이익(결과물 수령 지연 등)에 대하여 회사는 책임지지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">제8조 (관할법원)</h2>
            <p>본 약관과 관련된 회사와 이용자 간의 분쟁에 관한 소송은 회사의 본점 소재지를 관할하는 법원을 제1심 전속적 합의 관할법원으로 합니다.</p>
          </section>

          <div className="pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>부칙: 본 약관은 2026년 4월 9일부터 적용됩니다.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
