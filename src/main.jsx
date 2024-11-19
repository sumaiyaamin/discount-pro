import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import router from './utils/router';
import { AuthProvider } from './utils/AuthContext'; // Use AuthProvider instead of UserProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* Use AuthProvider here */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);