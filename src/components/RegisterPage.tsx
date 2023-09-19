import React, { useState } from 'react'

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
    <div>
      <h1>Register</h1>
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
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
