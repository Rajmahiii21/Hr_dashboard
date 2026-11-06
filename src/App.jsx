import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RoleProvider } from './context/RoleContext';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <RoleProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </RoleProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
