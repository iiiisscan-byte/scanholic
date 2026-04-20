import { motion } from 'framer-motion';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-12">개인정보처리방침</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p>
            "스캔홀릭(ScanHolic)" (이하 "회사"라 합니다)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">1. 개인정보의 처리 목적</h2>
            <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>서비스 예약 및 견적 상담 운영</li>
              <li>스캔 작업물 배송 및 파일 다운로드 링크 고지</li>
              <li>고객 불만 처리 및 민원 응대</li>
              <li>중요 공지사항 전달</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">2. 처리하는 개인정보 항목</h2>
            <p>회사는 상담 및 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>필수항목:</strong> 성명(이름), 연락처(휴대전화번호), 이메일 및 서비스 요청 사항</li>
              <li><strong>선택항목:</strong> 회사명/단체명</li>
              <li><strong>자동수집항목:</strong> 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 등</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">3. 개인정보의 처리 및 보유 기간</h2>
            <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 수집 시 동의받은 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>상담 및 견적 문의:</strong> 문의 처리 완료 후 6개월 보관 후 파기</li>
              <li><strong>계약 또는 청약철회 등에 관한 기록:</strong> 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
              <li><strong>대금결제 및 재화 등의 공급에 관한 기록:</strong> 5년 (상동)</li>
              <li><strong>소비자의 불만 또는 분쟁처리에 관한 기록:</strong> 3년 (상동)</li>
            </ul>
            <p className="mt-4 text-sm bg-gray-100 p-4 rounded-lg">
              <strong>※ 유의사항 (스캔 데이터의 파기):</strong>
              <br />고객님이 의뢰하신 각종 문서 및 도서의 무단 유출을 방지하기 위하여, 스캔이 완료된 디지털 결과물 데이터는 <strong>결과물 인도 완료 시점으로부터 최대 30일 보관 후 영구 삭제(Shredding)</strong> 처리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">4. 개인정보의 제3자 제공</h2>
            <p>회사는 원칙적으로 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 이용자의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 결제 처리나 택배 배송 등 서비스 이행을 위해 필요한 최소한의 범위 내에서 외주업체(택배사, PG사)에 제공될 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">5. 정보주체의 권리·의무 및 행사방법</h2>
            <p>1. 이용자는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>개인정보 열람요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제요구 (단, 타 법령에서 보관이 의무화된 경우 예외)</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="mt-4">2. 권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">6. 개인정보의 파기절차 및 방법</h2>
            <p>회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다.</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>전자적 파일 형태: 기록을 재생할 수 없는 기술적 방법을 사용하여 파기</li>
              <li>종이 문서: 분쇄기로 파쇄하거나 소각하여 파기</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">7. 개인정보 보호책임자</h2>
            <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-4">
              <ul className="space-y-2 text-sm">
                <li><strong>성명 (직책):</strong> 홍길동 대표 (수정요망)</li>
                <li><strong>연락처:</strong> 031-273-9175</li>
                <li><strong>이메일:</strong> scanholic25@gmail.com</li>
              </ul>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>본 개인정보처리방침은 2026년 4월 9일부터 적용됩니다.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
