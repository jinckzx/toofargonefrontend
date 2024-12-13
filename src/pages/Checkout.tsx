import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Types
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

// Utility Functions
const sanitizeInput = (input: string) => input.replace(/<[^>]*>/g, '');
const validateEmail = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
const validatePincode = (pincode: string) => /^[0-9]{6}$/.test(pincode);

const calculateDistance = (state: string): number => {
const distances: { [key: string]: number } = {
    'Andhra Pradesh': 1200,           // Approximate distance from Thane to Andhra Pradesh
    'Arunachal Pradesh': 3000,        // Approximate distance from Thane to Arunachal Pradesh
    'Assam': 2500,                    // Approximate distance from Thane to Assam
    'Bihar': 1800,                    // Approximate distance from Thane to Bihar
    'Chhattisgarh': 700,              // Approximate distance from Thane to Chhattisgarh
    'Goa': 250,                       // Approximate distance from Thane to Goa
    'Gujarat': 400,                   // Approximate distance from Thane to Gujarat
    'Haryana': 1500,                  // Approximate distance from Thane to Haryana
    'Himachal Pradesh': 1900,         // Approximate distance from Thane to Himachal Pradesh
    'Jharkhand': 1600,                // Approximate distance from Thane to Jharkhand
    'Karnataka': 850,                 // Approximate distance from Thane to Karnataka
    'Kerala': 1300,                   // Approximate distance from Thane to Kerala
    'Madhya Pradesh': 800,            // Approximate distance from Thane to Madhya Pradesh
    'Maharashtra': 0,                 // Thane is in Maharashtra
    'Manipur': 2700,                  // Approximate distance from Thane to Manipur
    'Meghalaya': 2600,                // Approximate distance from Thane to Meghalaya
    'Mizoram': 2800,                  // Approximate distance from Thane to Mizoram
    'Nagaland': 2700,                 // Approximate distance from Thane to Nagaland
    'Odisha': 1500,                   // Approximate distance from Thane to Odisha
    'Punjab': 1700,                   // Approximate distance from Thane to Punjab
    'Rajasthan': 1200,                // Approximate distance from Thane to Rajasthan
    'Sikkim': 2700,                   // Approximate distance from Thane to Sikkim
    'Tamil Nadu': 1300,               // Approximate distance from Thane to Tamil Nadu
    'Telangana': 1200,                // Approximate distance from Thane to Telangana
    'Tripura': 2500,                  // Approximate distance from Thane to Tripura
    'Uttar Pradesh': 1400,            // Approximate distance from Thane to Uttar Pradesh
    'Uttarakhand': 1600,              // Approximate distance from Thane to Uttarakhand
    'West Bengal': 2200,              // Approximate distance from Thane to West Bengal
    'Andaman and Nicobar Islands': 2300, // Approximate distance from Thane to Andaman and Nicobar Islands
    'Chandigarh': 1600,               // Approximate distance from Thane to Chandigarh
    'Dadra and Nagar Haveli and Daman and Diu': 200, // Approximate distance from Thane to Dadra and Nagar Haveli and Daman and Diu
    'Lakshadweep': 2200,              // Approximate distance from Thane to Lakshadweep
    'Delhi': 1500,                    // Approximate distance from Thane to Delhi
    'Puducherry': 1400,               // Approximate distance from Thane to Puducherry
    'Ladakh': 2800,                   // Approximate distance from Thane to Ladakh
    'Jammu & Kashmir': 2200,          // Approximate distance from Thane to Jammu & Kashmir
};

    return distances[state] || 750;
};

const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep',
    'Delhi',
    'Puducherry',
    'Ladakh',
    'Jammu & Kashmir',
];

export default function Checkout() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState('');
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
    
    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Calculate shipping cost when state changes
    useEffect(() => {
        if (formData.state) {
            const distance = calculateDistance(formData.state);
            const shippingCost = subtotal >= 2500 ? 0 : 90 + (distance / 85);
            setShippingInfo({ distance, cost: shippingCost });
        }
    }, [formData.state, subtotal]);
    
    const calculateTotal = () => {
        let total = subtotal + shippingInfo.cost;
        if (couponApplied && subtotal >= 5000) {
            total *= 0.9; // Apply 10% discount
        }
        return total;
    };

   // State filtering for dropdown
   const [filteredStates, setFilteredStates] = useState(states);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
       setFormData((prev) => ({ ...prev, [name]: value }));
       setErrors((prev) => ({ ...prev, [name]: '' }));
       
       if (name === "state") {
           setFilteredStates(states.filter(state => state.toLowerCase().includes(value.toLowerCase())));
           setIsDropdownOpen(true);
       }
   };

   const handleSelectState = (state: string) => {
       setFormData((prev) => ({ ...prev, state }));
       setIsDropdownOpen(false);
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

   const handleCouponSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       
        setCouponError('');
        
        if (couponCode.toLowerCase() === 'santa666' && subtotal >= 5000) {
            setCouponApplied(true);
            setCouponError('Coupon applied successfully!');
        } else {
            if (subtotal < 5000) {
                setCouponError('Minimum order value of ₹5000 not met');
            } else {
                setCouponError('Invalid coupon code');
            }
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
                   const verificationResponse = await axios.post(
                       `${import.meta.env.VITE_API_BASE_URL}/checkout/verify-payment`,
                       {
                           razorpay_order_id: response.razorpay_order_id,
                           razorpay_payment_id: response.razorpay_payment_id,
                           razorpay_signature: response.razorpay_signature,
                       }
                   );
                   if (verificationResponse.data.success) {
                       clearCart();
                       navigate('/order-confirmation', { state: { orderId: orderData.orderId, amount: calculateTotal(), } });
                   }
               } catch (error) {
                   console.error('Payment verification failed:', error);
                   alert('Payment verification failed. Please contact support.');
               }
           },
           prefill: { name: formData.name, email: formData.email, contact: formData.phone },
           theme: { color: '#000000' },
       };

       const razorpayInstance = new window.Razorpay(options);
       razorpayInstance.open();
   };

   const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       if (isSubmitting) return;

       setIsSubmitting(true);
       const newErrors = validateFields();
       if (Object.keys(newErrors).length > 0) {
           setErrors(newErrors);
           setIsSubmitting(false);
           return;
       }

       try {
           const sanitizedFormData = Object.entries(formData).reduce(
               (acc, [key, value]) => ({ ...acc, [key]: sanitizeInput(value), }),
               {} as FormData
           );
           
           const response = await axios.post(
               `${import.meta.env.VITE_API_BASE_URL}/checkout/create-order`,
               { formData: sanitizedFormData, cartItems, totalAmount: calculateTotal(), }
           );
           
           await handlePayment(response.data); 
           
       } catch (error) {
           console.error('Order creation failed:', error);
           alert('Failed to create order. Please try again.');
       } finally {
           setIsSubmitting(false);
       }
   };

   const formFields = [
       { label: 'Full Name', name: 'name', type: 'text' },
       { label: 'Email', name: 'email', type: 'email' },
       { label: 'Phone', name: 'phone', type: 'tel' },
       { label: 'Address', name: 'address', type: 'text' },
       { label: 'City', name: 'city', type: 'text' },
       { label: 'State', name: 'state', type: 'text' },
       { label: 'Pincode', name: 'pincode', type: 'text' },
   ];

   return (
       <div className="pt-36 min-h-screen">
           {/* Back Button */}
           <motion.button onClick={() => navigate('/cart')} className="fixed top-36 left-8 z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hidden lg:flex">
               <ArrowLeft className="w-4 h-4" /> Back to Cart
           </motion.button>

           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
               <h1 className="text-2xl font-light mb-8">Checkout</h1>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Shipping Form */}
                   <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                       <h2 className="text-xl font-light">Shipping Information</h2>
                       <form onSubmit={handleSubmit} className="space-y-4">
                           {formFields.map((field) => (
                               <div key={field.name}>
                                   <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
                                   {field.name === "state" ? (
                                       <>
                                           <input
                                               type={field.type}
                                               name={field.name}
                                               value={formData[field.name as keyof FormData]}
                                               onChange={handleInputChange}
                                               onFocus={() => setIsDropdownOpen(true)}
                                               className="w-full border p-2 rounded-md"
                                               required
                                           />
                                           {isDropdownOpen && filteredStates.length > 0 && (
                                               <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full">
                                                   {filteredStates.map((state) => (
                                                       <li
                                                           key={state}
                                                           onClick={() => handleSelectState(state)}
                                                           className="p-2 cursor-pointer hover:bg-gray-200"
                                                       >
                                                           {state}
                                                       </li>
                                                   ))}
                                               </ul>
                                           )}
                                       </>
                                   ) : (
                                       <input
                                           type={field.type}
                                           name={field.name}
                                           value={formData[field.name as keyof FormData]}
                                           onChange={handleInputChange}
                                           className="w-full border p-2 rounded-md"
                                           required
                                       />
                                   )}
                                   {errors[field.name as keyof FormData] && (
                                       <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof FormData]}</p>
                                   )}
                               </div>
                           ))}

                       </form>
                   </motion.div>

                   {/* Order Summary */}
                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-50 p-6 rounded-lg">
                       <h2 className="text-xl font-light mb-4">Order Summary</h2>
                       <div className="space-y-4">
                           {cartItems.map((item) => (
                               <div key={item.id} className="flex items-center justify-between">
                                   <div className="flex items-center space-x-4">
                                       <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                       <div>
                                           <span className="block font-medium">{item.name}</span>
                                           {item.size && (
                                               <span className="text-gray-500 text-sm">Size:{item.size}</span>
                                           )}
                                           <span className="block">Quantity:{item.quantity}</span>
                                       </div>
                                   </div>
                                   <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                               </div>
                           ))}
                           <div className="border-t pt-4">
                               <div className="flex justify-between">
                                   <span>Subtotal</span>
                                   <span>₹{subtotal.toFixed(2)}</span>
                               </div>
                           </div>
                           {formData.state && (
                               <div className="flex justify-between text-xs">
                                   <span>Shipping </span>
                                   <span>{shippingInfo.cost === 0 ? "FREE" : `₹${shippingInfo.cost.toFixed(2)}`}</span>
                               </div>
                           )}
                                           {couponApplied && subtotal >= 5000 && (
                  <div className="flex justify-between text-xs">
                    <span>Discount</span>
                    <span>-₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                  </div>
                )}
                           {/* Total Calculation */}
                           <div className="border-t pt-4 mt-4">
                               <div className="flex justify-between font-medium text-lg">
                                   <span>Total</span>
                                   <span>₹{calculateTotal().toFixed(2)}</span>
                               </div>
                           </div>
                       </div>
                           {/* Coupon Code Section */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-light mb-3">Have a Coupon?</h3>
                        <form onSubmit={handleCouponSubmit} className="flex gap-2">
                            <input 
                                type="text" 
                                value={couponCode} 
                                onChange={(e) => {
                                    setCouponCode(e.target.value);
                                    setCouponError(''); // Clear error when user starts typing
                                }} 
                                placeholder="Enter coupon code" 
                                className="flex-1 border p-2 rounded-md" 
                            />
                            <button 
                                type="submit" 
                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Apply
                            </button>
                        </form>
                        {couponError && (
                            <p className="text-sm text-red-500 mt-2">{couponError}</p>
                        )}
                        {subtotal >= 5000 && !couponError && (
                            <p className="text-sm text-green-600 mt-2">
                                Use code "SANTA666" for 10% off on orders above ₹5000
                            </p>
                        )}
                    </div>

                                       <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Pay ₹${calculateTotal().toFixed(2)}`}
            </button>
                   </motion.div>

               </div>
           </div>
       </div>
   );
}


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Types
// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface ShippingInfo {
//   distance: number;
//   cost: number;
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// // Utility Functions
// const sanitizeInput = (input: string) => input.replace(/<[^>]*>/g, '');
// const validateEmail = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
// const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
// const validatePincode = (pincode: string) => /^[0-9]{6}$/.test(pincode);

// const calculateDistance = (state: string): number => {
//   const distances: { [key: string]: number } = {
//     'Maharashtra': 0,
//     'Gujarat': 500,
//     'Karnataka': 1000,
//     'Tamil Nadu': 1500,
//     'Delhi': 1400,
//   };
//   return distances[state] || 800;
// };

// export default function Checkout() {
//   const navigate = useNavigate();
//   const { cartItems, clearCart } = useCart();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [couponCode, setCouponCode] = useState('');
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({ distance: 0, cost: 0 });
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   // Load Razorpay Script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Calculate shipping cost when state changes
//   useEffect(() => {
//     if (formData.state) {
//       const distance = calculateDistance(formData.state);
//       const shippingCost = subtotal >= 2500 ? 0 : 90 + (distance / 70);
//       setShippingInfo({ distance, cost: shippingCost });
//     }
//   }, [formData.state, subtotal]);

//   const calculateTotal = () => {
//     let total = subtotal + shippingInfo.cost;
//     if (couponApplied && subtotal >= 5000) {
//       total = total * 0.9; // Apply 10% discount
//     }
//     return total;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
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

//   const handleCouponSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (couponCode.toLowerCase() === 'save10' && subtotal >= 5000) {
//       setCouponApplied(true);
//     } else {
//       alert('Invalid coupon code or minimum order value not met (₹5000)');
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
//           const verificationResponse = await axios.post(
//             `${import.meta.env.VITE_API_BASE_URL}/checkout/verify-payment`,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             }
//           );

//           if (verificationResponse.data.success) {
//             clearCart();
//             navigate('/order-confirmation', {
//               state: {
//                 orderId: orderData.orderId,
//                 amount: calculateTotal(),
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     const newErrors = validateFields();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const sanitizedFormData = Object.entries(formData).reduce(
//         (acc, [key, value]) => ({
//           ...acc,
//           [key]: sanitizeInput(value),
//         }),
//         {} as FormData
//       );

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/checkout/create-order`,
//         {
//           formData: sanitizedFormData,
//           cartItems,
//           totalAmount: calculateTotal(),
//         }
//       );

//       await handlePayment(response.data);
//     } catch (error) {
//       console.error('Order creation failed:', error);
//       alert('Failed to create order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formFields = [
//     { label: 'Full Name', name: 'name', type: 'text' },
//     { label: 'Email', name: 'email', type: 'email' },
//     { label: 'Phone', name: 'phone', type: 'tel' },
//     { label: 'Address', name: 'address', type: 'text' },
//     { label: 'City', name: 'city', type: 'text' },
//     { label: 'State', name: 'state', type: 'text' },
//     { label: 'Pincode', name: 'pincode', type: 'text' },
//   ];

//   return (
//     <div className="pt-36 min-h-screen">
//       {/* Back Button */}
//       <motion.button
//         onClick={() => navigate('/cart')}
//         className="fixed top-36 left-8 z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 hidden lg:flex"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back to Cart
//       </motion.button>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl font-light mb-8">Checkout</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Shipping Form */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-6"
//           >
//             <h2 className="text-xl font-light">Shipping Information</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {formFields.map((field) => (
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
//                   {errors[field.name as keyof FormData] && (
//                     <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof FormData]}</p>
//                   )}
//                 </div>
//               ))}
//             </form>
//           </motion.div>

//           {/* Order Summary and Coupon */}
//           <div className="space-y-6">
//             {/* Order Summary */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gray-50 p-6 rounded-lg"
//             >
//               <h2 className="text-xl font-light mb-4">Order Summary</h2>
//               <div className="space-y-4">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12 object-cover rounded-md"
//                       />
//                       <div>
//                         <span className="block font-medium">{item.name}</span>
//                         {item.size && (
//                           <span className="text-gray-500 text-sm">Size: {item.size}</span>
//                         )}
//                         <span className="block">Quantity: {item.quantity}</span>
//                       </div>
//                     </div>
//                     <span>₹{(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}

//                 <div className="border-t pt-4">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {formData.state && (
//                   <div className="flex justify-between text-sm">
//                     <span>Shipping ({shippingInfo.distance}km from Thane)</span>
//                     <span>{shippingInfo.cost === 0 ? 'FREE' : `₹${shippingInfo.cost.toFixed(2)}`}</span>
//                   </div>
//                 )}

                // {couponApplied && subtotal >= 5000 && (
                //   <div className="flex justify-between text-green-600">
                //     <span>Discount (10%)</span>
                //     <span>-₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                //   </div>
                // )}

//                 <div className="border-t pt-4 mt-4">
//                   <div className="flex justify-between font-medium text-lg">
//                     <span>Total</span>
//                     <span>₹{calculateTotal().toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Coupon Code Section */}
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h3 className="text-lg font-light mb-3">Have a Coupon?</h3>
//               <form onSubmit={handleCouponSubmit} className="flex gap-2">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter coupon code"
//                   className="flex-1 border p-2 rounded-md"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//                 >
//                   Apply
//                 </button>
//               </form>
//               {subtotal >= 5000 && (
//                 <p className="text-sm text-green-600 mt-2">
//                   Use code 'SAVE10' for 10% off on orders above ₹5000
//                 </p>
//               )}
//             </div>

//             {/* Payment Button */}
            // <button
            //   onClick={handleSubmit}
            //   className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded-md"
            //   disabled={isSubmitting}
            // >
            //   {isSubmitting ? 'Processing...' : `Pay ₹${calculateTotal().toFixed(2)}`}
            // </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

