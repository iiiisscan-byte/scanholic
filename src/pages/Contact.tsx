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
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, service: data[0].title }));
        } else {
          setFormData(prev => ({ ...prev, service: 'ê¸°í? ë¬¸ì˜' }));
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
      const response = await fetch('/api/public/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          service: formData.service,
          contact: formData.phone, // ?°ë½ì²˜ë? contact ?„ë“œë¡?ë§¤í•‘
          email: formData.email,
          message: formData.message
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFormData({ name: '', company: '', email: '', phone: '', service: services.length > 0 ? services[0].title : 'ê¸°í? ë¬¸ì˜', message: '' });
      } else {
        alert('ë¬¸ì˜ ?‘ìˆ˜ ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„??ì£¼ì„¸??');
      }
    } catch (error) {
      console.error('Inquiry submission error:', error);
      alert('?œë²„?€ ?°ê²°?????†ìŠµ?ˆë‹¤. ? ì‹œ ???¤ì‹œ ?œë„??ì£¼ì„¸??');
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">?ë‹´ë¬¸ì˜</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            ?¤ìº”?€ë¦?˜ ?„ë¬¸?ì¸ ?”ì??¸í™” ?œë¹„?¤ì— ?€??ê¶ê¸ˆ???ì´ ?ˆìœ¼? ê???<br />
            ?„ë˜ ?‘ì‹???‘ì„±??ì£¼ì‹œë©? ?´ë‹¹?ê? ? ì†?˜ê²Œ ?µë????œë¦¬ê² ìŠµ?ˆë‹¤.
          </p>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-2">ê³ ê°?¼í„°</h3>
              <p className="text-2xl font-bold text-black mb-1">031-273-9175</p>
              <p className="text-gray-500 text-sm">?´ì˜?œê°„: ?‰ì¼ 09:00 - 18:00 (?ì‹¬?œê°„ 12:00 - 13:00)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-2">?´ë©”??ë¬¸ì˜</h3>
              <p className="text-xl font-bold text-black">scanholic25@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">?´ë¦„ / ?´ë‹¹?ëª… *</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">?Œì‚¬ëª?/ ê¸°ê?ëª?/label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">?´ë©”??*</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">?°ë½ì²?*</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">ê´€???œë¹„??*</label>
              <select id="service" name="service" required value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white">
                {services.map((svc) => (
                  <option key={svc.id} value={svc.title}>{svc.title}</option>
                ))}
                <option value="ê¸°í? ë¬¸ì˜">ê¸°í? ë¬¸ì˜</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">ë¬¸ì˜ ?´ìš© *</label>
              <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none" placeholder="?”ì??¸í™”?˜ê³ ???˜ëŠ” ?ë³¸??ì¢…ë¥˜, ?˜ëŸ‰, ?í•˜??ê²°ê³¼ë¬??•íƒœ ?±ì„ ?ì„¸???ì–´ì£¼ì‹œë©????•í™•???ë‹´??ê°€?¥í•©?ˆë‹¤." />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="privacy" required className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
              <label htmlFor="privacy" className="text-sm text-gray-600">ê°œì¸?•ë³´ ?˜ì§‘ ë°??´ìš©???™ì˜?©ë‹ˆ?? *</label>
            </div>

            <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <Send className="w-5 h-5" /> ë¬¸ì˜ ?‘ìˆ˜?˜ê¸°
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
