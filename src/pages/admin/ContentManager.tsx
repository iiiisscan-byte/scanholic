import { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';

export function ContentManager() {
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contents, setContents] = useState({
    about_text: '',
    tech_image_processing_title: '',
    tech_image_processing_desc: '',
    tech_ocr_title: '',
    tech_ocr_desc: ''
  });

  useEffect(() => {
    fetch('/api/contents')
      .then(res => res.json())
      .then(data => {
        setContents(prev => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch contents:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents),
      });
      if (response.ok) {
        alert('ì½˜í…ì¸ ê? ?±ê³µ?ìœ¼ë¡??€?¥ë˜?ˆìŠµ?ˆë‹¤!');
      }
    } catch (error) {
      console.error('Failed to save contents:', error);
      alert('?€??ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.');
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (key: string, value: string) => {
    setContents(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">ì½˜í…ì¸?ê´€ë¦?/h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          ?€?¥í•˜ê¸?
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'about' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ?Œì‚¬?Œê°œ ?˜ì´ì§€
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'tech' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ê¸°ìˆ  ?Œê°œ
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">?Œê°œê¸€ (HTML ì§€??</label>
                <textarea 
                  rows={10} 
                  value={contents.about_text} 
                  onChange={(e) => updateContent('about_text', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-y" 
                />
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-8">
              <p className="text-gray-500 text-sm">ê¸°ìˆ  ?Œê°œ ?˜ì´ì§€(?´ë?ì§€ ì²˜ë¦¬, OCR)???ì„¸ ?´ìš©??ê´€ë¦¬í•©?ˆë‹¤.</p>
              
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">?´ë?ì§€ ì²˜ë¦¬ ê¸°ìˆ </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">?œëª©</label>
                  <input 
                    type="text" 
                    value={contents.tech_image_processing_title || ''} 
                    onChange={(e) => updateContent('tech_image_processing_title', e.target.value)}
                    placeholder="?? ê³ ë„?”ëœ ?´ë?ì§€ ì²˜ë¦¬"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">?¤ëª… ?´ìš© (HTML ì§€??</label>
                  <textarea 
                    rows={4}
                    value={contents.tech_image_processing_desc || ''} 
                    onChange={(e) => updateContent('tech_image_processing_desc', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-y" 
                  />
                </div>
              </div>

              <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">OCR (ê´‘í•™ ë¬¸ì ?¸ì‹)</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">?œëª©</label>
                  <input 
                    type="text" 
                    value={contents.tech_ocr_title || ''} 
                    onChange={(e) => updateContent('tech_ocr_title', e.target.value)}
                    placeholder="?? OCR (ê´‘í•™ ë¬¸ì ?¸ì‹)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">?¤ëª… ?´ìš© (HTML ì§€??</label>
                  <textarea 
                    rows={4}
                    value={contents.tech_ocr_desc || ''} 
                    onChange={(e) => updateContent('tech_ocr_desc', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-y" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
