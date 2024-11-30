
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { CheckCircle, Loader2, ArrowLeft, Package } from 'lucide-react';
// import axios from 'axios';

// interface OrderDetails {
//   orderId: string;
//   name: string;
//   orderItems: Array<{
//     name: string;
//     quantity: number;
//     price: number;
//     size: string;
//     image: string;
//   }>;
//   totalAmount: number;
//   orderStatus: string;
//   paymentStatus: string;
// }

// export default function OrderConfirmation() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Extract orderId from location state
//   const { orderId } = location.state || {};

//   useEffect(() => {
//     // Check if orderId exists
//     if (!orderId) {
//       console.warn('No order ID found in location state. Redirecting to shop.');
//       navigate('/shop');
//       return;
//     }

//     const fetchOrderDetails = async () => {
//       try {
//         console.log(`Fetching order details for order ID: ${orderId}`);
//         const response = await axios.get(`/api/customers/${orderId}`);
//         console.log('Order details fetched successfully:', response.data);
//         setOrderDetails(response.data);
//       } catch (err) {
//         setError('Failed to fetch order details');
//         console.error('Error fetching order details:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
//       </div>
//     );
//   }

//   if (error || !orderDetails) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-medium text-red-600 mb-4">
//           Something went wrong
//         </h1>
//         <p className="text-gray-600 mb-6">{error || 'No order details available.'}</p>
//         <button
//           onClick={() => navigate('/shop')}
//           className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Return to Shop
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-36 pb-12">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white p-8 rounded-lg shadow-lg"
//         >
//           <div className="text-center mb-8">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2 }}
//               className="inline-block mb-4"
//             >
//               <CheckCircle className="w-16 h-16 text-green-500" />
//             </motion.div>
//             <h1 className="text-2xl font-medium text-gray-900 mb-2">
//               Order Confirmed!
//             </h1>
//             <p className="text-gray-600">
//               Thank you for your purchase, {orderDetails.name}
//             </p>
//           </div>

//           <div className="border-t border-b border-gray-200 py-4 mb-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600">Order ID:</span>
//               <span className="font-medium">{orderDetails.orderId}</span>
//             </div>
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600">Order Status:</span>
//               <span className="inline-flex items-center gap-2">
//                 <Package className="w-4 h-4 text-blue-500" />
//                 <span className="font-medium capitalize">
//                   {orderDetails.orderStatus}
//                 </span>
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600">Payment Status:</span>
//               <span className="font-medium capitalize text-green-600">
//                 {orderDetails.paymentStatus}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-4 mb-6">
//             <h2 className="text-lg font-medium">Order Summary</h2>
//             {orderDetails.orderItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between py-2 border-b last:border-0"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-md"
//                   />
//                   <div>
//                     <h3 className="font-medium">{item.name}</h3>
//                     <p className="text-sm text-gray-600">
//                       Size: {item.size} | Qty: {item.quantity}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="font-medium">
//                   ₹{(item.price * item.quantity).toFixed(2)}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="border-t pt-4">
//             <div className="flex justify-between items-center">
//               <span className="text-lg font-medium">Total Amount</span>
//               <span className="text-lg font-medium">
//                 ₹{orderDetails.totalAmount.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           <div className="mt-8 text-center">
//             <button
//               onClick={() => navigate('/shop')}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Continue Shopping
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, ArrowLeft, Package } from 'lucide-react';
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
  name: string;
  orderItems: OrderItem[];
  totalAmount: number;
  orderStatus?: string; // Made optional for robustness
  paymentStatus?: string; // Made optional for robustness
}

export default function OrderConfirmation() {
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract orderId from location state
  const { orderId } = location.state || {};

  useEffect(() => {
    // Redirect to shop if no orderId is found
    if (!orderId) {
      console.warn('No order ID found in location state. Redirecting to shop.');
      navigate('/shop');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        console.log(`Fetching order details for order ID: ${orderId}`);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/customers/${orderId}`);
        console.log('Order details fetched successfully:', response.data);
        setOrderDetails(response.data);
      } catch (err) {
        setError(
          `Failed to fetch order details for Order ID: ${orderId}. Please try again.`
        );
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-medium text-red-600 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">{error || 'No order details available.'}</p>
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase, {orderDetails.name}
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Order Status:</span>
              <span className="inline-flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                <span className="font-medium capitalize">
                  {orderDetails.orderStatus || 'Unknown'}
                </span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-medium capitalize text-green-600">
                {orderDetails.paymentStatus || 'Unknown'}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-medium">Order Summary</h2>
            {orderDetails.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Amount</span>
              <span className="text-lg font-medium">
                ₹{orderDetails.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
