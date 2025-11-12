import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePetStore = create(
  persist(
    (set, get) => ({
      pets: [
        {
          id: 1,
          name: 'Buddy',
          species: 'Dog',
          breed: 'Golden Retriever',
          age: 2,
          price: 800,
          description: 'Friendly and energetic Golden Retriever. Great with kids and other pets. Fully vaccinated and trained.',
          images: [
            'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=400&h=300&fit=crop'
          ],
          location: 'New York, NY',
          sellerId: 1,
          sellerName: 'Demo User',
          sellerPhone: '+1234567890',
          vaccinated: true,
          trained: true,
          gender: 'Male',
          weight: '65 lbs',
          createdAt: new Date(2024, 0, 15).toISOString(),
          status: 'available'
        },
        {
          id: 2,
          name: 'Whiskers',
          species: 'Cat',
          breed: 'Persian',
          age: 1,
          price: 500,
          description: 'Beautiful Persian cat with long, silky fur. Very calm and affectionate. Perfect for apartment living.',
          images: [
            'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=300&fit=crop'
          ],
          location: 'Los Angeles, CA',
          sellerId: 2,
          sellerName: 'Jane Smith',
          sellerPhone: '+1987654321',
          vaccinated: true,
          trained: false,
          gender: 'Female',
          weight: '8 lbs',
          createdAt: new Date(2024, 1, 10).toISOString(),
          status: 'available'
        },
        {
          id: 3,
          name: 'Charlie',
          species: 'Dog',
          breed: 'Labrador',
          age: 3,
          price: 600,
          description: 'Loyal and intelligent Labrador. Excellent family pet with great temperament. Loves swimming and fetching.',
          images: [
            'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop'
          ],
          location: 'Chicago, IL',
          sellerId: 3,
          sellerName: 'Mike Johnson',
          sellerPhone: '+1555666777',
          vaccinated: true,
          trained: true,
          gender: 'Male',
          weight: '70 lbs',
          createdAt: new Date(2024, 2, 5).toISOString(),
          status: 'available'
        },
        {
          id: 4,
          name: 'Luna',
          species: 'Cat',
          breed: 'Siamese',
          age: 2,
          price: 450,
          description: 'Elegant Siamese cat with striking blue eyes. Very vocal and social. Enjoys interactive play and attention.',
          images: [
            'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop'
          ],
          location: 'Miami, FL',
          sellerId: 4,
          sellerName: 'Sarah Wilson',
          sellerPhone: '+1444555666',
          vaccinated: true,
          trained: false,
          gender: 'Female',
          weight: '9 lbs',
          createdAt: new Date(2024, 2, 20).toISOString(),
          status: 'available'
        }
      ],
      filteredPets: [],
      selectedPet: null,
      filters: {
        species: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        search: ''
      },
      isLoading: false,
      error: null,

      // Initialize filtered pets
      initializeFilters: () => {
        const { pets } = get();
        set({ filteredPets: pets });
      },

      // Get pet by ID
      getPetById: (id) => {
        const { pets } = get();
        return pets.find(pet => pet.id === parseInt(id));
      },

      // Set selected pet
      setSelectedPet: (pet) => {
        set({ selectedPet: pet });
      },

      // Filter pets based on criteria
      filterPets: (newFilters) => {
        const { pets } = get();
        set({ filters: { ...get().filters, ...newFilters } });
        
        const filters = { ...get().filters, ...newFilters };
        
        let filtered = pets.filter(pet => {
          // Species filter
          if (filters.species && pet.species.toLowerCase() !== filters.species.toLowerCase()) {
            return false;
          }
          
          // Price range filter
          if (filters.minPrice && pet.price < parseInt(filters.minPrice)) {
            return false;
          }
          if (filters.maxPrice && pet.price > parseInt(filters.maxPrice)) {
            return false;
          }
          
          // Location filter
          if (filters.location && !pet.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
          }
          
          // Search filter (name, breed, description)
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const searchable = `${pet.name} ${pet.breed} ${pet.description}`.toLowerCase();
            if (!searchable.includes(searchTerm)) {
              return false;
            }
          }
          
          return pet.status === 'available';
        });
        
        set({ filteredPets: filtered });
      },

      // Clear all filters
      clearFilters: () => {
        const { pets } = get();
        set({ 
          filters: {
            species: '',
            minPrice: '',
            maxPrice: '',
            location: '',
            search: ''
          },
          filteredPets: pets.filter(pet => pet.status === 'available')
        });
      },

      // Add new pet listing
      addPet: async (petData) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { pets } = get();
          const newPet = {
            ...petData,
            id: pets.length + 1,
            createdAt: new Date().toISOString(),
            status: 'available'
          };
          
          const updatedPets = [...pets, newPet];
          
          set({ 
            pets: updatedPets,
            filteredPets: updatedPets.filter(pet => pet.status === 'available'),
            isLoading: false 
          });
          
          return { success: true, petId: newPet.id };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Update pet status (e.g., when sold)
      updatePetStatus: (petId, status) => {
        const { pets, filteredPets } = get();
        const updatedPets = pets.map(pet => 
          pet.id === petId ? { ...pet, status } : pet
        );
        
        set({ 
          pets: updatedPets,
          filteredPets: updatedPets.filter(pet => pet.status === 'available')
        });
      },

      // Get pets by seller ID
      getPetsBySeller: (sellerId) => {
        const { pets } = get();
        return pets.filter(pet => pet.sellerId === sellerId);
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'pet-storage',
      partialize: (state) => ({
        pets: state.pets
      }),
    }
  )
);

export default usePetStore;
