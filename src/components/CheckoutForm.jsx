import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, CreditCard, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import useAuthStore from '../stores/authStore';

const CheckoutForm = ({ isOpen, onClose, onBack }) => {
  const [step, setStep] = useState(1); // 1: Order Details, 2: Payment, 3: Success
  const [orderDetails, setOrderDetails] = useState({
    customer: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    shipping: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      specialInstructions: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [orderResult, setOrderResult] = useState(null);

  const { 
    cart, 
    getCartTotal, 
    createOrder, 
    processPayment, 
    currentOrder, 
    isLoading, 
    paymentLoading, 
    error 
  } = useCartStore();
  
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      setOrderDetails(prev => ({
        ...prev,
        customer: {
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || ''
        }
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const validateOrderDetails = () => {
    const newErrors = {};

    if (!orderDetails.customer.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!orderDetails.customer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(orderDetails.customer.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!orderDetails.customer.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!orderDetails.shipping.address.trim()) {
      newErrors.shippingAddress = 'Shipping address is required';
    }

    if (!orderDetails.shipping.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!orderDetails.shipping.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!orderDetails.shipping.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section, field, value) => {
    setOrderDetails(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCreateOrder = async () => {
    if (!validateOrderDetails()) return;

    const orderData = {
      ...orderDetails,
      customer: {
        ...orderDetails.customer,
        userId: user?.id
      }
    };

    const result = await createOrder(orderData);
    if (result.success) {
      setStep(2);
    }
  };

  const handlePayment = async () => {
    if (!currentOrder) return;

    // Mock Razorpay payment integration
    const paymentData = {
      razorpay_payment_id: `pay_${Date.now()}`,
      razorpay_order_id: currentOrder.id,
      razorpay_signature: `sig_${Date.now()}`
    };

    const result = await processPayment(paymentData);
    setOrderResult(result);
    setStep(3);
  };

  const renderStep1 = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={orderDetails.customer.name}
              onChange={(e) => handleInputChange('customer', 'name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={orderDetails.customer.email}
              onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={orderDetails.customer.phone}
              onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Shipping Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={orderDetails.shipping.address}
              onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.shippingAddress ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Street address"
            />
            {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={orderDetails.shipping.city}
                onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={orderDetails.shipping.state}
                onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.state ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="State"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
            <input
              type="text"
              value={orderDetails.shipping.zipCode}
              onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.zipCode ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="ZIP Code"
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
            <textarea
              value={orderDetails.shipping.specialInstructions}
              onChange={(e) => handleInputChange('shipping', 'specialInstructions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="3"
              placeholder="Any special delivery instructions..."
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h3>
        <div className="space-y-2">
          {cart.map(pet => (
            <div key={pet.id} className="flex justify-between">
              <span className="text-gray-600">{pet.name}</span>
              <span className="font-medium">${pet.price}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-3 pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-primary-600">${getCartTotal()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCreateOrder}
        disabled={isLoading}
        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Creating Order...
          </>
        ) : (
          'Continue to Payment'
        )}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
        <CreditCard className="h-6 w-6 mr-2 text-primary-600" />
        Payment
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Order #{currentOrder?.id}</h3>
        <div className="space-y-2">
          {currentOrder?.items.map(pet => (
            <div key={pet.id} className="flex justify-between">
              <span className="text-gray-600">{pet.name}</span>
              <span className="font-medium">${pet.price}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-3 pt-3">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total Amount:</span>
            <span className="text-primary-600">${currentOrder?.total}</span>
          </div>
        </div>
      </div>

      {/* Mock Payment Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
        
        <div className="space-y-4">
          <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-primary-50">
            <CreditCard className="h-6 w-6 text-primary-600 mr-3" />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Razorpay Secure Payment</p>
              <p className="text-sm text-gray-600">Pay with cards, UPI, net banking & more</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setStep(1)}
          className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Back to Details
        </button>
        <button
          onClick={handlePayment}
          disabled={paymentLoading}
          className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {paymentLoading ? (
            <>
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Processing...
            </>
          ) : (
            `Pay $${currentOrder?.total}`
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="p-6 text-center space-y-6">
      {orderResult?.success ? (
        <>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-green-800">Payment Successful!</h2>
          <p className="text-gray-600">
            Your order #{orderResult.order?.id} has been confirmed and payment processed successfully.
          </p>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-green-800 font-medium">What's next?</p>
            <p className="text-green-600 text-sm mt-1">
              The sellers will contact you directly to arrange pet pickup/delivery.
            </p>
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-red-800">Payment Failed</h2>
          <p className="text-gray-600">
            {orderResult?.error || 'Something went wrong with your payment. Please try again.'}
          </p>
        </>
      )}

      <button
        onClick={onClose}
        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700"
      >
        {orderResult?.success ? 'Continue Shopping' : 'Try Again'}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Progress Indicator */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`h-px w-12 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`h-px w-12 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default CheckoutForm;
