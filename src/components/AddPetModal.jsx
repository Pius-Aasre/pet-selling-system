import React, { useState } from 'react';
import { X, Plus, Minus, Loader } from 'lucide-react';
import usePetStore from '../stores/petStore';
import useAuthStore from '../stores/authStore';

const AddPetModal = ({ isOpen, onClose }) => {
  const [petData, setPetData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    price: '',
    description: '',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop'
    ],
    location: '',
    vaccinated: false,
    trained: false,
    gender: 'Male',
    weight: ''
  });
  const [errors, setErrors] = useState({});

  const { addPet, isLoading, error } = usePetStore();
  const { user } = useAuthStore();

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!petData.name.trim()) {
      newErrors.name = 'Pet name is required';
    }

    if (!petData.breed.trim()) {
      newErrors.breed = 'Breed is required';
    }

    if (!petData.age || petData.age < 0 || petData.age > 30) {
      newErrors.age = 'Please enter a valid age (0-30 years)';
    }

    if (!petData.price || petData.price <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!petData.description.trim() || petData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!petData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!petData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setPetData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...petData.images];
    newImages[index] = value;
    setPetData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    if (petData.images.length < 5) {
      setPetData(prev => ({
        ...prev,
        images: [...prev.images, '']
      }));
    }
  };

  const removeImageField = (index) => {
    if (petData.images.length > 1) {
      const newImages = petData.images.filter((_, i) => i !== index);
      setPetData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const petInfo = {
      ...petData,
      age: parseInt(petData.age),
      price: parseFloat(petData.price),
      images: petData.images.filter(img => img.trim() !== ''),
      sellerId: user?.id,
      sellerName: user?.name,
      sellerPhone: user?.phone
    };

    const result = await addPet(petInfo);
    if (result.success) {
      onClose();
      // Reset form
      setPetData({
        name: '',
        species: 'Dog',
        breed: '',
        age: '',
        price: '',
        description: '',
        images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop'],
        location: '',
        vaccinated: false,
        trained: false,
        gender: 'Male',
        weight: ''
      });
      setErrors({});
      alert('Pet listed successfully!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">List Your Pet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-3 mx-6 mt-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                <input
                  type="text"
                  value={petData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter pet's name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                  <select
                    value={petData.species}
                    onChange={(e) => handleInputChange('species', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Fish">Fish</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Hamster">Hamster</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input
                    type="text"
                    value={petData.breed}
                    onChange={(e) => handleInputChange('breed', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.breed ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter breed"
                  />
                  {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                  <input
                    type="number"
                    value={petData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.age ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Age"
                    min="0"
                    max="30"
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={petData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={petData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.weight ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 5 lbs"
                  />
                  {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  value={petData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={petData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="City, State"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Health & Training</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={petData.vaccinated}
                      onChange={(e) => handleInputChange('vaccinated', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Vaccinated</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={petData.trained}
                      onChange={(e) => handleInputChange('trained', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Trained</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Images and Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Images & Description</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet Images (URLs)</label>
                <div className="space-y-2">
                  {petData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter image URL"
                      />
                      {petData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {petData.images.length < 5 && (
                  <button
                    type="button"
                    onClick={addImageField}
                    className="mt-2 flex items-center text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Another Image
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={petData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  rows="6"
                  placeholder="Describe your pet's personality, behavior, and any special care needs..."
                />
                <div className="flex justify-between mt-1">
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                  <p className="text-gray-500 text-sm ml-auto">{petData.description.length}/500 characters</p>
                </div>
              </div>

              {/* Preview */}
              {petData.images[0] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={petData.images[0]}
                      alt="Pet preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                      }}
                    />
                    <div className="p-3">
                      <h4 className="font-semibold">{petData.name || 'Pet Name'}</h4>
                      <p className="text-sm text-gray-600">{petData.breed} • {petData.species}</p>
                      <p className="text-primary-600 font-semibold">${petData.price || '0'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Listing Pet...
                </>
              ) : (
                'List Pet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
