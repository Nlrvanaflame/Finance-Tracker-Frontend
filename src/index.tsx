import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react';
import App from './App'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider>
      <App />
      </Provider>
  </React.StrictMode>
)

