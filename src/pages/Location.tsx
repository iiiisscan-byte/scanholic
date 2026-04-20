import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Location() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-16">오시는길</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-3xl h-[500px] w-full overflow-hidden relative shadow-inner">
              <iframe 
                src="https://maps.google.com/maps?q=경기도%20용인시%20기흥구%20흥덕1로13%20흥덕IT밸리&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="스캔홀릭 오시는길"
              ></iframe>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">본사 및 스캐닝 센터</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">주소</h3>
                    <p className="text-gray-600 leading-relaxed">
                      경기도 용인시 기흥구 흥덕1로13<br />
                      흥덕IT밸리 컴플렉스 B동 508호<br />
                      <strong className="text-gray-900 mt-1 block">지하 주차장 이용가능 합니다</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">연락처</h3>
                    <p className="text-gray-600">031-273-9175</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">이메일</h3>
                    <p className="text-gray-600">scanholic25@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">운영시간</h3>
                    <p className="text-gray-600">
                      평일 09:00 - 18:00<br />
                      <span className="text-sm text-gray-400">(점심시간 12:00 - 13:00)</span><br />
                      <span className="text-sm text-gray-400">주말 및 공휴일 휴무</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">방문 전 안내사항</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                보안이 요구되는 원본 자료의 특성상, 스캐닝 센터 방문은 <strong className="text-white">사전 예약제</strong>로 운영됩니다. 방문 전 반드시 고객센터를 통해 일정을 조율해 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
