import React from 'react';
import { MapPin, Calendar, DollarSign, Phone, ShoppingCart, CheckCircle, X } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import useAuthStore from '../stores/authStore';

const PetCard = ({ pet, onClick, showFullWidth = false }) => {
  const { addToCart, removeFromCart, cart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  
  const isInCart = cart.some(item => item.id === pet.id);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click
    
    if (!isAuthenticated) {
      alert('Please login to add pets to cart');
      return;
    }

    if (isInCart) {
      removeFromCart(pet.id);
    } else {
      const result = addToCart(pet);
      if (result.success) {
        // Success feedback could be added here
      }
    }
  };

  const formatAge = (age) => {
    return age === 1 ? '1 year old' : `${age} years old`;
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden ${
        showFullWidth ? 'w-full' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-full shadow-md transition-all ${
              isInCart 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            {isInCart ? (
              <X className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {/* Pet Status Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            Available
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{pet.name}</h3>
          <div className="flex items-center text-primary-600 font-bold">
            <DollarSign className="h-4 w-4" />
            <span>{pet.price}</span>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <span className="font-medium">{pet.breed}</span>
            <span className="mx-2">•</span>
            <span>{pet.species}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatAge(pet.age)}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{pet.gender}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{pet.location}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center space-x-3 mb-3">
          {pet.vaccinated && (
            <div className="flex items-center text-green-600 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>Vaccinated</span>
            </div>
          )}
          {pet.trained && (
            <div className="flex items-center text-blue-600 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>Trained</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {pet.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            <span>By {pet.sellerName}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Phone className="h-3 w-3 mr-1" />
            <span>Contact</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full mt-3 py-2 px-4 rounded-lg font-medium transition-colors ${
            isInCart
              ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default PetCard;
