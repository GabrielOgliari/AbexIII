import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Navigator} from "./navigation/Navigation.tsx";
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigator />
    </QueryClientProvider>
  );
};
