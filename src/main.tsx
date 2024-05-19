import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myRouter from './router'
import { SettingsProvider } from './context/settingsContext'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SettingsProvider defaultTheme="light" defaultLanguage='en' defaultSound='on'>
      <RouterProvider router={myRouter} />
    </SettingsProvider>
  </QueryClientProvider>
)
