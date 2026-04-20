import { Users, FileText, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/inquiries')
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(err => console.error(err));

    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  const pendingCount = inquiries.filter(inq => inq.status === 'pending').length;
  const completedCount = inquiries.filter(inq => inq.status === 'completed').length;
  const recentInquiries = inquiries.slice(0, 3);

  const stats = [
    { title: '?�늘??방문??, value: '1,234', icon: Users, change: '+12%' },
    { title: '?�기중??문의', value: pendingCount.toString(), icon: MessageSquare, change: pendingCount > 0 ? `+${pendingCount}` : '0' },
    { title: '?�영중인 ?�비??, value: services.length.toString(), icon: FileText, change: '0%' },
    { title: '처리 ?�료??문의', value: completedCount.toString(), icon: CheckCircle, change: completedCount > 0 ? `+${completedCount}` : '0' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-gray-500'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">최근 문의 ?�역</h2>
          <div className="space-y-4">
            {recentInquiries.length === 0 ? (
              <div className="text-sm text-gray-500 py-4 text-center">최근 ?�수??문의가 ?�습?�다.</div>
            ) : (
              recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate('/admin/inquiries')}>
                  <div>
                    <p className="font-medium text-gray-900 line-clamp-1">{inquiry.message || '?�용 ?�음'}</p>
                    <p className="text-sm text-gray-500">{inquiry.name} {inquiry.company ? `(${inquiry.company})` : ''}</p>
                  </div>
                  {inquiry.status === 'pending' ? (
                    <span className="px-3 py-1 flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full whitespace-nowrap">
                      <Clock className="w-3 h-3" /> ?�기중
                    </span>
                  ) : (
                    <span className="px-3 py-1 flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap">
                      <CheckCircle className="w-3 h-3" /> ?�료
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">빠른 ?�업</h2>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => navigate('/admin/services')}
              className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-black mb-2" />
              <span className="block font-medium text-gray-900">?��??�화 ?�나리오 추�?</span>
              <span className="text-xs text-gray-500">?�비???�업물을 관리하?�요.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
