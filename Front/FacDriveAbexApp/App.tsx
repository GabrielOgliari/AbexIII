import { QueryClient, QueryClientProvider } from 'react-query';
import { FormStateProvider } from './src/context/useFormStateContext.tsx';
import { Navigator } from './src/navigation/Navigation.tsx';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FormStateProvider>
        <Navigator />
      </FormStateProvider>
    </QueryClientProvider>
  );
};
