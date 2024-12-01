


// import { Link, useLocation } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useEffect, useState } from 'react';
// import AnnouncementBanner from './AnnouncementBanner';

// export default function Navbar() {
//   const location = useLocation();
//   const { cartItems } = useCart();
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
  
//       const dateOptions: Intl.DateTimeFormatOptions = {
//         timeZone: 'Asia/Kolkata',
//         month: '2-digit',
//         day: '2-digit',
//         year: 'numeric',
//       };
  
//       const timeOptions: Intl.DateTimeFormatOptions = {
//         timeZone: 'Asia/Kolkata',
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true,
//       };
  
//       const formattedDate = now.toLocaleDateString('en-US', dateOptions);
//       let formattedTime = now.toLocaleTimeString('en-US', timeOptions);
//       formattedTime = formattedTime.replace(/(\d)([APM]{2})$/, '$1$2');
  
//       setDate(formattedDate);
//       setTime(`${formattedTime} IST`);
//     }, 1000);
  
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <>
//       <AnnouncementBanner />
//       <nav className={`fixed w-full bg-[#fafafa]/80 backdrop-blur-xs z-40 transition-all ${isScrolled ? 'py-0.5' : 'py-1'}`}>
//         <div className="max-w-7xl mx-auto px-4-xs:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between">
//             <div className="flex-1 flex justify-center items-center">
//               <Link to="/" className="mb-2">
//                 <img
//                   src="/img/1-1.png"
//                   alt="Brand Logo"
//                   className={`h-10 object-contain transition-all ${isScrolled ? 'w-32 h-16' : 'w-36 h-20'}`}
//                   style={{ objectFit: 'cover' }}
//                 />
//               </Link>
//             </div>

//             <div className="relative">
//               <div className="text-center text-xs font-HelveticaCustom">
//                 <span>{date}</span>
//                 <span className="inline-block w-8"></span>
//                 <span>{time}</span>
//               </div>
//               <Link
//                 to="/cart"
//                 className="flex items-center justify-center mt-1 text-xs font-HelveticaCustom font-bold hover:text-black transition-colors px-4 py-2 rounded"
//               >
//                 <span>Cart</span>
//                 {cartItems.length > 0 && (
//                   <span className="ml-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                     {cartItems.reduce((total, item) => total + item.quantity, 0)}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import AnnouncementBanner from './AnnouncementBanner';

export default function Navbar() {
  const location = useLocation();
  const { cartItems } = useCart();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
  
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      };
  
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
  
      const formattedDate = now.toLocaleDateString('en-US', dateOptions);
      let formattedTime = now.toLocaleTimeString('en-US', timeOptions);
      formattedTime = formattedTime.replace(/(\d)([APM]{2})$/, '$1$2');
  
      setDate(formattedDate);
      setTime(`${formattedTime} IST`);
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnnouncementBanner />
      <nav className={`fixed w-full bg-[#fafafa]/80 backdrop-blur-xs z-40 transition-all ${isScrolled ? 'py-0.5' : 'py-1'} top-6`}>
        <div className="max-w-7xl mx-auto px-4-xs:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between">
            <div className="flex-1 flex justify-center items-center">
              <Link to="/" className="mb-2">
                <img
                  src="/img/1-1.png"
                  alt="Brand Logo"
                  className={`h-10 object-contain transition-all ${isScrolled ? 'w-32 h-16' : 'w-36 h-20'}`}
                  style={{ objectFit: 'cover' }}
                />
              </Link>
            </div>

            <div className="relative">
              <div className="text-center text-xs font-HelveticaCustom">
                <span>{date}</span>
                <span className="inline-block w-8"></span>
                <span>{time}</span>
              </div>
              <Link
                to="/cart"
                className="flex items-center justify-center mt-1 text-xs font-HelveticaCustom font-bold hover:text-black transition-colors px-4 py-2 rounded"
              >
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
