import { createBrowserRouter, RouterProvider, RouteObject, Outlet } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import RecordManagementPage from './components/RecordManagementPage'

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <div>
          <hr />
          <Outlet />
        </div>
      ),
      children: [
        { path: '/', element: <LandingPage />, index: true },
        { path: 'register', element: <RegisterPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'record-management', element: <RecordManagementPage /> }
      ]
    }
  ]

  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default App
