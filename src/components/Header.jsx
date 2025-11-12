import React, { useState } from 'react';
import { Heart, ShoppingCart, User, Menu, X, Plus } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import useCartStore from '../stores/cartStore';
import Login from './Login';
import Register from './Register';

const Header = ({ onShowAddPet, onShowCart }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const { getCartItemCount } = useCartStore();

  const cartItemCount = getCartItemCount();

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-800">
                PetMarket
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                <a href="#home" className="text-gray-700 hover:text-primary-600 font-medium">
                  Home
                </a>
                <a href="#pets" className="text-gray-700 hover:text-primary-600 font-medium">
                  Browse Pets
                </a>
                <a href="#about" className="text-gray-700 hover:text-primary-600 font-medium">
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-primary-600 font-medium">
                  Contact
                </a>
              </nav>

              <div className="flex items-center space-x-4">
                {/* Add Pet Button (only for authenticated users) */}
                {isAuthenticated && (
                  <button
                    onClick={onShowAddPet}
                    className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Sell Pet
                  </button>
                )}

                {/* Cart */}
                <div className="relative">
                  <button onClick={onShowCart}>
                    <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary-600 cursor-pointer" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* User Authentication */}
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                    >
                      <User className="h-6 w-6" />
                      <span className="font-medium">{user?.name}</span>
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <a
                          href="#dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </a>
                        <a
                          href="#orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Orders
                        </a>
                        <a
                          href="#listings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Listings
                        </a>
                        <a
                          href="#profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </a>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setShowRegister(true)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-700 hover:text-primary-600"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#home"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                >
                  Home
                </a>
                <a
                  href="#pets"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                >
                  Browse Pets
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                >
                  Contact
                </a>

                {/* Mobile Cart */}
                <button 
                  onClick={() => {
                    onShowCart();
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center px-3 py-2 w-full text-left hover:bg-gray-50"
                >
                  <ShoppingCart className="h-6 w-6 text-gray-700 mr-2" />
                  <span className="text-gray-700 font-medium">
                    Cart ({cartItemCount})
                  </span>
                </button>

                {/* Mobile Authentication */}
                {isAuthenticated ? (
                  <div className="border-t border-gray-200 pt-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    {isAuthenticated && (
                      <button
                        onClick={onShowAddPet}
                        className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-gray-100 flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Sell Pet
                      </button>
                    )}
                    <a
                      href="#dashboard"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                    <a
                      href="#orders"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </a>
                    <a
                      href="#listings"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Listings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pt-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowLogin(true);
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-primary-600 font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowRegister(true);
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 bg-primary-600 text-white rounded-lg font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </>
  );
};

export default Header;
