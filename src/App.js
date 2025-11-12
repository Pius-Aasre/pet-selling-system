import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './components/Cart';
import AddPetModal from './components/AddPetModal';
import Footer from './components/Footer';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);

  return (
    <div className="App">
      <Header 
        onShowCart={() => setShowCart(true)}
        onShowAddPet={() => setShowAddPet(true)}
      />
      <Home />
      <Footer />
      
      {/* Cart Modal */}
      <Cart 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
      />
      
      {/* Add Pet Modal */}
      {showAddPet && (
        <AddPetModal 
          isOpen={showAddPet} 
          onClose={() => setShowAddPet(false)} 
        />
      )}
    </div>
  );
}

export default App;
