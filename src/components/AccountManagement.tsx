import React, { useState } from 'react'

const AccountManagementPage = () => {
  const [user, setUser] = useState({
    id: '12345',
    email: 'dummy@example.com',
    password: 'dummy123'
  })

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (formState.email) {
      setUser((prevState) => ({
        ...prevState,
        email: formState.email
      }))
    }
    if (formState.password) {
      setUser((prevState) => ({
        ...prevState,
        password: formState.password
      }))
    }
    alert('Profile updated successfully!')
  }

  return (
    <div>
      <h1>Account Management</h1>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder={user.email}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="New password"
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Update Profile</button>
    </div>
  )
}

export default AccountManagementPage
