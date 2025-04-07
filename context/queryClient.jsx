import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Coba ulang sekali kalau gagal
      staleTime: 1000 * 60 * 5, // Cache data selama 5 menit
    },
  },
});

export default queryClient;
