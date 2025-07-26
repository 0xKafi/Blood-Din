import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { router } from './Components/Router/Router.jsx';
import './index.css'
import AuthProvider from './Components/Auth/AuthProvider.jsx';
import UserProvider from './Components/Context/UserProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
)
