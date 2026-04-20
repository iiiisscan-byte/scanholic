import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('admin_token', data.token);
        // ê°•ì œë¡?ë¦¬ë Œ?”ë§?˜ê¸° ?„í•´ ?´ë²¤??ë°œìƒ?œí‚¤ê±°ë‚˜, 
        // AdminLayout??ë§ˆìš´???íƒœ?´ë?ë¡??˜ì´ì§€ ?ˆë¡œê³ ì¹¨
        window.location.reload();
      } else {
        setError('?„ì´???ëŠ” ë¹„ë?ë²ˆí˜¸ê°€ ?¬ë°”ë¥´ì? ?ŠìŠµ?ˆë‹¤.');
      }
    } catch (err) {
      setError('?œë²„ ?°ê²° ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ê´€ë¦¬ì ë¡œê·¸??/h1>
          <p className="text-gray-500">?¤ìº”?€ë¦?ê´€ë¦¬ì ?€?œë³´??/p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ?„ì´??
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black"
                placeholder="ê´€ë¦¬ì ?„ì´?”ë? ?…ë ¥?˜ì„¸??
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ë¹„ë?ë²ˆí˜¸
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black"
                placeholder="ë¹„ë?ë²ˆí˜¸ë¥??…ë ¥?˜ì„¸??
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-bold transition-all ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'ë¡œê·¸??ì¤?..' : 'ë¡œê·¸??}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
