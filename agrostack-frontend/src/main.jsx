import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:100*60*5, //5 min cache
      refetchOnWindowFocus:false
    }
  }
})
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
     <Toaster position="top-right" />
    <App />
  </QueryClientProvider>
)
