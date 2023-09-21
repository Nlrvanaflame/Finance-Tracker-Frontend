import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = () => {
    // Here you would generally call your API to perform registration
    if (password === confirmPassword) {
      setError('')
      alert('Registration successful')
      // Navigate to the dashboard page (using a tool like react-router-dom)
    } else {
      setError('Passwords do not match')
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
          height: '400px',
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
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <label style={{ position: 'relative', top: '-4px', color: 'white' }}>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button
            onClick={handleRegister}
            style={{
              position: 'relative',
              top: '17px',
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
