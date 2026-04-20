import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [services, setServices] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, service: data[0].title }));
        } else {
          setFormData(prev => ({ ...prev, service: '기타 문의' }));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/public/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          service: formData.service,
          contact: formData.phone, // 연락처를 contact 필드로 매핑
          email: formData.email,
          message: formData.message
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFormData({ name: '', company: '', email: '', phone: '', service: services.length > 0 ? services[0].title : '기타 문의', message: '' });
      } else {
        alert('문의 접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Inquiry submission error:', error);
      alert('서버와 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">상담문의</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            스캔홀릭의 전문적인 디지털화 서비스에 대해 궁금한 점이 있으신가요?<br />
            아래 양식을 작성해 주시면, 담당자가 신속하게 답변해 드리겠습니다.
          </p>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-2">고객센터</h3>
              <p className="text-2xl font-bold text-black mb-1">031-273-9175</p>
              <p className="text-gray-500 text-sm">운영시간: 평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-2">이메일 문의</h3>
              <p className="text-xl font-bold text-black">scanholic25@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">이름 / 담당자명 *</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">회사명 / 기관명</label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">관심 서비스 *</label>
              <select id="service" name="service" required value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white">
                {services.map((svc) => (
                  <option key={svc.id} value={svc.title}>{svc.title}</option>
                ))}
                <option value="기타 문의">기타 문의</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">문의 내용 *</label>
              <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none" placeholder="디지털화하고자 하는 원본의 종류, 수량, 원하는 결과물 형태 등을 자세히 적어주시면 더 정확한 상담이 가능합니다." />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="privacy" required className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
              <label htmlFor="privacy" className="text-sm text-gray-600">개인정보 수집 및 이용에 동의합니다. *</label>
            </div>

            <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <Send className="w-5 h-5" /> 문의 접수하기
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
