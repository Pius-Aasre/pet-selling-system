import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,
      paymentLoading: false,

      // Add pet to cart
      addToCart: (pet) => {
        const { cart } = get();
        
        // Check if pet is already in cart
        const existingItem = cart.find(item => item.id === pet.id);
        if (existingItem) {
          set({ error: 'This pet is already in your cart!' });
          return { success: false, error: 'Pet already in cart' };
        }

        const cartItem = {
          ...pet,
          addedAt: new Date().toISOString()
        };

        set({ 
          cart: [...cart, cartItem],
          error: null 
        });
        
        return { success: true };
      },

      // Remove pet from cart
      removeFromCart: (petId) => {
        const { cart } = get();
        const updatedCart = cart.filter(item => item.id !== petId);
        set({ cart: updatedCart });
      },

      // Clear entire cart
      clearCart: () => {
        set({ cart: [] });
      },

      // Get cart total
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price, 0);
      },

      // Get cart item count
      getCartItemCount: () => {
        const { cart } = get();
        return cart.length;
      },

      // Create order from cart
      createOrder: async (orderDetails) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { cart, orders } = get();
          
          if (cart.length === 0) {
            throw new Error('Cart is empty');
          }

          const order = {
            id: `ORDER-${Date.now()}`,
            items: [...cart],
            customer: orderDetails.customer,
            shipping: orderDetails.shipping,
            total: get().getCartTotal(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            paymentStatus: 'pending'
          };

          set({ 
            currentOrder: order,
            orders: [...orders, order],
            isLoading: false 
          });
          
          return { success: true, order };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Process payment (mock Razorpay integration)
      processPayment: async (paymentData) => {
        set({ paymentLoading: true, error: null });
        
        try {
          // Simulate Razorpay payment processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const { currentOrder, orders } = get();
          
          if (!currentOrder) {
            throw new Error('No order to process');
          }

          // Update order status
          const updatedOrder = {
            ...currentOrder,
            status: 'confirmed',
            paymentStatus: 'completed',
            paymentId: paymentData.razorpay_payment_id || `pay_${Date.now()}`,
            paidAt: new Date().toISOString()
          };

          const updatedOrders = orders.map(order => 
            order.id === currentOrder.id ? updatedOrder : order
          );

          set({ 
            orders: updatedOrders,
            currentOrder: updatedOrder,
            cart: [], // Clear cart after successful payment
            paymentLoading: false 
          });
          
          return { success: true, order: updatedOrder };
        } catch (error) {
          set({ error: error.message, paymentLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Handle payment failure
      handlePaymentFailure: (error) => {
        const { currentOrder, orders } = get();
        
        if (currentOrder) {
          const updatedOrder = {
            ...currentOrder,
            status: 'failed',
            paymentStatus: 'failed',
            failureReason: error.description || 'Payment failed'
          };

          const updatedOrders = orders.map(order => 
            order.id === currentOrder.id ? updatedOrder : order
          );

          set({ 
            orders: updatedOrders,
            currentOrder: updatedOrder,
            paymentLoading: false,
            error: error.description || 'Payment failed'
          });
        }
      },

      // Get orders by user ID
      getOrdersByUser: (userId) => {
        const { orders } = get();
        return orders.filter(order => order.customer?.userId === userId);
      },

      // Get order by ID
      getOrderById: (orderId) => {
        const { orders } = get();
        return orders.find(order => order.id === orderId);
      },

      // Update order status
      updateOrderStatus: (orderId, status) => {
        const { orders } = get();
        const updatedOrders = orders.map(order => 
          order.id === orderId ? { ...order, status } : order
        );
        set({ orders: updatedOrders });
      },

      // Clear current order
      clearCurrentOrder: () => {
        set({ currentOrder: null });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders
      }),
    }
  )
);

export default useCartStore;
