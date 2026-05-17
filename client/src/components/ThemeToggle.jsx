import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spidey-red group"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
          : 'linear-gradient(135deg, #4361ee, #2146c7)',
        border: '2px solid',
        borderColor: isDark ? 'rgba(226,54,54,0.3)' : 'rgba(67,97,238,0.3)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg"
        style={{
          left: isDark ? '2px' : 'calc(100% - 22px)',
          background: isDark ? '#e23636' : '#ffd93d',
        }}
      >
        {isDark ? (
          <FiMoon className="w-3 h-3 text-white" />
        ) : (
          <FiSun className="w-3 h-3 text-gray-900" />
        )}
      </div>
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: isDark
            ? '0 0 15px rgba(226,54,54,0.4)'
            : '0 0 15px rgba(67,97,238,0.4)',
        }}
      />
    </button>
  );
}
