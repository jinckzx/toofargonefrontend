
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Search, Loader2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
// import axios from 'axios';

// interface OrderItem {
//   name: string;
//   quantity: number;
//   price: number;
//   size: string;
//   image: string;
// }

// interface OrderDetails {
//   orderId: string;
//   phone: string;
//   name: string;
//   orderItems: OrderItem[];
//   totalAmount: number;
//   orderStatus?: string;
//   paymentStatus?: string;
// }

// export default function TrackOrder() {
//   const navigate = useNavigate();
//   const [orderId, setOrderId] = useState('');
//   const [phone, setphone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
//   const [trackBy, setTrackBy] = useState<'orderId' | 'phone'>('orderId'); // Track by orderId or phone

//   const validateOrderId = (id: string): boolean => {
//     const orderIdRegex = /^[a-zA-Z0-9]{8,24}$/;
//     return orderIdRegex.test(id.trim());
//   };

//   const validatephone = (phone: string): boolean => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone.trim());
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmedOrderId = orderId.trim();
//     const trimmedphone = phone.trim();

//     if (trackBy === 'orderId' && !trimmedOrderId) {
//       setError('Please enter an order ID');
//       return;
//     }

//     if (trackBy === 'phone' && !trimmedphone) {
//       setError('Please enter a phone number');
//       return;
//     }

//     if (trackBy === 'orderId' && !validateOrderId(trimmedOrderId)) {
//       setError('Invalid order ID format. It should be 8-24 alphanumeric characters.');
//       return;
//     }

//     if (trackBy === 'phone' && !validatephone(trimmedphone)) {
//       setError('Invalid phone number format. It should be a 10-digit number.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const endpoint =
//         trackBy === 'orderId'
//           ? `http://localhost:5000/api/customers/${encodeURIComponent(trimmedOrderId)}`
//           : `http://localhost:5000/api/customers/${encodeURIComponent(trimmedphone)}`;
//       const response = await axios.get(endpoint);
//       setOrderDetails(response.data);
//       setError(null);
//     } catch (err) {
//       if (axios.isAxiosError(err) && err.response?.status === 404) {
//         setError('Order not found. Please check your input and try again.');
//       } else if (axios.isAxiosError(err) && err.response?.status === 400) {
//         setError(err.response.data.errors?.[0]?.msg || 'Invalid input format.');
//       } else {
//         setError('An error occurred while fetching the order. Please try again.');
//       }
//       setOrderDetails(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-36 pb-12 relative">
//       <motion.button
//         onClick={() => navigate('/shop')}
//         className="fixed top-36 left-8 z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hidden lg:flex"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back to Shop
//       </motion.button>

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-lg"
//         >
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-medium text-gray-900 mb-4">Track Your Order</h1>
//             <p className="text-gray-600">Enter your order ID or phone number to track your order status</p>
//           </div>

//           <form onSubmit={handleSubmit} className="mb-8">
//             <div className="flex gap-4 mb-4">
//               <button
//                 type="button"
//                 className={`px-6 py-2 rounded-md ${trackBy === 'orderId' ? 'bg-black text-white' : 'bg-gray-300'}`}
//                 onClick={() => setTrackBy('orderId')}
//               >
//                 Track by Order ID
//               </button>
//               <button
//                 type="button"
//                 className={`px-6 py-2 rounded-md ${trackBy === 'phone' ? 'bg-black text-white' : 'bg-gray-300'}`}
//                 onClick={() => setTrackBy('phone')}
//               >
//                 Track by Phone Number
//               </button>
//             </div>

//             <div className="flex gap-4">
//               {trackBy === 'orderId' ? (
//                 <input
//                   type="text"
//                   value={orderId}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
//                     setOrderId(value);
//                   }}
//                   maxLength={24}
//                   placeholder="Enter your Order ID"
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                   aria-label="Order ID"
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setphone(e.target.value)}
//                   maxLength={10}
//                   placeholder="Enter your Phone Number"
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                   aria-label="Phone Number"
//                 />
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {loading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Search className="w-5 h-5" />
//                 )}
//                 Track
//               </button>
//             </div>

//             {error && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="mt-4 text-red-600 flex items-center gap-2"
//               >
//                 <AlertCircle className="w-5 h-5" />
//                 {error}
//               </motion.div>
//             )}
//           </form>

//           {orderDetails && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="border-t pt-6"
//             >
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-medium">Order Details</h2>
//                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     {orderDetails.orderStatus || 'Processing'}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-600">Order ID</p>
//                     <p className="font-medium">{orderDetails.orderId}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Customer Name</p>
//                     <p className="font-medium">{orderDetails.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Payment Status</p>
//                     <p className={`font-medium ${
//                       orderDetails.paymentStatus === 'completed' 
//                         ? 'text-green-600' 
//                         : 'text-yellow-600'
//                     }`}>
//                       {orderDetails.paymentStatus || 'Pending'}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Total Amount</p>
//                     <p className="font-medium">₹{orderDetails.totalAmount.toFixed(2)}</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <h3 className="text-lg font-medium">Order Items</h3>
//                   {orderDetails.orderItems.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-4 border rounded-lg"
//                     >
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded-md"
//                         />
//                         <div>
//                           <h4 className="font-medium">{item.name}</h4>
//                           <p className="text-sm text-gray-600">
//                             Size: {item.size} | Qty: {item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                       <p className="font-medium">
//                         ₹{(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-between items-center pt-4 border-t">
//                   <span className="text-lg font-medium">Total Amount</span>
//                   <span className="text-lg font-medium">
//                     ₹{orderDetails.totalAmount.toFixed(2)}
//                   </span>
//                 </div>

//                 <div className="flex justify-center mt-8">
//                   <a
//                     href="https://www.delhivery.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
//                   >
//                     More Details
//                     <ArrowRight className="w-5 h-5" />
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Loader2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size: string;
  image: string;
}

interface OrderDetails {
  orderId: string;
  phone: string;
  name: string;
  orderItems: OrderItem[];
  totalAmount: number;
  orderStatus?: string;
  paymentStatus?: string;
}

export default function TrackOrder() {
   
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [trackBy, setTrackBy] = useState<'orderId' | 'phone'>('orderId');

  const validateOrderId = (id: string): boolean => {
    const orderIdRegex = /^[a-zA-Z0-9]{8,24}$/;
    return orderIdRegex.test(id.trim());
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedOrderId = orderId.trim();
    const trimmedPhone = phone.trim();

    if (trackBy === 'orderId' && !trimmedOrderId) {
      setError('Please enter an order ID');
      return;
    }

    if (trackBy === 'phone' && !trimmedPhone) {
      setError('Please enter a phone number');
      return;
    }

    if (trackBy === 'orderId' && !validateOrderId(trimmedOrderId)) {
      setError('Invalid order ID format. It should be 8-24 alphanumeric characters.');
      return;
    }

    if (trackBy === 'phone' && !validatePhone(trimmedPhone)) {
      setError('Invalid phone number format. It should be a 10-digit number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint =
        trackBy === 'orderId'
          ? `${import.meta.env.VITE_API_BASE_URL}/customers/${encodeURIComponent(trimmedOrderId)}`
          : `${import.meta.env.VITE_API_BASE_URL}/customers/${encodeURIComponent(trimmedPhone)}`;
      const response = await axios.get(endpoint);

      // Assuming the server already sends the most recent order
      setOrderDetails(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError('Order not found. Please check your input and try again.');
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError(err.response.data.errors?.[0]?.msg || 'Invalid input format.');
      } else {
        setError('An error occurred while fetching the order. Please try again.');
      }
      setOrderDetails(null);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen pt-36 pb-12 relative">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-600">Enter your order ID or phone number to track your order status</p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                className={`px-6 py-2 rounded-md ${trackBy === 'orderId' ? 'bg-black text-white' : 'bg-gray-300'}`}
                onClick={() => setTrackBy('orderId')}
              >
                Track by Order ID
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-md ${trackBy === 'phone' ? 'bg-black text-white' : 'bg-gray-300'}`}
                onClick={() => setTrackBy('phone')}
              >
                Track by Phone Number
              </button>
            </div>

            <div className="flex gap-4">
              {trackBy === 'orderId' ? (
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                  maxLength={24}
                  placeholder="Enter your Order ID"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Order ID"
                />
              ) : (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  placeholder="Enter your Phone Number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Phone Number"
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Track
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-600 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </form>

          {orderDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t pt-6"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium">Order Details</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {orderDetails.orderStatus || 'Processing'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Order ID</p>
                    <p className="font-medium">{orderDetails.orderId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Customer Name</p>
                    <p className="font-medium">{orderDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Status</p>
                    <p className={`font-medium ${
                      orderDetails.paymentStatus === 'completed' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}>
                      {orderDetails.paymentStatus || 'Pending'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="font-medium">₹{orderDetails.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Order Items</h3>
                  {orderDetails.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Size: {item.size} | Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-lg font-medium">Total Amount</span>
                  <span className="text-lg font-medium">
                    ₹{orderDetails.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-center mt-8">
                  <a
                    href="https://www.delhivery.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    More Details
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
