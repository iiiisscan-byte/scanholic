import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PopupProps {
  id: number;
  title: string;
  content: string;
}

export function Popup({ id, title, content }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(`popupDismissedAt_${id}`);
    const today = new Date().toISOString().split('T')[0];
    
    if (dismissedAt !== today) {
      setIsOpen(true);
    }
  }, [id]);

  const handleClose = (dismissToday: boolean) => {
    if (dismissToday) {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`popupDismissedAt_${id}`, today);
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="pointer-events-auto w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        >
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">{title}</h2>
            <button 
              onClick={() => handleClose(false)}
              className="hover:bg-red-700 p-1 rounded-full transition-colors"
              aria-label="?«ê¸°"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 text-gray-800 leading-relaxed whitespace-pre-line min-h-[150px] max-h-[60vh] overflow-y-auto">
            {content}
          </div>
          
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button 
              onClick={() => handleClose(true)}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ?¤ëŠ˜ ?˜ë£¨ ë³´ì? ?Šê¸°
            </button>
            <button 
              onClick={() => handleClose(false)}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              ?«ê¸°
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
