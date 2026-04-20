import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GripVertical, Loader2 } from 'lucide-react';

export function ServiceManager() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', image_url: '', scenario: '' });

  const fetchServices = () => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch services:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service: any = null) => {
    if (service) {
      setEditingService(service);
      setFormData({ title: service.title, description: service.description, icon: service.icon || '', image_url: service.image_url || '', scenario: service.scenario || '' });
    } else {
      setEditingService(null);
      setFormData({ title: '', description: '', icon: '', image_url: '', scenario: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSave = async () => {
    try {
      const url = editingService 
        ? `/api/services/${editingService.id}`
        : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('?±κ³µ?μΌλ΅??€?¥λ?μµ?λ‹¤.');
        handleCloseModal();
        fetchServices();
      } else {
        alert('?€??μ¤??¤λ¥κ°€ λ°μƒ?μµ?λ‹¤.');
      }
    } catch (error) {
      console.error(error);
      alert('?¤νΈ?ν¬ ?¤λ¥κ°€ λ°μƒ?μµ?λ‹¤.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('?•λ§ ?? ?μ‹κ² μµ?κΉ?')) return;
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('?±κ³µ?μΌλ΅??? ?μ—?µλ‹??');
        fetchServices();
      } else {
        alert('??  μ¤??¤λ¥κ°€ λ°μƒ?μµ?λ‹¤.');
      }
    } catch (error) {
      console.error(error);
      alert('?¤νΈ?ν¬ ?¤λ¥κ°€ λ°μƒ?μµ?λ‹¤.');
    }
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
        <h1 className="text-2xl font-bold text-gray-900">?”μ??Έν™” ?λΉ„??κ΄€λ¦?/h1>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors" onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4" /> ???λΉ„??μ¶”κ?
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            ?Ήμ‚¬?΄νΈ???μ‹???λΉ„????ª©??κ΄€λ¦¬ν•©?λ‹¤.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {services.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              μ¶”κ????λΉ„?¤κ? ?†μµ?λ‹¤.
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors group">
                <button className="text-gray-400 hover:text-black">
                  <GripVertical className="w-5 h-5" />
                </button>
                
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-400">
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs uppercase font-bold text-center">No Image</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                  <div className="mt-2 flex gap-4 text-sm font-medium">
                    <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => handleOpenModal(service)}>?μ„Έ κ΄€λ¦?/span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors" onClick={() => handleOpenModal(service)}>
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{editingService ? '?λΉ„???μ •' : '???λΉ„??μ¶”κ?'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">?λΉ„???λª©</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">?¤λª…</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">?”μ??Έν™” ?λ‚λ¦¬μ¤ (?μ„Έ?μ΄μ§€ ?΄λ?μ§€)</label>
                <div className="flex items-center gap-4">
                  {formData.scenario && (
                    <img src={formData.scenario} alt="Scenario Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const uploadData = new FormData();
                          uploadData.append('file', file);
                          try {
                            const response = await fetch('/api/upload', {
                              method: 'POST',
                              body: uploadData,
                            });
                            if (response.ok) {
                              const result = await response.json();
                              setFormData({...formData, scenario: result.imageUrl});
                            }
                          } catch (error) {
                            console.error('Upload failed:', error);
                          }
                        }
                      }}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">?λΉ„???΄λ?μ§€</label>
                <div className="flex items-center gap-4">
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const uploadData = new FormData();
                          uploadData.append('file', file);
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: uploadData,
                            });
                            const data = await res.json();
                            if (data.imageUrl) {
                              setFormData({ ...formData, image_url: data.imageUrl });
                            }
                          } catch (err) {
                            alert('?΄λ?μ§€ ?…λ΅?μ— ?¤ν¨?μµ?λ‹¤.');
                          }
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                μ·¨μ†
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                ?€??
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
