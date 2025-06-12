import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import './Register.css';

function Register() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    userId: '',
    email: '',
    password: '',
    password2: '',
  });
  const [lang, setLang] = useState('ko');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLangChange = e => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="register-container">
      <header className="header">
        <div className="language-selector">
          <select value={lang} onChange={handleLangChange}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
        <h1 className="title">{t('title')}</h1>
      </header>
      <main className="main-content">
        <h2 className="page-title">{t('signup')}</h2>
        <form className="register-form">
          <div className="input-group">
            <input
              name="userId"
              placeholder={t('idPlaceholder')}
              value={form.userId}
              onChange={handleChange}
            />
            <button type="button">{t('idCheck')}</button>
          </div>
          <div className="input-group">
            <input
              name="email"
              placeholder={t('emailPlaceholder')}
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder={t('pwPlaceholder')}
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              name="password2"
              type="password"
              placeholder={t('pw2Placeholder')}
              value={form.password2}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{t('submit')}</button>
        </form>
        <div className="social-login-section">
          <p>{t('social')}</p>
          <button className="social-btn naver">{t('naver')}</button>
          <button className="social-btn kakao">{t('kakao')}</button>
          <button className="social-btn google">{t('google')}</button>
        </div>
      </main>
    </div>
  );
}

export default Register; 