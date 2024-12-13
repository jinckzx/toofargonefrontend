// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { Plus, Minus, X, ArrowLeft } from 'lucide-react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import ProductImageGallery from '../components/ProductImageGallery';
// import { CartPreview } from '../App';

// interface Product {
//   _id: string;
//   productId: string;
//   productTitle: string;
//   images: string[];
//   prodDesc: string;
//   price: number;
//   discountedPrice: number;
//   fit: string;
//   gender: string;
//   material: string;
//   fabricWeight: string;
//   construction: string;
//   origin: string;
//   instock: string;
// }

// export default function ProductDetail() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [showFullScreen, setShowFullScreen] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [sizeError, setSizeError] = useState('');
//   const [zoom, setZoom] = useState({ x: 0, y: 0, scale: 1 });
//   const { addToCart, cartItems } = useCart();
//   const [showCartPreview, setShowCartPreview] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`);
//         if (response.data) {
//           setProduct(response.data);
//           setSelectedImage(response.data.images[0]);
//         } else {
//           setError('Product not found');
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching product:', err);
//         setError('Failed to fetch product details');
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId]);

//   const handleQuantityChange = (delta: number) => {
//     setQuantity(prev => Math.max(1, prev + delta));
//   };

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       setSizeError('Please select a size');
//       return;
//     }

//     if (product) {
//       const cartItem = {
//         id: product.productId,
//         name: product.productTitle,
//         price: product.discountedPrice,
//         quantity: quantity,
//         image: product.images[0],
//         size: selectedSize,
//       };
//       addToCart(cartItem);
//       setQuantity(1);
//       setSizeError('');
//       setShowCartPreview(true);
      
//       // Auto-hide cart preview after 3 seconds
//       setTimeout(() => {
//         setShowCartPreview(false);
//       }, 3000);
//     }
//   };

//   const handleBuyNow = () => {
//     if (!selectedSize) {
//       setSizeError('Please select a size');
//       return;
//     }
//     handleAddToCart();
//     navigate('/checkout');
//   };

//   const handleImageClick = (image: string) => {
//     setSelectedImage(image);
//     setZoom({ x: 0, y: 0, scale: 1 });
//   };

//   const handleFullScreenToggle = () => {
//     setShowFullScreen(!showFullScreen);
//     setZoom({ x: 0, y: 0, scale: 1 });
//   };

//   const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!selectedImage) return;

//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;

//     setZoom({ x, y, scale: 1.2 });
//   };

//   const handleZoomLeave = () => {
//     setZoom({ x: 0, y: 0, scale: 1 });
//   };

//   if (loading) return <div className="pt-36 p-4">Loading...</div>;
//   if (error) return <div className="pt-36 p-4 text-red-500">{error}</div>;
//   if (!product) return <div className="pt-36 p-4">No product data available</div>;

//   return (
//     <motion.div 
//       className="min-h-screen bg-white"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
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

//       <CartPreview
//         isOpen={showCartPreview}
//         onClose={() => setShowCartPreview(false)}
//         cartItems={cartItems}
//       />

//       <div className="max-w-7xl mx-auto px-4 pt-36 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
//           <ProductImageGallery
//             images={product.images}
//             selectedImage={selectedImage}
//             productTitle={product.productTitle}
//             onImageClick={handleImageClick}
//             onZoomMove={handleZoomMove}
//             onZoomLeave={handleZoomLeave}
//             onFullScreenToggle={handleFullScreenToggle}
//             zoom={zoom}
//           />

//           <motion.div 
//             className="space-y-6 lg:pl-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.h1 
//               className="text-2xl lg:text-3xl font-bold text-gray-900"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               {product.productTitle}
//             </motion.h1>

//             <motion.div 
//               className="flex items-center space-x-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               {product.price !== product.discountedPrice && (
//                 <p className="text-base text-gray-500 line-through">₹{product.price}</p>
//               )}
//               <p className="text-xl lg:text-2xl font-bold">₹{product.discountedPrice}</p>
//             </motion.div>

//             <motion.span
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.4 }}
// /*               className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//                 product.instock === 'Out of Stock'
//                   ? 'bg-red-100 text-red-800'
//                   : 'bg-blue-100 text-blue-800'
//               } */
// className={`inline-block px-3 py-1 text-xs font-medium ${
  
// product.instock === 'Out of Stock' 
//     ? 'bg-red-100 text-red-800' 
//     : 'bg-blue-100 text-blue-800'}
// `}

//             >
//               {product.instock === 'Out of Stock' ? 'Out of Stock' : product.instock}
//             </motion.span>

//             <motion.div 
//               className="space-y-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <label htmlFor="size" className="block text-sm font-medium text-gray-700">
//                 Select Size
//               </label>
//               <select
//                 id="size"
//                 name="size"
//                 value={selectedSize}
//                 onChange={(e) => {
//                   setSelectedSize(e.target.value);
//                   setSizeError('');
//                 }}
//                 className={`w-full px-3 py-2 text-sm border ${
//                   sizeError ? 'border-red-500' : 'border-gray-300'
//                 } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent`}
//               >
//                 <option value="">Choose a size</option>
                
//                 <option value="S">S</option>
//                 <option value="M">M</option>
//                 <option value="L">L</option>
//                 <option value="XL">XL</option>
//                 <option value="XXL">XXL</option>
//               </select>
//               {sizeError && (
//                 <p className="text-red-500 text-sm mt-1">{sizeError}</p>
//               )}
//             </motion.div>

//             <motion.p
//               className="text-gray-600 text-sm leading-relaxed"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               {product.prodDesc}
//             </motion.p>

//             <motion.div 
//               className="space-y-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7 }}
//             >
//               <label className="block text-sm font-medium text-gray-700">Quantity</label>
//               <div className="flex items-center space-x-4">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleQuantityChange(-1)}
//                   className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
//                 >
//                   <Minus className="w-3 h-3" />
//                 </motion.button>
//                 <span className="text-base font-medium w-10 text-center">{quantity}</span>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleQuantityChange(1)}
//                   className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
//                 >
//                   <Plus className="w-3 h-3" />
//                 </motion.button>
//               </div>
//             </motion.div>

//             <motion.div 
//               className="space-y-3 pt-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleAddToCart}
//                 className="w-full py-3 px-4 text-sm bg-black text-white rounded-lg font-medium transition-all duration-300 border-2 border-transparent hover:border-black hover:bg-white hover:text-black"
//               >
//                 Add to Cart
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={handleBuyNow}
//                 className="w-full py-3 px-4 text-sm bg-white text-black border-2 border-black rounded-lg font-medium transition-all duration-300 hover:bg-black hover:text-white"
//               >
//                 Buy Now
//               </motion.button>
//             </motion.div>

//             <motion.div 
//               className="space-y-4 border-t border-gray-200 pt-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.9 }}
//             >
//               <h3 className="text-lg font-medium">Product Details</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center space-x-2">
//                   <span className="text-black">★</span>
//                   <span>{product.fit}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-black">★</span>
//                   <span>{product.gender}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-black">★</span>
//                   <span>{product.material}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-black">★</span>
//                   <span>{product.fabricWeight}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-black">★</span>
//                   <span>{product.construction}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-black">★</span>
//                   <span>{product.origin}</span>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {showFullScreen && (
//         <motion.div 
//           className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <div className="relative w-full h-full flex items-center justify-center">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={handleFullScreenToggle}
//               className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
//             >
//               <X className="w-6 h-6" />
//             </motion.button>
//             <motion.img
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               src={selectedImage || product.images[0]}
//               alt="Full screen view"
//               className="max-w-[90vw] max-h-[90vh] object-contain"
//             />
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Plus, Minus, X, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProductImageGallery from '../components/ProductImageGallery';
import { CartPreview } from '../App';

interface Product {
  _id: string;
  productId: string;
  productTitle: string;
  images: string[];
  prodDesc: string;
  price: number;
  discountedPrice: number;
  fit: string;
  gender: string;
  material: string;
  fabricWeight: string;
  construction: string;
  origin: string;
  instock: string;
}

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [zoom, setZoom] = useState({ x: 0, y: 0, scale: 1 });
  const { addToCart, cartItems } = useCart();
  const [showCartPreview, setShowCartPreview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}`);
        if (response.data) {
          setProduct(response.data);
          setSelectedImage(response.data.images[0]);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError('Please select a size');
      return;
    }

    if (product) {
      const cartItem = {
        id: product.productId,
        name: product.productTitle,
        price: product.discountedPrice,
        quantity: quantity,
        image: product.images[0],
        size: selectedSize,
      };
      addToCart(cartItem);
      setQuantity(1);
      setSizeError('');
      setShowCartPreview(true);
      
      setTimeout(() => {
        setShowCartPreview(false);
      }, 3000);
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError('Please select a size');
      return;
    }
    handleAddToCart();
    navigate('/checkout');
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setZoom({ x: 0, y: 0, scale: 1 });
  };

  const handleFullScreenToggle = () => {
    setShowFullScreen(!showFullScreen);
    setZoom({ x: 0, y: 0, scale: 1 });
  };

  if (loading) return <div className="pt-36 p-4">Loading...</div>;
  if (error) return <div className="pt-36 p-4 text-red-500">{error}</div>;
  if (!product) return <div className="pt-36 p-4">No product data available</div>;

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={() => navigate('/shop')}
        className="fixed top-24 left-4 z-10 flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-black hover:text-white transition-all duration-300 border border-gray-100"
        whileHover={{ scale: 1.02, x: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft className="w-3 h-3" />
        Back
      </motion.button>

      <CartPreview isOpen={showCartPreview} onClose={() => setShowCartPreview(false)} cartItems={cartItems} />

      <div className="max-w-6xl mx-auto px-3 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
          <ProductImageGallery {...imageGalleryProps} />

          <motion.div 
            className="space-y-2 lg:pl-3 backdrop-blur-sm bg-white/90 p-2 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-sm font-medium text-gray-900">{product.productTitle}</h1>

            <div className="flex items-baseline space-x-1">
              {product.price !== product.discountedPrice && (
                <p className="text-xs text-gray-400 line-through">₹{product.price}</p>
              )}
              <p className="text-sm font-medium">₹{product.discountedPrice}</p>
            </div>

            <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
              product.instock === 'Out of Stock'
                ? 'bg-red-50 text-red-600'
                : 'bg-green-50 text-green-600'
            } backdrop-blur-sm`}>
              {product.instock}
            </span>

            <div className="space-y-1 pt-1">
              <p className="text-[10px] font-medium text-gray-500">Select Size</p>
              <div className="flex flex-wrap gap-1">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError('');
                    }}
                    className={`w-7 h-7 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedSize === size 
                        ? 'bg-black text-white shadow-md' 
                        : 'bg-white text-black border border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {sizeError && (
                <p className="text-[10px] text-red-500">{sizeError}</p>
              )}
            </div>

            <p className="text-[11px] leading-relaxed text-gray-600 pt-1">
              {product.prodDesc}
            </p>

            <div className="space-y-1 pt-1">
              <p className="text-[10px] font-medium text-gray-500">Quantity</p>
              <div className="inline-flex items-center space-x-2 bg-gray-50/80 rounded-full px-1.5 py-0.5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(-1)}
                  className="p-1 rounded-full hover:bg-black hover:text-white transition-all duration-200"
                >
                  <Minus className="w-2 h-2" />
                </motion.button>
                <span className="text-xs font-medium w-4 text-center">{quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(1)}
                  className="p-1 rounded-full hover:bg-black hover:text-white transition-all duration-200"
                >
                  <Plus className="w-2 h-2" />
                </motion.button>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCart}
                className="w-full py-1 text-xs bg-black text-white rounded-full font-medium transition-all duration-200 hover:shadow-md"
              >
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleBuyNow}
                className="w-full py-1 text-xs bg-white text-black border border-black rounded-full font-medium transition-all duration-200 hover:bg-black hover:text-white hover:shadow-md"
              >
                Buy Now
              </motion.button>
            </div>

            <div className="space-y-1 border-t border-gray-100 pt-2">
              <p className="text-[10px] font-medium text-gray-500">Product Details</p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { label: 'Fit', value: product.fit },
                  { label: 'Gender', value: product.gender },
                  { label: 'Material', value: product.material },
                  { label: 'Weight', value: product.fabricWeight },
                  { label: 'Construction', value: product.construction },
                  { label: 'Origin', value: product.origin }
                ].map((detail, index) => (
                  <div
                    key={detail.label}
                    className="group p-1 rounded-md bg-gray-50/80 hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <p className="text-[9px] text-gray-400 group-hover:text-gray-300">{detail.label}</p>
                    <p className="text-[10px] font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showFullScreen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFullScreenToggle}
              className="absolute top-3 right-3 text-white p-1 hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <X className="w-3 h-3" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage || product.images[0]}
              alt="Full screen view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
