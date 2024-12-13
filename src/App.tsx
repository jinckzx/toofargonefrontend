
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react';
import { X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Lookbook from './pages/Lookbook';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Shipping from './pages/Shipping';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ProductDetail from './pages/ProductDetail';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';
import TrackOrder from './pages/TrackOrder';
import { CartProvider } from './context/CartContext';

interface CartPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
}

export function CartPreview({ isOpen, onClose, cartItems }: CartPreviewProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto flex flex-col"
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Cart</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {cartItems.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">₹{item.price}</p>
              </motion.div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="text-sm font-medium">Total</span>
              <span className="text-sm font-semibold">₹{total.toFixed(2)}</span>
            </div>
            <Link 
              to="/cart"
              className="w-full bg-black text-white py-2 rounded text-center block hover:bg-gray-800 transition-colors"
            >
              Continue to Checkout
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
// }
// export function CartPreview({ isOpen, onClose, cartItems }: CartPreviewProps) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ x: '100%', opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: '100%', opacity: 0 }}
//           transition={{ type: 'spring', damping: 30, stiffness: 300 }}
//           className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
//         >
//           <div className="p-4 border-b">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold">Cart</h2>
//               <button
//                 onClick={onClose}
//                 className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//           <div className="p-4 space-y-4">
//             {cartItems.map((item) => (
//               <motion.div
//                 key={`${item.id}-${item.size}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center space-x-4"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-sm font-medium">{item.name}</h3>
//                   <p className="text-sm text-gray-500">Size: {item.size}</p>
//                   <p className="text-sm">Qty: {item.quantity}</p>
//                 </div>
//                 <p className="text-sm font-medium">₹{item.price}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
          <Navbar />
          <div className="mb-20">
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/lookbook" element={<Lookbook />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/shipping-policy" element={<Shipping />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/trackorder" element={<TrackOrder />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
