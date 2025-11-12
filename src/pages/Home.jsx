import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Shield, Award } from 'lucide-react';
import usePetStore from '../stores/petStore';
import PetCard from '../components/PetCard';
import PetFilters from '../components/PetFilters';
import PetDetailModal from '../components/PetDetailModal';

const Home = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const { filteredPets, initializeFilters } = usePetStore();

  useEffect(() => {
    initializeFilters();
  }, [initializeFilters]);

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-primary-200">Furry Friend</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connect with loving pets looking for their forever homes. 
              Safe, secure, and trusted by thousands of pet lovers.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="#pets"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                Browse Pets
                <Heart className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#how-it-works"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose PetMarket?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding and adopting pets safe, easy, and secure with our trusted platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                All payments processed through Razorpay with bank-level security and encryption.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Sellers</h3>
              <p className="text-gray-600">
                All pet sellers are verified to ensure the health and authenticity of every pet.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Process</h3>
              <p className="text-gray-600">
                Browse, select, and purchase pets in just a few clicks with our intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section id="pets" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Find Your New Best Friend
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our collection of adorable pets waiting for loving homes.
            </p>
          </div>

          <PetFilters />

          {/* Pet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onClick={() => handlePetClick(pet)}
              />
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Heart className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No pets found</h3>
              <p className="text-gray-500">Try adjusting your search filters to see more results.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Happy Pets</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Satisfied Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">99%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting your perfect pet is easier than ever with our simple 4-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Pets</h3>
              <p className="text-gray-600 text-sm">
                Search through our curated collection of pets using filters for breed, location, and price.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Select & Add to Cart</h3>
              <p className="text-gray-600 text-sm">
                Found your perfect match? Add them to your cart and review all the details.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Checkout</h3>
              <p className="text-gray-600 text-sm">
                Complete your purchase with our secure Razorpay payment gateway.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Meet Your Pet</h3>
              <p className="text-gray-600 text-sm">
                Connect with the seller to arrange pickup or delivery of your new furry friend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Pet?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of happy pet owners who found their companions through PetMarket.
          </p>
          <a
            href="#pets"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center"
          >
            Start Browsing
            <Heart className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Pet Detail Modal */}
      {selectedPet && (
        <PetDetailModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}
    </div>
  );
};

export default Home;
