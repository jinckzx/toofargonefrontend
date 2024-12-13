import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}
interface ShippingInfo {
  distance: number;
  cost: number;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}

const sanitizeInput = (input: string) => input.replace(/<[^>]*>/g, ''); // Strips any HTML tags
const validateEmail = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
const validatePincode = (pincode: string) => /^[0-9]{6}$/.test(pincode);
const calculateDistance = (state: string): number => {
  const distances: { [key: string]: number } = {
    'Maharashtra': 0,
    'Gujarat': 500,
    'Karnataka': 1000,
    'Tamil Nadu': 1500,
    'Delhi': 1400,
    // Add more states and approximate distances from Thane, Mumbai
  };
  return distances[state] || 800; // Default distance if state not found
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(''); // Track invalid coupon message
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({ distance: 0, cost: 0 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (formData.state) {
      const distance = calculateDistance(formData.state);
      const shippingCost = subtotal >= 2500 ? 0 : 90 + (distance / 70);
      setShippingInfo({ distance, cost: shippingCost });
    }
  }, [formData.state, subtotal]);

  const calculateTotal = () => {
    let total = subtotal + shippingInfo.cost;
    if (couponApplied && subtotal >= 5000) {
      total = total * 0.9; // Apply 10% discount
    }
    return total;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toLowerCase() === 'save10' && subtotal >= 5000) {
      setCouponApplied(true);
      setCouponError(''); // Clear error if coupon is valid
    } else {
      setCouponApplied(false);
      setCouponError('Invalid coupon code or minimum order value not met (₹5000)'); // Set error message
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when user types
  };

  const validateFields = () => {
    const newErrors: Partial<FormData> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!validatePincode(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid pincode.';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Validate inputs
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Prepare sanitized data
    const sanitizedFormData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      address: sanitizeInput(formData.address),
      city: sanitizeInput(formData.city),
      state: sanitizeInput(formData.state),
      pincode: sanitizeInput(formData.pincode),
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/checkout/create-order`, {
        formData: sanitizedFormData,
        cartItems,
        totalAmount: total,
      });

      // Proceed with Razorpay payment
      await handlePayment(response.data);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async (orderData: any) => {
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Too Far Gone',
      description: 'Payment for your order',
      order_id: orderData.razorpayOrderId,
      handler: async (response: any) => {
        try {
          const verificationResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/checkout/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verificationResponse.data.success) {
            clearCart();
            navigate('/order-confirmation', {
              state: {
                orderId: orderData.orderId,
                amount: total,
              },
            });
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          alert('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: '#000000',
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="pt-36 min-h-screen">
      <motion.button
        onClick={() => navigate('/cart')}
        className="fixed top-36 left-8 z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hidden lg:flex"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </motion.button>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-light mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Shipping Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-light">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[ 
                { label: 'Full Name', name: 'name', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone', name: 'phone', type: 'tel' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'City', name: 'city', type: 'text' },
                { label: 'State', name: 'state', type: 'text' },
                { label: 'Pincode', name: 'pincode', type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                    required
                  />
                  {errors[field.name as keyof FormData] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof FormData]}</p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
              </button>
            </form>
          </motion.div>

          {/* Right side - Order Summary and Coupon */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-light mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <span className="text-sm text-gray-800">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.size}</span>
                    </div>
                    <span className="text-sm text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between text-sm text-gray-800">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-800">
                  <span>Shipping Cost</span>
                  <span>₹{shippingInfo.cost.toFixed(2)}</span>
                </div>
                {couponApplied && subtotal >= 5000 && (
                  <div className="flex justify-between text-sm text-gray-800">
                    <span>Coupon Applied (10% off)</span>
                    <span>-₹{(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <form onSubmit={handleCouponSubmit} className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full border p-2 rounded-md"
                  placeholder="Enter coupon code"
                />
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
