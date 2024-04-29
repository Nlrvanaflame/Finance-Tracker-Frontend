import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import './styles/global.css'
import { Provider as JotaiProvider } from "jotai";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
      <App />
      </JotaiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

export default queryClient
