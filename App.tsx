import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Navigation from './src/navigation/Navigation';
import { AuthContextProvider } from './src/contexts/auth/auth.context';
import { BASE_URL } from './src/constants/utils';

const queryClient = new QueryClient();

axios.defaults.baseURL = BASE_URL;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  </QueryClientProvider>
);

export default App;
