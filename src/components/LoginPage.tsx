import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const payload = await loginUser({ email, password }).unwrap();
      if (payload.token) {
        localStorage.setItem('token', payload.token);
        navigate('/');
      } else {
        console.error('Token not received');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#4d5b7a', color: '#dcdde0', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '2em', color: '#dcdde0', textDecoration: 'none' }}>←</Link>
      <div style={{ width: '400px', height: '350px', background: 'linear-gradient(180deg, #35455D, #405a94)', padding: '30px', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16pt' }}>Login</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          {isError && <p style={{ color: 'red' }}>Invalid email or password</p>}
          <button onClick={handleLogin} disabled={isLoading} style={{ display: 'block', margin: '0 auto', padding: '12px 24px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', background: 'linear-gradient(180deg, #405a94, #35455D)', color: '#dcdde0', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
