# Pet Selling System

A comprehensive pet marketplace application built with React.js, Tailwind CSS, and Zustand for state management. This platform allows users to securely buy and sell pets with integrated payment processing through Razorpay.

## 🌟 Features

### For Buyers
- **Browse Pets**: Search and filter through available pets by species, breed, location, and price
- **Detailed Pet Profiles**: View comprehensive information including images, description, health status, and seller details
- **Shopping Cart**: Add multiple pets to cart and manage selections
- **Secure Checkout**: Complete purchases with integrated Razorpay payment gateway
- **User Authentication**: Secure login/registration system
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### For Sellers
- **Pet Listings**: Create detailed listings for pets with multiple images and descriptions
- **Seller Profile**: Manage contact information and listed pets
- **Order Management**: Track sales and buyer communications

### Security & Trust
- **Secure Payments**: Razorpay integration for safe transaction processing
- **User Verification**: Authentication system for buyer and seller security
- **Data Protection**: Secure handling of user information and payment data

## 🛠️ Technology Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand
- **Icons**: Lucide React
- **Payment Processing**: Razorpay SDK (Mock Implementation)
- **Build Tool**: Create React App

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Usage

### Demo Account
- **Email**: demo@example.com
- **Password**: password123

### Getting Started as a Buyer

1. **Browse Pets**: Visit the homepage and scroll to the pet listings section
2. **Use Filters**: Apply filters to find pets by species, price range, or location
3. **View Details**: Click on any pet card to view detailed information
4. **Add to Cart**: Click the "Add to Cart" button on pet cards or detail modal
5. **Checkout**: 
   - Click the cart icon in the header
   - Review your selections
   - Proceed to checkout
   - Fill in shipping information
   - Complete payment through Razorpay (Mock)

### Getting Started as a Seller

1. **Create Account**: Register for a new account or login
2. **List Your Pet**:
   - Click "Sell Pet" in the header
   - Fill in comprehensive pet information
   - Add multiple images (URLs)
   - Set your price
   - Submit the listing
3. **Manage Listings**: Your pets will appear in the marketplace immediately

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation and authentication
│   ├── Footer.jsx      # Site footer
│   ├── Login.jsx       # Login modal
│   ├── Register.jsx    # Registration modal
│   ├── PetCard.jsx     # Pet listing card
│   ├── PetFilters.jsx  # Search and filter component
│   ├── PetDetailModal.jsx # Detailed pet view
│   ├── Cart.jsx        # Shopping cart modal
│   ├── CheckoutForm.jsx # Order and payment form
│   └── AddPetModal.jsx # Pet listing form
├── stores/             # Zustand state management
│   ├── authStore.js    # User authentication state
│   ├── petStore.js     # Pet data and filtering
│   └── cartStore.js    # Cart and order management
├── pages/              # Main page components
│   └── Home.jsx        # Homepage with hero and pet listings
├── utils/              # Utility functions
├── App.js             # Main application component
└── index.css          # Global styles and Tailwind imports
```

## 💳 Payment Integration

The application includes mock Razorpay integration for demonstration purposes. In a production environment:

1. **Setup Razorpay Account**: Create an account at [razorpay.com](https://razorpay.com)
2. **Configure API Keys**: Add your Razorpay API keys to the application
3. **Update Payment Logic**: Modify the payment processing in `cartStore.js`

## 🎨 Key Features

### Advanced Pet Filtering
- Species-based filtering (Dogs, Cats, Birds, etc.)
- Price range selection
- Location-based search
- Text search across names, breeds, and descriptions
- Quick filter tags for popular categories

### Secure Authentication
- Email/password validation
- Persistent login sessions
- User profile management
- Protected routes for sellers

### Shopping Experience
- Add/remove items from cart
- Order summary and totals
- Shipping information collection
- Payment processing workflow
- Order confirmation system

### Responsive Design
- Mobile-optimized navigation
- Flexible grid layouts
- Touch-friendly interactions
- Progressive enhancement

## 🚧 Future Enhancements

- **Real Payment Processing**: Full Razorpay integration
- **Image Upload**: Direct image upload instead of URLs
- **Advanced Search**: Location-based search with maps
- **User Profiles**: Enhanced seller profiles with ratings
- **Chat System**: In-app messaging between buyers and sellers
- **Email Notifications**: Order confirmations and updates
- **Admin Panel**: Content moderation and user management

---

**Made with ❤️ for pet lovers everywhere**
