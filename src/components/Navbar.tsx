

// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import AnnouncementBanner from './AnnouncementBanner';

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [cartItems, setCartItems] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const updateCartItems = () => {
//       const cartData = localStorage.getItem('cart');
//       const cart = cartData ? JSON.parse(cartData) : [];
//       setCartItems(cart.length);
//     };

//     updateCartItems();
//     window.addEventListener('cart-updated', updateCartItems);

//     return () => {
//       window.removeEventListener('cart-updated', updateCartItems);
//     };
//   }, []);

//   return (
//     <header className="fixed top-0 w-full z-40">
//       <AnnouncementBanner />
//       <nav className={`bg-[#fafafa]/80 backdrop-blur-sm transition-all ${isScrolled ? 'py-0.5' : 'py-1'}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between">
//             <div className="flex-1 flex justify-center items-center">
//               <Link to="/" className="mb-1">
//                 <img
//                   src="/img/1-1.png"
//                   alt="Brand Logo"
//                   className={`object-contain transition-all ${isScrolled ? 'w-24 h-12' : 'w-28 h-14'}`}
//                   style={{ objectFit: 'cover' }}
//                 />
//               </Link>
//             </div>
//             <div className="relative">
//               <Link
//                 to="/cart"
//                 className="flex items-center justify-center mt-0.5 text-xs font-HelveticaCustom font-bold hover:text-black transition-colors px-4 py-1 rounded"
//               >
//                 <span>Cart</span>
//                 <span className="ml-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                   {cartItems}
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Adjust the import path as needed
import AnnouncementBanner from './AnnouncementBanner';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart(); // Use the CartContext hook

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-40">
      <AnnouncementBanner />
{/*       <nav className={`bg-[#fafafa]/80 backdrop-blur-sm transition-all ${isScrolled ? 'py-0.5' : 'py-1'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between">
            <div className="flex-1 flex justify-center items-center">
              <Link to="/" className="mb-1">
                <img
                  src="/img/1-1.png"
                  alt="Brand Logo"
                  className={`object-contain transition-all ${isScrolled ? 'w-24 h-12' : 'w-28 h-14'}`}
                  style={{ objectFit: 'cover' }}
                />
              </Link>
            </div>
            <div className="relative">
              <Link
                to="/cart"
                className="flex items-center justify-center mt-0.5 text-xs font-HelveticaCustom font-bold hover:text-black transition-colors px-4 py-1 rounded"
              >
                <span>Cart</span>
                <span className="ml-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {getTotalItems()} {/* Use getTotalItems from CartContext */}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav> */}
<nav className={`bg-[#fafafa]/80 backdrop-blur-sm transition-all ${isScrolled ? 'py-0.5' : 'py-1'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center justify-between">
      <div className="flex-1 flex justify-center items-center">
        <Link to="/" className="mb-1">
          <img
            src="/img/1-1.png"
            alt="Brand Logo"
            className={`transition-transform ${isScrolled ? 'scale-110' : 'scale-130'}`} // Scales the logo
            style={{
              width: '6rem', // Keep fixed dimensions
              height: '3rem',
              objectFit: 'contain',
            }}
          />
        </Link>
      </div>
      <div className="relative">
        <Link
          to="/cart"
          className="flex items-center justify-center mt-0.5 text-xs font-HelveticaCustom font-bold hover:text-black transition-colors px-4 py-1 rounded"
        >
          <span>Cart</span>
          <span className="ml-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {getTotalItems()} {/* Use getTotalItems from CartContext */}
          </span>
        </Link>
      </div>
    </div>
  </div>
</nav>

    </header>
  );
}
