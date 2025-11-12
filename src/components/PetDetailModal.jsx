import React, { useState } from 'react';
import { X, MapPin, Phone, CheckCircle, DollarSign, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import useAuthStore from '../stores/authStore';

const PetDetailModal = ({ pet, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, removeFromCart, cart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  
  const isInCart = cart.some(item => item.id === pet.id);

  if (!pet) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === pet.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? pet.images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add pets to cart');
      return;
    }

    if (isInCart) {
      removeFromCart(pet.id);
    } else {
      addToCart(pet);
    }
  };

  const formatAge = (age) => {
    return age === 1 ? '1 year old' : `${age} years old`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={pet.images[currentImageIndex]}
                  alt={`${pet.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Navigation Arrows */}
                {pet.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {pet.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {pet.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {pet.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {pet.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-primary-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${pet.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pet Information */}
            <div className="space-y-6">
              {/* Price and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-3xl font-bold text-primary-600">
                  <DollarSign className="h-8 w-8" />
                  <span>{pet.price}</span>
                </div>
                <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                  Available
                </span>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Species</h3>
                  <p className="text-lg text-gray-800">{pet.species}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Breed</h3>
                  <p className="text-lg text-gray-800">{pet.breed}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Age</h3>
                  <p className="text-lg text-gray-800">{formatAge(pet.age)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="text-lg text-gray-800 capitalize">{pet.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                  <p className="text-lg text-gray-800">{pet.weight}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-lg text-gray-800 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pet.location}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {pet.vaccinated && (
                    <span className="flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Vaccinated
                    </span>
                  )}
                  {pet.trained && (
                    <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Trained
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{pet.description}</p>
              </div>

              {/* Seller Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Seller Information</h3>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Name:</span>
                    {pet.sellerName}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium mr-2">Phone:</span>
                    {pet.sellerPhone}
                  </p>
                  <p className="text-xs text-gray-500">
                    Listed on {formatDate(pet.createdAt)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                    isInCart
                      ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>

                <button className="w-full py-3 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailModal;
