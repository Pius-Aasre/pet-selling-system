import React, { useState } from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import CheckoutForm from './CheckoutForm';

const Cart = ({ isOpen, onClose }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, removeFromCart, clearCart, getCartTotal } = useCartStore();

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckout(true);
  };

  if (showCheckout) {
    return (
      <CheckoutForm 
        isOpen={true} 
        onClose={() => {
          setShowCheckout(false);
          onClose();
        }}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
            <span className="ml-2 bg-primary-100 text-primary-800 text-sm font-medium px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-full max-h-96">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Your cart is empty</h3>
                <p className="text-gray-400">Add some adorable pets to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((pet) => (
                  <div key={pet.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                    <img
                      src={pet.images[0]}
                      alt={pet.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                      <p className="text-sm text-gray-600">{pet.breed} • {pet.species}</p>
                      <p className="text-sm text-gray-500">{pet.location}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary-600">${pet.price}</p>
                      <button
                        onClick={() => removeFromCart(pet.id)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${getCartTotal()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>

              {/* Security Notice */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  🔒 Secure checkout with Razorpay payment gateway
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
