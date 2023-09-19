import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Finance Tracker</h1>
        <p>Track your finances with ease and insight</p>
      </header>

      <main>
        <section>
          <h2>Features</h2>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Financial Overview</Link>
            </li>
            <li>
              <Link to="/record-management">Records Management</Link>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2023 Finance Tracker</p>
      </footer>
    </div>
  )
}

export default LandingPage
