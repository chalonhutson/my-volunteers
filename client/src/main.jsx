import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthProvider } from "react-auth-kit"

import './css/App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={"localhost"}
      authTimeStorageKey={"_auth_time"}
      cookieSecure={false}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
