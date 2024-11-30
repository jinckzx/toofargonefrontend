import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Cart() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page scrolls to the top when loaded
  }, []);

  const { cartItems, updateQuantity, removeFromCart, getTotalItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = getTotalItems();

  if (cartItems.length === 0) {
    return (
      <div className="pt-5 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Your cart is empty</h2>
          <Link to="/shop" className="text-gray-500 hover:text-black">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 min-h-screen">
      {/* Back to Shop Button - Fixed Position */}
      <motion.button
        onClick={() => navigate('/shop')}
        className="fixed top-36 left-8 z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hidden lg:flex"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </motion.button>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-light">Shopping Cart</h1>
          <span className="text-gray-500">({totalItems} items)</span>
        </div>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <motion.div
              key={`${item.id}-${item.size}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 p-4 bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500">₹{item.price}</p>
                {item.size && <p className="text-gray-500 text-sm">Size: {item.size}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.size, Math.max(0, item.quantity - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-medium">₹{total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="block w-full bg-black text-white text-center py-3 hover:bg-gray-800 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
