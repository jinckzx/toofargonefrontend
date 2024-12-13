
// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { useCart } from '../context/CartContext';
// // import { ArrowLeft } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // interface FormData {
// //   name: string;
// //   email: string;
// //   phone: string;
// //   address: string;
// //   city: string;
// //   state: string;
// //   pincode: string;
// // }

// // declare global {
// //   interface Window {
// //     Razorpay: any;
// //   }
// // }

// // export default function Checkout() {
// //   const navigate = useNavigate();
// //   const { cartItems, clearCart } = useCart();
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [formData, setFormData] = useState<FormData>({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     address: '',
// //     city: '',
// //     state: '',
// //     pincode: '',
// //   });

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
    
// //     const script = document.createElement('script');
// //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //     script.async = true;
// //     document.body.appendChild(script);

// //     return () => {
// //       document.body.removeChild(script);
// //     };
// //   }, []);

// //   const total = cartItems.reduce(
// //     (sum, item) => sum + item.price * item.quantity,
// //     0
// //   );

// //   const handlePayment = async (orderData: any) => {
// //     const options = {
// //       key: orderData.keyId,
// //       amount: orderData.amount,
// //       currency: orderData.currency,
// //       name: "Too Far Gone",
// //       description: "Payment for your order",
// //       order_id: orderData.razorpayOrderId,
// //       handler: async (response: any) => {
// //         try {
// //           const verificationResponse = await axios.post('http://localhost:5000/api/checkout/verify-payment', {
// //             razorpay_order_id: response.razorpay_order_id,
// //             razorpay_payment_id: response.razorpay_payment_id,
// //             razorpay_signature: response.razorpay_signature
// //           });

// //           if (verificationResponse.data.success) {
// //             clearCart();
// //             navigate('/order-confirmation', { 
// //               state: { 
// //                 orderId: orderData.orderId,
// //                 amount: total 
// //               }
// //             });
// //           }
// //         } catch (error) {
// //           console.error('Payment verification failed:', error);
// //           alert('Payment verification failed. Please contact support.');
// //         }
// //       },
// //       prefill: {
// //         name: formData.name,
// //         email: formData.email,
// //         contact: formData.phone
// //       },
// //       theme: {
// //         color: "#000000"
// //       }
// //     };

// //     const razorpayInstance = new window.Razorpay(options);
// //     razorpayInstance.open();
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (isSubmitting) return;

// //     setIsSubmitting(true);
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/checkout/create-order', {
// //         formData,
// //         cartItems,
// //         totalAmount: total
// //       });

// //       // Proceed with Razorpay payment
// //       await handlePayment(response.data);
// //     } catch (error) {
// //       console.error('Order creation failed:', error);
// //       alert('Failed to create order. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// // };


// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   return (
// //     <div className="pt-36 min-h-screen">
// //       <motion.button
// //         onClick={() => navigate('/shop')}
// //         className="fixed top-36 left-8 z-50 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hidden lg:flex"
// //         whileHover={{ scale: 1.05 }}
// //         whileTap={{ scale: 0.95 }}
// //         initial={{ opacity: 0, x: -20 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: 0.2 }}
// //         aria-label="Back to Shop"
// //       >
// //         <ArrowLeft className="w-4 h-4" />
// //         Back to Shop
// //       </motion.button>

// //       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <h1 className="text-2xl font-light mb-8">Checkout</h1>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           <motion.div
// //             initial={{ opacity: 0, x: -20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             className="space-y-6"
// //           >
// //             <h2 className="text-xl font-light">Shipping Information</h2>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               {[
// //                 { label: 'Full Name', name: 'name', type: 'text' },
// //                 { label: 'Email', name: 'email', type: 'email' },
// //                 { label: 'Phone', name: 'phone', type: 'tel' },
// //                 { label: 'Address', name: 'address', type: 'text' },
// //               ].map(field => (
// //                 <div key={field.name}>
// //                   <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
// //                   <input
// //                     type={field.type}
// //                     name={field.name}
// //                     value={formData[field.name as keyof FormData]}
// //                     onChange={handleInputChange}
// //                     className="w-full border p-2 rounded-md"
// //                     required
// //                   />
// //                 </div>
// //               ))}

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm text-gray-600 mb-1">City</label>
// //                   <input
// //                     type="text"
// //                     name="city"
// //                     value={formData.city}
// //                     onChange={handleInputChange}
// //                     className="w-full border p-2 rounded-md"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm text-gray-600 mb-1">State</label>
// //                   <input
// //                     type="text"
// //                     name="state"
// //                     value={formData.state}
// //                     onChange={handleInputChange}
// //                     className="w-full border p-2 rounded-md"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm text-gray-600 mb-1">Pincode</label>
// //                 <input
// //                   type="text"
// //                   name="pincode"
// //                   value={formData.pincode}
// //                   onChange={handleInputChange}
// //                   className="w-full border p-2 rounded-md"
// //                   required
// //                 />
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded-md"
// //                 disabled={isSubmitting}
// //               >
// //                 {isSubmitting ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
// //               </button>
// //             </form>
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, x: 20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             className="bg-gray-50 p-6 rounded-lg"
// //           >
// //             <h2 className="text-xl font-light mb-4">Order Summary</h2>
// //             <div className="space-y-4">
// //               {cartItems.map(item => (
// //                 <div key={item.id} className="flex items-center justify-between">
// //                   <div className="flex items-center space-x-4">
// //                     <img
// //                       src={item.image}
// //                       alt={item.name}
// //                       className="w-12 h-12 object-cover rounded-md"
// //                     />
// //                     <div>
// //                       <span className="block font-medium">{item.name}</span>
// //                       {item.size && (
// //                         <span className="text-gray-500 text-sm">
// //                           Size: {item.size}
// //                         </span>
// //                       )}
// //                       <span className="block">
// //                         Quantity: {item.quantity}
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <span>₹{(item.price * item.quantity).toFixed(2)}</span>
// //                 </div>
// //               ))}

// //               <div className="border-t pt-4 mt-4">
// //                 <div className="flex justify-between font-medium">
// //                   <span>Total</span>
// //                   <span>₹{total.toFixed(2)}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// const sanitizeInput = (input: string) => {
//   return input.replace(/<[^>]*>/g, ''); // Strips any HTML tags
// };

// const validateEmail = (email: string) => {
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   return emailRegex.test(email);
// };

// const validatePhone = (phone: string) => {
//   const phoneRegex = /^[0-9]{10}$/;
//   return phoneRegex.test(phone);
// };

// const validatePincode = (pincode: string) => {
//   const pincodeRegex = /^[0-9]{6}$/;
//   return pincodeRegex.test(pincode);
// };

// export default function Checkout() {
//   const navigate = useNavigate();
//   const { cartItems, clearCart } = useCart();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handlePayment = async (orderData: any) => {
//     const options = {
//       key: orderData.keyId,
//       amount: orderData.amount,
//       currency: orderData.currency,
//       name: "Too Far Gone",
//       description: "Payment for your order",
//       order_id: orderData.razorpayOrderId,
//       handler: async (response: any) => {
//         try {
//           const verificationResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/checkout/verify-payment`, {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature
//           });

//           if (verificationResponse.data.success) {
//             clearCart();
//             navigate('/order-confirmation', { 
//               state: { 
//                 orderId: orderData.orderId,
//                 amount: total 
//               }
//             });
//           }
//         } catch (error) {
//           console.error('Payment verification failed:', error);
//           alert('Payment verification failed. Please contact support.');
//         }
//       },
//       prefill: {
//         name: formData.name,
//         email: formData.email,
//         contact: formData.phone
//       },
//       theme: {
//         color: "#000000"
//       }
//     };

//     const razorpayInstance = new window.Razorpay(options);
//     razorpayInstance.open();
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     // Sanitize inputs before submission
//     const sanitizedFormData = {
//       name: sanitizeInput(formData.name),
//       email: sanitizeInput(formData.email),
//       phone: sanitizeInput(formData.phone),
//       address: sanitizeInput(formData.address),
//       city: sanitizeInput(formData.city),
//       state: sanitizeInput(formData.state),
//       pincode: sanitizeInput(formData.pincode),
//     };

//     // Validate input fields
//     if (!validateEmail(sanitizedFormData.email)) {
//       alert('Please enter a valid email address.');
//       setIsSubmitting(false);
//       return;
//     }

//     if (!validatePhone(sanitizedFormData.phone)) {
//       alert('Please enter a valid phone number.');
//       setIsSubmitting(false);
//       return;
//     }

//     if (!validatePincode(sanitizedFormData.pincode)) {
//       alert('Please enter a valid pincode.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/checkout/create-order`, {
//         formData: sanitizedFormData,
//         cartItems,
//         totalAmount: total
//       });

//       // Proceed with Razorpay payment
//       await handlePayment(response.data);
//     } catch (error) {
//       console.error('Order creation failed:', error);
//       alert('Failed to create order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="pt-36 min-h-screen">
//       <motion.button
//         onClick={() => navigate('/shop')}
//         className="fixed top-36 left-8 z-50 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hidden lg:flex"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//         aria-label="Back to Shop"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back to Shop
//       </motion.button>

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl font-light mb-8">Checkout</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-6"
//           >
//             <h2 className="text-xl font-light">Shipping Information</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {[ 
//                 { label: 'Full Name', name: 'name', type: 'text' }, 
//                 { label: 'Email', name: 'email', type: 'email' }, 
//                 { label: 'Phone', name: 'phone', type: 'tel' }, 
//                 { label: 'Address', name: 'address', type: 'text' },
//               ].map(field => (
//                 <div key={field.name}>
//                   <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name as keyof FormData]}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded-md"
//                     required
//                   />
//                 </div>
//               ))}

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Pincode</label>
//                 <input
//                   type="text"
//                   name="pincode"
//                   value={formData.pincode}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded-md"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded-md"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
//               </button>
//             </form>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="bg-gray-50 p-6 rounded-lg"
//           >
//             <h2 className="text-xl font-light mb-4">Order Summary</h2>
//             <div className="space-y-4">
//               {cartItems.map(item => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded-md"
//                     />
//                     <div>
//                       <span className="block font-medium">{item.name}</span>
//                       {item.size && (
//                         <span className="text-gray-500 text-sm">
//                           Size: {item.size}
//                         </span>
//                       )}
//                       <span className="block">
//                         Quantity: {item.quantity}
//                       </span>
//                     </div>
//                   </div>
//                   <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//                 </div>
//               ))}

//               <div className="border-t pt-4 mt-4">
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>₹{total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// const sanitizeInput = (input: string) => input.replace(/<[^>]*>/g, ''); // Strips any HTML tags
// const validateEmail = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
// const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
// const validatePincode = (pincode: string) => /^[0-9]{6}$/.test(pincode);

// export default function Checkout() {
//   const navigate = useNavigate();
//   const { cartItems, clearCart } = useCart();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({}); // Holds validation error messages

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when user types
//   };

//   const validateFields = () => {
//     const newErrors: Partial<FormData> = {};

//     if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address.';
//     }
//     if (!validatePhone(formData.phone)) {
//       newErrors.phone = 'Please enter a valid phone number.';
//     }
//     if (!validatePincode(formData.pincode)) {
//       newErrors.pincode = 'Please enter a valid pincode.';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     // Validate inputs
//     const newErrors = validateFields();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setIsSubmitting(false);
//       return;
//     }

//     // Prepare sanitized data
//     const sanitizedFormData = {
//       name: sanitizeInput(formData.name),
//       email: sanitizeInput(formData.email),
//       phone: sanitizeInput(formData.phone),
//       address: sanitizeInput(formData.address),
//       city: sanitizeInput(formData.city),
//       state: sanitizeInput(formData.state),
//       pincode: sanitizeInput(formData.pincode),
//     };

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/checkout/create-order`, {
//         formData: sanitizedFormData,
//         cartItems,
//         totalAmount: total,
//       });

//       // Proceed with Razorpay payment
//       await handlePayment(response.data);
//     } catch (error) {
//       console.error('Order creation failed:', error);
//       alert('Failed to create order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePayment = async (orderData: any) => {
//     const options = {
//       key: orderData.keyId,
//       amount: orderData.amount,
//       currency: orderData.currency,
//       name: 'Too Far Gone',
//       description: 'Payment for your order',
//       order_id: orderData.razorpayOrderId,
//       handler: async (response: any) => {
//         try {
//           const verificationResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/checkout/verify-payment`, {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           if (verificationResponse.data.success) {
//             clearCart();
//             navigate('/order-confirmation', {
//               state: {
//                 orderId: orderData.orderId,
//                 amount: total,
//               },
//             });
//           }
//         } catch (error) {
//           console.error('Payment verification failed:', error);
//           alert('Payment verification failed. Please contact support.');
//         }
//       },
//       prefill: {
//         name: formData.name,
//         email: formData.email,
//         contact: formData.phone,
//       },
//       theme: {
//         color: '#000000',
//       },
//     };

//     const razorpayInstance = new window.Razorpay(options);
//     razorpayInstance.open();
//   };

//   return (
//     <div className="pt-36 min-h-screen">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl font-light mb-8">Checkout</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { label: 'Full Name', name: 'name', type: 'text' },
//             { label: 'Email', name: 'email', type: 'email' },
//             { label: 'Phone', name: 'phone', type: 'tel' },
//             { label: 'Address', name: 'address', type: 'text' },
//             { label: 'City', name: 'city', type: 'text' },
//             { label: 'State', name: 'state', type: 'text' },
//             { label: 'Pincode', name: 'pincode', type: 'text' },
//           ].map((field) => (
//             <div key={field.name}>
//               <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
//               <input
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name as keyof FormData]}
//                 onChange={handleInputChange}
//                 className="w-full border p-2 rounded-md"
//                 required
//               />
//               {errors[field.name as keyof FormData] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof FormData]}</p>
//               )}
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded-md"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
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

declare global {
  interface Window {
    Razorpay: any;
  }
}

const sanitizeInput = (input: string) => input.replace(/<[^>]*>/g, ''); // Strips any HTML tags
const validateEmail = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
const validatePincode = (pincode: string) => /^[0-9]{6}$/.test(pincode);

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({}); // Holds validation error messages

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
{/* Back to Shop Button - Fixed Position */}
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
          {/* Shipping Information Form */}
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

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <h2 className="text-xl font-light mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <span className="block font-medium">{item.name}</span>
                      {item.size && (
                        <span className="text-gray-500 text-sm">Size: {item.size}</span>
                      )}
                      <span className="block">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

