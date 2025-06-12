import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n';
import './Register.css';

function Header({ lang, onLangChange }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  return (
    <header className="header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="language-selector">
          <select value={lang} onChange={onLangChange}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        <h1 className="title" style={{ marginLeft: 20 }}>{t('title')}</h1>
      </div>
      <div style={{ display: 'flex', gap: 10, marginRight: 30 }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: isLogin ? '#fff' : '#0033cc',
            color: isLogin ? '#0033cc' : '#fff',
            border: '1px solid #0033cc',
            borderRadius: 4,
            padding: '8px 18px',
            fontWeight: 'bold',
            cursor: isLogin ? 'default' : 'pointer',
            opacity: isLogin ? 0.7 : 1
          }}
          disabled={isLogin}
        >
          {t('login')}
        </button>
        <button
          onClick={() => navigate('/register')}
          style={{
            background: isRegister ? '#fff' : '#0033cc',
            color: isRegister ? '#0033cc' : '#fff',
            border: '1px solid #0033cc',
            borderRadius: 4,
            padding: '8px 18px',
            fontWeight: 'bold',
            cursor: isRegister ? 'default' : 'pointer',
            opacity: isRegister ? 0.7 : 1
          }}
          disabled={isRegister}
        >
          {t('signup')}
        </button>
      </div>
    </header>
  );
}

export default Header; 