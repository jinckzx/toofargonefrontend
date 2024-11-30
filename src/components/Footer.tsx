
// import { Link } from 'react-router-dom';

// export default function Footer() {
//     return (
//       <footer className="bg-white py-4">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center space-y-2">
//             <Link
//               to="/shipping-policy"
//               className="text-sm text-black hover:bg-black hover:text-white px-2 py-1 rounded transition"
//             >
//               Shipping Policy
//             </Link>
//             <Link
//               to="/privacy-policy"
//               className="text-sm text-black hover:bg-black hover:text-white px-2 py-1 rounded transition"
//             >
//               Privacy Policy
//             </Link>
//             <Link
//               to="/terms-of-service"
//               className="text-sm text-black hover:bg-black hover:text-white px-2 py-1 rounded transition"
//             >
//               Terms of Service
//             </Link>
//           </div>
//           <p className="text-black text-sm mt-4 text-center">© {new Date().getFullYear()} TooFarGone LLC</p>
//         </div>
//       </footer>
//     );
//   }
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/shipping-policy"
            className="text-sm text-black hover:bg-black hover:text-white rounded transition"
          >
            Shipping Policy
          </Link>
          <Link
            to="/privacy-policy"
            className="text-sm text-black hover:bg-black hover:text-white  rounded transition"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-sm text-black hover:bg-black hover:text-white rounded transition"
          >
            Terms of Service
          </Link>
        </div>
        <p className="text-black text-sm mt-6 text-center">© {new Date().getFullYear()} TooFarGone LLC</p>
      </div>
    </footer>
  );
}
