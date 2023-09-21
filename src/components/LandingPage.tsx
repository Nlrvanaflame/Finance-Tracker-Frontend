import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#4d5b7a',
        fontFamily: 'Arial, sans-serif',
        color: '#dcdde0' // Setting a default text color to match the new scheme
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          backgroundColor: '#35455D' // Adjusted header background color
        }}
      >
        <h1 style={{ color: '#dcdde0', fontWeight: 'bold' }}>Finance Tracker</h1>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link
            to="/register"
            style={{ color: '#dcdde0', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Register
          </Link>
          <Link
            to="/login"
            style={{ color: '#dcdde0', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Login
          </Link>
        </nav>
      </header>

      <main
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          flexWrap: 'wrap'
        }}
      >
        <section
          style={{
            backgroundColor: '#35455D', // Adjusted section background color
            padding: '20px',
            borderRadius: '8px',
            width: '45%',
            margin: '10px'
          }}
        >
          <Link
            to="/dashboard"
            style={{ textDecoration: 'none', display: 'block', height: '100%' }}
          >
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <h2 style={{ color: '#dcdde0', fontWeight: 'bold' }}>Financial Overview</h2>
              <p style={{ color: '#dcdde0', fontStyle: 'italic' }}>
                Get a quick snapshot of your financial status at a glance.
              </p>
              <p style={{ color: '#dcdde0', fontWeight: 'bold' }}>Learn More</p>
            </div>
          </Link>
        </section>

        <section
          style={{
            backgroundColor: '#35455D', // Adjusted section background color
            padding: '20px',
            borderRadius: '8px',
            width: '45%',
            margin: '10px'
          }}
        >
          <Link
            to="/record-management"
            style={{ textDecoration: 'none', display: 'block', height: '100%' }}
          >
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <h2 style={{ color: '#dcdde0', fontWeight: 'bold' }}>Records Management</h2>
              <p style={{ color: '#dcdde0', fontStyle: 'italic' }}>
                Manage and keep track of your financial records easily.
              </p>
              <p style={{ color: '#dcdde0', fontWeight: 'bold' }}>Learn More</p>
            </div>
          </Link>
        </section>
      </main>

      <footer style={{ backgroundColor: '#35455D', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#dcdde0', fontStyle: 'italic' }}>© 2023 Finance Tracker</p>
      </footer>
    </div>
  )
}

export default LandingPage
