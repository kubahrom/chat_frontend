import { useQueryClient } from '@tanstack/react-query';

import { User } from '@/types/users';
import { handleLogout, logout } from '@/modules/auth';
import { useGlobalStore } from '@/store/globalStore';

export const useUser = () => {
  const [globalStore, setGlobalStore] = useGlobalStore();
  const queryClient = useQueryClient();

  return {
    user: globalStore.user,
    setUser: (user: User | null) =>
      setGlobalStore((state) => ({
        ...state,
        user,
      })),
    logoutUser: async () => {
      logout().then(() => {
        handleLogout();
        queryClient.clear();
        setGlobalStore((state) => ({
          ...state,
          user: null,
        }));
      });
    },
  };
};
