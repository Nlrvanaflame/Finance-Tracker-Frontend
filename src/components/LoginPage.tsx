import React, { useState } from 'react'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    // Here you would generally call your API to perform authentication
    if (email === 'user@example.com' && password === 'password123') {
      setError('')
      alert('Login successful')
      // Navigate to the dashboard page (using a tool like react-router-dom)
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
