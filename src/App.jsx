import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'white',
              color: '#0f172a',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: { iconTheme: { primary: '#10b981', secondary: 'white' } },
            error: { iconTheme: { primary: '#ef4444', secondary: 'white' } },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  );
}
