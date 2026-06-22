import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const result = await login(username, password);
      if (result.success) {
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background effects */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(226,54,54,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(33,70,199,0.08) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 bg-web-pattern opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, var(--accent-red), #b71c1c)', boxShadow: '0 8px 32px rgba(226,54,54,0.3)' }}>
            <FiLock size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-4xl tracking-wider" style={{ color: 'var(--text-primary)' }}>
            ADMIN <span className="gradient-text">ACCESS</span>
          </h1>
          <p className="font-body text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
            Authorized personnel only
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(226,54,54,0.1)', border: '1px solid rgba(226,54,54,0.3)' }}>
              <FiAlertCircle size={18} style={{ color: 'var(--accent-red)' }} />
              <span className="font-body text-sm" style={{ color: 'var(--accent-red)' }}>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Username or Email</label>
            <div className="relative">
              <FiUser size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username or email"
                className="w-full pl-12 pr-4 py-3 rounded-xl font-body text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', '--tw-ring-color': 'rgba(226,54,54,0.3)' }}
                autoComplete="username" />
            </div>
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Password</label>
            <div className="relative">
              <FiLock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"
                className="w-full pl-12 pr-12 py-3 rounded-xl font-body text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', '--tw-ring-color': 'rgba(226,54,54,0.3)' }}
                autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-muted)' }}>
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiLock size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 font-body text-xs" style={{ color: 'var(--text-muted)' }}>
          <a href="/" className="transition-colors hover:underline" style={{ color: 'var(--accent-red)' }}>← Back to Portfolio</a>
        </p>
      </div>
    </div>
  );
}
