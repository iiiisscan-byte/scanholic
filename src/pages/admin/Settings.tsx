import { useState, useEffect } from 'react';
import { Save, Palette, Type, LayoutTemplate, Loader2, User, Lock, Bell, Plus, Trash2, Upload } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('theme');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    primaryColor: '#141414',
    backgroundColor: '#E6E6E6',
    fontFamily: 'Pretendard',
    siteTitle: '?¤ìº”?€ë¦?,
    notice_active: 'false',
    notice_title: 'ê¸´ê¸‰ ê³µì??¬í•­',
    notice_content: ''
  });

  const [contents, setContents] = useState<any>({});

  const [popups, setPopups] = useState<any[]>([]);
  const [newPopup, setNewPopup] = useState({ title: '??ê³µì??¬í•­', content: '', is_active: 1 });

  const [accountData, setAccountData] = useState({
    newUsername: '',
    currentPassword: '',
    newPassword: ''
  });

  // ?¤ì • ë¶ˆëŸ¬?¤ê¸°
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(prev => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch settings:', err);
        setLoading(false);
      });

    fetch('/api/admin/popups')
      .then(res => res.json())
      .then(data => setPopups(data))
      .catch(err => console.error(err));

    fetch('/api/contents')
      .then(res => res.json())
      .then(data => setContents(data))
      .catch(err => console.error(err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // ?”ì???¤ì • ?€??
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      // ë°°ë„ˆ ë°??ìŠ¤??ì½˜í…ì¸??€??
      await fetch('/api/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents),
      });

      alert('?¤ì •???±ê³µ?ìœ¼ë¡??€?¥ë˜?ˆìŠµ?ˆë‹¤!');
      window.location.reload();
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('?€??ì¤??¤íŠ¸?Œí¬ ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAccount = async () => {
    if (!accountData.newUsername || !accountData.currentPassword || !accountData.newPassword) {
      alert('ëª¨ë“  ?„ë“œë¥??…ë ¥?´ì£¼?¸ìš”.');
      return;
    }
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: accountData.currentPassword,
          new_username: accountData.newUsername,
          new_password: accountData.newPassword
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('ê´€ë¦¬ì ê³„ì • ?•ë³´ê°€ ?±ê³µ?ìœ¼ë¡?ë³€ê²½ë˜?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ë¡œê·¸????ì£¼ì„¸??');
        sessionStorage.removeItem('admin_token');
        window.location.reload();
      } else {
        alert(data.detail || 'ë³€ê²?ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.');
      }
    } catch (error) {
      console.error('Failed to update credentials:', error);
      alert('?¤íŠ¸?Œí¬ ?¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, num: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setContents({ ...contents, [`hero_slide_${num}_image`]: data.imageUrl });
      } else {
        alert('?´ë?ì§€ ?…ë¡œ?œì— ?¤íŒ¨?ˆìŠµ?ˆë‹¤.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('?´ë?ì§€ ?…ë¡œ??ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.');
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAddPopup = async () => {
    try {
      const response = await fetch('/api/admin/popups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPopup),
      });
      if (response.ok) {
        const res = await fetch('/api/admin/popups');
        const data = await res.json();
        setPopups(data);
        setNewPopup({ title: '??ê³µì??¬í•­', content: '', is_active: 1 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePopup = async (id: number, updated: any) => {
    try {
      await fetch(`/api/admin/popups/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setPopups(popups.map(p => p.id === id ? { ...p, ...updated } : p));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePopup = async (id: number) => {
    if (!confirm('?•ë§ ?? œ?˜ì‹œê² ìŠµ?ˆê¹Œ?')) return;
    try {
      await fetch(`/api/admin/popups/${id}`, { method: 'DELETE' });
      setPopups(popups.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // ?ì—… ê°œë³„ ?¸ì§‘ ì»´í¬?ŒíŠ¸ (?œê? ?…ë ¥ ë¬¸ì œ ?´ê²°???„í•´ ë¶„ë¦¬)
  const PopupItemEditor = ({ popup }: { popup: any }) => {
    const [localPopup, setLocalPopup] = useState(popup);

    // ë¶€ëª??íƒœê°€ ë°”ë€Œë©´(?¤ë¥¸ ê³³ì—???…ë°?´íŠ¸?˜ë©´) ë¡œì»¬ ?íƒœ ?™ê¸°??
    useEffect(() => {
      setLocalPopup(popup);
    }, [popup.id, popup.is_active]);

    const handleBlur = () => {
      if (localPopup.title !== popup.title || localPopup.content !== popup.content) {
        handleUpdatePopup(popup.id, localPopup);
      }
    };

    return (
      <div className="p-6 border border-gray-200 rounded-xl space-y-4 bg-gray-50/50">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <input 
                type="text" 
                value={localPopup.title}
                onChange={(e) => setLocalPopup({ ...localPopup, title: e.target.value })}
                onBlur={handleBlur}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold bg-white outline-none focus:ring-2 focus:ring-black"
                placeholder="?ì—… ?œëª©"
              />
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={localPopup.is_active === 1}
                  onChange={(e) => {
                    const nextActive = e.target.checked ? 1 : 0;
                    const updated = { ...localPopup, is_active: nextActive };
                    setLocalPopup(updated);
                    handleUpdatePopup(popup.id, updated);
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                <span className="ml-2 text-xs font-medium text-gray-500">{localPopup.is_active === 1 ? '?œì„±' : 'ë¹„í™œ??}</span>
              </label>
            </div>
            <textarea 
              rows={3}
              value={localPopup.content}
              onChange={(e) => setLocalPopup({ ...localPopup, content: e.target.value })}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="?ì—… ?ì„¸ ?´ìš©"
            ></textarea>
          </div>
          <button 
            onClick={() => handleDeletePopup(popup.id)}
            className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
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
        <h1 className="text-2xl font-bold text-gray-900">?˜ê²½ ?¤ì •</h1>
        {activeTab !== 'account' && (
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
            ë³€ê²½ì‚¬???€??
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex min-h-[600px]">
        <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'theme' ? 'bg-white border-l-4 border-black text-black' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Palette className="w-5 h-5" /> ?‰ìƒ ?Œë§ˆ
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'typography' ? 'bg-white border-l-4 border-black text-black' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Type className="w-5 h-5" /> ?€?´í¬ê·¸ë˜??
          </button>
          <button
            onClick={() => setActiveTab('banner')}
            className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'banner' ? 'bg-white border-l-4 border-black text-black' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutTemplate className="w-5 h-5" /> ë©”ì¸ ë°°ë„ˆ ê´€ë¦?
          </button>
          <button
            onClick={() => setActiveTab('notice')}
            className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-t border-gray-200 mt-auto ${
              activeTab === 'notice' ? 'bg-white border-l-4 border-black text-black' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" /> ?ì—… ê³µì??¬í•­ ê´€ë¦?
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-t border-gray-200 ${
              activeTab === 'account' ? 'bg-white border-l-4 border-black text-black' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" /> ê´€ë¦¬ì ê³„ì • ë³€ê²?
          </button>
        </div>

        <div className="flex-1 p-8">
          {activeTab === 'theme' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-lg font-bold mb-2">ë¸Œëœ??ì»¬ëŸ¬ ?¤ì •</h2>
                <p className="text-sm text-gray-500 mb-6">?¹ì‚¬?´íŠ¸ ?„ë°˜???ìš©?˜ëŠ” ì£¼ìš” ?‰ìƒ??ë³€ê²½í•©?ˆë‹¤.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">?¬ì¸???‰ìƒ (Primary)</h3>
                      <p className="text-sm text-gray-500">ë²„íŠ¼, ê°•ì¡° ?ìŠ¤?? ?¤ë” ë¡œê³  ?±ì— ?¬ìš©?©ë‹ˆ??</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={settings.primaryColor} 
                        onChange={(e) => updateSetting('primaryColor', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border-0 p-0" 
                      />
                      <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{settings.primaryColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">ë°°ê²½ ?‰ìƒ (Background)</h3>
                      <p className="text-sm text-gray-500">?¹ì‚¬?´íŠ¸??ê¸°ë³¸ ë°°ê²½?‰ì…?ˆë‹¤.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={settings.backgroundColor} 
                        onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border-0 p-0" 
                      />
                      <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{settings.backgroundColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-4">ë¯¸ë¦¬ë³´ê¸°</h2>
                <div className="p-6 rounded-xl border border-gray-300" style={{ backgroundColor: settings.backgroundColor }}>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: settings.primaryColor }}>{settings.siteTitle}</h3>
                    <p className="text-gray-600 mb-4">?„ë¬¸ ?¤ìº?ˆë? ?œìš©???”ì??¸í™” ?œë¹„??/p>
                    <button className="text-white px-4 py-2 rounded-md font-medium" style={{ backgroundColor: settings.primaryColor }}>
                      ?ë‹´ë¬¸ì˜
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-lg font-bold mb-2">?°íŠ¸ ?¤ì •</h2>
                <p className="text-sm text-gray-500 mb-6">?¹ì‚¬?´íŠ¸??ê¸°ë³¸ ê¸€ê¼´ì„ ? íƒ?©ë‹ˆ??</p>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium text-gray-900 font-sans">Pretendard</h3>
                      <p className="text-sm text-gray-500">ê°€???ë¦¬ ?°ì´??ê¹”ë”??ê³ ë”• ?°íŠ¸</p>
                    </div>
                    <input 
                      type="radio" 
                      name="font" 
                      checked={settings.fontFamily === 'Pretendard'} 
                      onChange={() => updateSetting('fontFamily', 'Pretendard')}
                      className="w-5 h-5 text-black focus:ring-black" 
                    />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium text-gray-900 font-serif">Noto Serif KR</h3>
                      <p className="text-sm text-gray-500">ê³ ê¸‰?¤ëŸ½ê³??„í†µ?ì¸ ?ë‚Œ??ëª…ì¡° ?°íŠ¸</p>
                    </div>
                    <input 
                      type="radio" 
                      name="font" 
                      checked={settings.fontFamily === 'Noto Serif KR'} 
                      onChange={() => updateSetting('fontFamily', 'Noto Serif KR')}
                      className="w-5 h-5 text-black focus:ring-black" 
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notice' && (
            <div className="space-y-8 max-w-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">?ì—… ê³µì??¬í•­ ê´€ë¦?/h2>
                  <p className="text-sm text-gray-500">?¹ì‚¬?´íŠ¸ ?‘ì† ??ë³´ì—¬ì¤??¬ëŸ¬ ê°œì˜ ?ì—…??ê´€ë¦¬í•©?ˆë‹¤.</p>
                </div>
                <button 
                  onClick={handleAddPopup}
                  className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  <Plus className="w-4 h-4" /> ?ì—… ì¶”ê?
                </button>
              </div>

              <div className="space-y-6">
                {popups.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                    ?±ë¡???ì—…???†ìŠµ?ˆë‹¤. '?ì—… ì¶”ê?'ë¥??ŒëŸ¬ ??ê³µì??¬í•­??ë§Œë“œ?¸ìš”.
                  </div>
                ) : (
                  popups.map((popup) => (
                    <PopupItemEditor key={popup.id} popup={popup} />
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'banner' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h2 className="text-lg font-bold mb-2">ë©”ì¸ ë°°ë„ˆ(?¬ë¼?´ë“œ) ê´€ë¦?/h2>
                <p className="text-sm text-gray-500 mb-6">?ˆí˜?´ì? ë©”ì¸?”ë©´??5ê°?ë°°ë„ˆ ?´ë?ì§€?€ ë¬¸êµ¬ë¥??¸ì§‘?©ë‹ˆ??</p>
                
                <div className="space-y-12">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="p-6 border border-gray-200 rounded-xl bg-gray-50/30 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">{num}</span>
                        <h3 className="font-bold text-gray-900">ë°°ë„ˆ ?¬ë¼?´ë“œ {num}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">ë©”ì¸ ?€?´í?</label>
                            <input 
                              type="text" 
                              value={contents[`hero_slide_${num}_title`] || ''}
                              onChange={(e) => setContents({...contents, [`hero_slide_${num}_title`]: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">?œë¸Œ ?€?´í?</label>
                            <textarea 
                              rows={2}
                              value={contents[`hero_slide_${num}_subtitle`] || ''}
                              onChange={(e) => setContents({...contents, [`hero_slide_${num}_subtitle`]: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm resize-none"
                            ></textarea>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">ë°°ë„ˆ ?´ë?ì§€ (?Œì¼ ?…ë¡œ???ëŠ” URL)</label>
                          <div className="flex gap-2 mb-2">
                            <input 
                              type="text" 
                              value={contents[`hero_slide_${num}_image`] || ''}
                              onChange={(e) => setContents({...contents, [`hero_slide_${num}_image`]: e.target.value})}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
                              placeholder="https://images.unsplash.com/..."
                            />
                            <label className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer transition-colors border border-gray-300">
                              <Upload className="w-4 h-4 text-gray-600" />
                              <span className="text-xs font-medium text-gray-600">?…ë¡œ??/span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, num)}
                              />
                            </label>
                          </div>
                          <div className="h-40 w-full rounded-lg overflow-hidden bg-gray-200 border border-gray-100 relative group">
                            {contents[`hero_slide_${num}_image`] ? (
                              <img src={contents[`hero_slide_${num}_image`]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Preview" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">?´ë?ì§€ ?†ìŒ</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-lg font-bold mb-2">ê³„ì • ë°?ë³´ì•ˆ ?¤ì •</h2>
                <p className="text-sm text-gray-500 mb-6">ìµœê³  ê´€ë¦¬ì???‘ì† ?„ì´?”ì? ë¹„ë?ë²ˆí˜¸ë¥?ë³€ê²½í•©?ˆë‹¤.</p>
                
                <div className="space-y-4 p-6 border border-gray-200 rounded-xl bg-gray-50">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">???„ì´??/label>
                    <input 
                      type="text" 
                      placeholder="ë³€ê²½í•  ?„ì´?”ë? ?…ë ¥?˜ì„¸??
                      value={accountData.newUsername}
                      onChange={(e) => setAccountData({ ...accountData, newUsername: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">??ë¹„ë?ë²ˆí˜¸</label>
                    <input 
                      type="password" 
                      placeholder="ë³€ê²½í•  ë¹„ë?ë²ˆí˜¸ë¥??…ë ¥?˜ì„¸??
                      value={accountData.newPassword}
                      onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black bg-white" 
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">?„ì¬ ë¹„ë?ë²ˆí˜¸ <span className="text-red-500">*</span></label>
                    <p className="text-xs text-gray-500 mb-2">?•ë³´ë¥?ë³€ê²½í•˜?¤ë©´ ?„ì¬ ë¹„ë?ë²ˆí˜¸ë¥??¸ì¦?´ì•¼ ?©ë‹ˆ??</p>
                    <input 
                      type="password" 
                      placeholder="?„ì¬ ?¬ìš©ì¤‘ì¸ ë¹„ë?ë²ˆí˜¸ ?…ë ¥"
                      value={accountData.currentPassword}
                      onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black bg-white" 
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      onClick={handleUpdateAccount}
                      disabled={saving}
                      className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                      ê³„ì • ?•ë³´ ?€??
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
