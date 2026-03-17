import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CACHE_STALE_TIME, CACHE_GC_TIME, CACHE_AGGRESSIVE_REFETCH,
  CACHE_RETRIES, CACHE_RETRY_DELAY } from './config';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_STALE_TIME, 
      gcTime: CACHE_GC_TIME,
      refetchOnWindowFocus: CACHE_AGGRESSIVE_REFETCH,
      refetchOnMount: CACHE_AGGRESSIVE_REFETCH,
      refetchOnReconnect: CACHE_AGGRESSIVE_REFETCH,
      retry: CACHE_RETRIES,
      retryDelay: CACHE_RETRY_DELAY,
    },
  },
});

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </BrowserRouter>
);