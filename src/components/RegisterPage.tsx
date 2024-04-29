import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from '../stores/userStore';


const RegisterPage: React.FC = observer(() => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await userStore.register({ email, username, password });
      navigate('/');
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#4d5b7a', color: '#dcdde0', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '2em', color: '#dcdde0', textDecoration: 'none' }}>←</Link>
      <div style={{ width: '400px', height: '475px', background: 'linear-gradient(180deg, #35455D, #405a94)', padding: '30px', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16pt', color: 'white' }}>Register</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', color: 'black' }} />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleRegister} style={{ display: 'block', margin: '0 auto', padding: '12px 24px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(180deg, #405a94, #35455D)', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>Register</button>
        </form>
      </div>
    </div>
  );
});

export default RegisterPage;
