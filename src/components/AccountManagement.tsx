import React, { useState } from 'react'
import { useUser } from '../hooks/userHooks/useGetUser'
import { useUpdateUser } from '../hooks/userHooks/useUserMutations'
import { useNavigate } from 'react-router'

const AccountManagementPage: React.FC = () => {
  const { data: user, isLoading } = useUser()
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const updateUser = useUpdateUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (formState.email || formState.password) {
      if (user && user.id) {
        updateUser.mutate({
          id: user.id,
          data: {
            email: formState.email,
            hashed_password: formState.password
          }
        })
        navigate('/login')
      } else {
        console.error('User ID not found')
      }
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#4d5b7a',
        color: '#dcdde0',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1>Account Management</h1>
      <div style={{ margin: '10px' }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder={user?.email || ''}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>
      <div style={{ margin: '10px' }}>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="New password"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          color: '#dcdde0',
          backgroundColor: '#35455D',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Update Profile
      </button>
    </div>
  )
}

export default AccountManagementPage
