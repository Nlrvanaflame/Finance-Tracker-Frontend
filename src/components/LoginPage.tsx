import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../stores/userStore';

const LoginPage: React.FC = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await userStore.login({ email, password });
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#4d5b7a', color: '#dcdde0', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '2em', color: '#dcdde0', textDecoration: 'none' }}>←</Link>
      <div style={{ width: '400px', height: '350px', background: 'linear-gradient(180deg, #35455D, #405a94)', padding: '30px', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16pt' }}>Login</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          <button type="submit" style={{ display: 'block', margin: '0 auto', padding: '12px 24px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', background: 'linear-gradient(180deg, #405a94, #35455D)', color: '#dcdde0', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
});

export default LoginPage;
