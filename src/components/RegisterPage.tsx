import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/routes'
import { useAtom } from 'jotai';
import { confirmPasswordAtom, emailAtom, errorAtom, passwordAtom, usernameAtom } from '../states/atoms';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [error, setError] = useAtom(errorAtom);

  const navigate = useNavigate()

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await registerUser({ email, username, password })
      console.log(response.data)

      if (response.data.id) {
        alert('Registration successful')
        navigate('/')
      } else {
        setError(response.data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('There was an error!', error)
      setError('There was an error registering your account. Please try again.')
    }
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#4d5b7a',
        color: '#dcdde0',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '2em',
          color: '#dcdde0',
          textDecoration: 'none'
        }}
      >
        ←
      </Link>
      <div
        style={{
          width: '400px',
          height: '475px',
          background: 'linear-gradient(180deg, #35455D, #405a94)',
          padding: '30px',
          borderRadius: '8px'
        }}
      >
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16pt', color: 'white' }}>
          Register
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label style={{ position: 'relative', top: '-4px', color: 'white' }}>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', color: 'black' }}
            />
          </div>

          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label style={{ position: 'relative', top: '-4px', color: 'white' }}>Username: </label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', color: 'black' }}
            />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label style={{ position: 'relative', top: '-4px', color: 'white' }}>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', color: 'black' }}
            />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label style={{ position: 'relative', top: '-4px', color: 'white' }}>
              Confirm Password:{' '}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', color: 'black' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
            onClick={handleRegister}
            style={{
              position: 'relative',
              top: '5px',
              display: 'block',
              margin: '0 auto',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #405a94, #35455D)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = 'linear-gradient(180deg, #35455D, #405a94)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = 'linear-gradient(180deg, #405a94, #35455D)')
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
