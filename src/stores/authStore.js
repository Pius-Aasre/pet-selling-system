import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Mock users database (in real app, this would be a backend API)
      users: [
        {
          id: 1,
          email: 'demo@example.com',
          password: 'password123',
          name: 'Demo User',
          phone: '+1234567890',
          address: '123 Pet Street, Animal City'
        }
      ],

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { users } = get();
          const user = users.find(u => u.email === email && u.password === password);
          
          if (!user) {
            throw new Error('Invalid credentials');
          }

          const { password: _, ...userWithoutPassword } = user;
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false, 
            isAuthenticated: false, 
            user: null 
          });
          return { success: false, error: error.message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { users } = get();
          
          // Check if user already exists
          const existingUser = users.find(u => u.email === userData.email);
          if (existingUser) {
            throw new Error('User already exists');
          }

          // Create new user
          const newUser = {
            id: users.length + 1,
            ...userData,
            createdAt: new Date().toISOString()
          };

          const updatedUsers = [...users, newUser];
          const { password: _, ...userWithoutPassword } = newUser;

          set({ 
            users: updatedUsers,
            user: userWithoutPassword, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false, 
            isAuthenticated: false, 
            user: null 
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        users: state.users
      }),
    }
  )
);

export default useAuthStore;
