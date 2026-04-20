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
        <h1 className="text-4xl md:text-5xl font-bold mb-16">?§Ïãú?îÍ∏∏</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-3xl h-[500px] w-full overflow-hidden relative shadow-inner">
              <iframe 
                src="https://maps.google.com/maps?q=Í≤ΩÍ∏∞??20?©Ïù∏??20Í∏∞Ìù•Íµ?20?•Îçï1Î°?3%20?•ÎçïITÎ∞∏Î¶¨&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="?§Ï∫î?ÄÎ¶??§Ïãú?îÍ∏∏"
              ></iframe>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Î≥∏ÏÇ¨ Î∞??§Ï∫ê???ºÌÑ∞</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Ï£ºÏÜå</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Í≤ΩÍ∏∞???©Ïù∏??Í∏∞Ìù•Íµ??•Îçï1Î°?3<br />
                      ?•ÎçïITÎ∞∏Î¶¨ Ïª¥Ìîå?âÏä§ B??508??br />
                      <strong className="text-gray-900 mt-1 block">ÏßÄ??Ï£ºÏ∞®???¥Ïö©Í∞Ä???©Îãà??/strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">?∞ÎùΩÏ≤?/h3>
                    <p className="text-gray-600">031-273-9175</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">?¥Î©î??/h3>
                    <p className="text-gray-600">scanholic25@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">?¥ÏòÅ?úÍ∞Ñ</h3>
                    <p className="text-gray-600">
                      ?âÏùº 09:00 - 18:00<br />
                      <span className="text-sm text-gray-400">(?êÏã¨?úÍ∞Ñ 12:00 - 13:00)</span><br />
                      <span className="text-sm text-gray-400">Ï£ºÎßê Î∞?Í≥µÌú¥???¥Î¨¥</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Î∞©Î¨∏ ???àÎÇ¥?¨Ìï≠</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Î≥¥Ïïà???îÍµ¨?òÎäî ?êÎ≥∏ ?êÎ£å???πÏÑ±?? ?§Ï∫ê???ºÌÑ∞ Î∞©Î¨∏?Ä <strong className="text-white">?¨Ï†Ñ ?àÏïΩ??/strong>Î°??¥ÏòÅ?©Îãà?? Î∞©Î¨∏ ??Î∞òÎìú??Í≥†Í∞ù?ºÌÑ∞Î•??µÌï¥ ?ºÏ†ï??Ï°∞Ïú®??Ï£ºÏãúÍ∏?Î∞îÎûç?àÎã§.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
