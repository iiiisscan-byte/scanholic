import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, CheckCircle, Clock, Loader2 } from 'lucide-react';

export function InquiryManager() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInquiries = () => {
    fetch('http://localhost:8000/api/admin/inquiries')
      .then(res => res.json())
      .then(data => {
        setInquiries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch inquiries:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      const response = await fetch(`http://localhost:8000/api/admin/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      } else {
        alert('상태 변경 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('이 문의 내역을 정말 삭제하시겠습니까?')) return;
    try {
      const response = await fetch(`http://localhost:8000/api/admin/inquiries/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setInquiries(inquiries.filter(inq => inq.id !== id));
      } else {
        alert('삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  const handleViewDetails = (inquiry: any) => {
    alert(`[문의 작성자 정보]\n이름: ${inquiry.name}\n회사: ${inquiry.company || '-'}\n이메일: ${inquiry.email || '-'}\n연락처: ${inquiry.contact || '-'}\n\n[문의 내용]\n${inquiry.message}`);
    // 대기중인 경우 클릭 시 자동으로 완료 처리로 전환합니다
    if (inquiry.status === 'pending') {
      handleToggleStatus(inquiry.id, inquiry.status);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    const nameMatch = inquiry.name?.toLowerCase().includes(lowerQuery);
    const companyMatch = inquiry.company?.toLowerCase().includes(lowerQuery);
    return nameMatch || companyMatch;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">상담문의 관리</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="이름, 회사명 검색" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">상태</th>
              <th className="px-6 py-4">이름 / 회사명</th>
              <th className="px-6 py-4">관심 서비스</th>
              <th className="px-6 py-4">문의 내용 (요약)</th>
              <th className="px-6 py-4">접수일</th>
              <th className="px-6 py-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  아직 접수된 상담 문의가 없거나 검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleToggleStatus(inquiry.id, inquiry.status)}>
                      {inquiry.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors">
                          <Clock className="w-3 h-3" /> 대기중
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
                          <CheckCircle className="w-3 h-3" /> 완료
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{inquiry.name}</div>
                    <div className="text-sm text-gray-500">{inquiry.company || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {inquiry.service || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-1 max-w-xs">{inquiry.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(inquiry.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4" onClick={(e) => { e.stopPropagation(); handleViewDetails(inquiry); }}>상세보기</button>
                    <button className="text-red-500 hover:text-red-700" onClick={(e) => { e.stopPropagation(); handleDelete(inquiry.id); }}>삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <span className="text-sm text-gray-700">총 {filteredInquiries.length}건의 문의 검색됨</span>
          {/* Pagination mock */}
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>이전</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}
