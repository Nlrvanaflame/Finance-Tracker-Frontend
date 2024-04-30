import React from 'react';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation, useGetUserFromTokenQuery } from '../services/api';

const LandingPage: React.FC = () => {
  const { data: user, isLoading } = useGetUserFromTokenQuery();
  const [logoutUser] = useLogoutUserMutation(); 

  const handleLogout = async () => {
    await logoutUser().unwrap(); 
    localStorage.removeItem('token'); 
    window.location.reload(); 
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#4d5b7a',
        fontFamily: 'Arial, sans-serif',
        color: '#dcdde0'
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          backgroundColor: '#35455D'
        }}
      >
        <h1 style={{ color: 'white', fontWeight: 'bold' }}>Finance Tracker</h1>
        <nav style={{ display: 'flex', gap: '20px' }}>
          {isLoading ? (
            <span>Loading...</span>
          ) : user ? (
            <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              <span>Hello, {user.username}!</span>
              <Link
                to="/account-management"
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Manage Account
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: 'inherit'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: '#7b6d4e',
                  padding: '10px',
                  borderRadius: '12px'
                }}
              >
                <Link
                  to="/register"
                  style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  Register
                </Link>
              </div>
              <div
                style={{
                  backgroundColor: '#405a94',
                  padding: '10px',
                  borderRadius: '12px'
                }}
              >
                <Link
                  to="/login"
                  style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  Login
                </Link>
              </div>
            </>
          )}
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
            backgroundColor: '#35455D',
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
              <h2 style={{ color: 'white', fontWeight: 'bold' }}>Financial Overview</h2>
              <p style={{ color: 'white', fontStyle: 'italic' }}>
                Get a quick snapshot of your financial status at a glance.
              </p>
              <p style={{ color: 'white', fontWeight: 'bold' }}>Learn More</p>
            </div>
          </Link>
        </section>

        <section
          style={{
            backgroundColor: '#35455D',
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
              <h2 style={{ color: 'white', fontWeight: 'bold' }}>Records Management</h2>
              <p style={{ color: 'white', fontStyle: 'italic' }}>
                Manage and keep track of your financial records easily.
              </p>
              <p style={{ color: 'white', fontWeight: 'bold' }}>Learn More</p>
            </div>
          </Link>
        </section>
      </main>

      <footer style={{ backgroundColor: '#35455D', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: 'white', fontStyle: 'italic' }}>© 2023 Finance Tracker</p>
      </footer>
    </div>
  );
}

export default LandingPage;
