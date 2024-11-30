
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer'; // Import the Footer component
// import Home from './pages/Home';
// import Shop from './pages/Shop';
// import Lookbook from './pages/Lookbook'; // Import Lookbook component
// import AboutUs from './pages/AboutUs';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Shipping from './pages/Shipping'; // Import Shipping Policy page
// import PrivacyPolicy from './pages/PrivacyPolicy'; // Import Privacy Policy page
// import TermsOfService from './pages/TermsOfService'; // Import Terms of Service page

// import { CartProvider } from './context/CartContext';

// function App() {
//   return (
//     <Router>
//       <CartProvider>
//         <div className="min-h-screen bg-[#fafafa] flex flex-col ">
//           <Navbar />
//           <div className="mb-20">
//           <main className="flex-grow">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/shop" element={<Shop />} />
//               <Route path="/lookbook" element={<Lookbook />} />
//               <Route path="/about" element={<AboutUs />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/checkout" element={<Checkout />} />
//               <Route path="/shipping-policy" element={<Shipping />} />
//               <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//               <Route path="/terms-of-service" element={<TermsOfService />} />
//             </Routes>
//           </main>
//           </div>
//           <Footer /> {/* Ensure Footer is properly imported */}
//         </div>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'; // Import the Footer component
import Home from './pages/Home';
import Shop from './pages/Shop';
import Lookbook from './pages/Lookbook'; // Import Lookbook component
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Shipping from './pages/Shipping'; // Import Shipping Policy page
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import Privacy Policy page
import TermsOfService from './pages/TermsOfService'; // Import Terms of Service page
import ProductDetail from './pages/ProductDetail'; // Import Product Detail page
import OrderConfirmation from './pages/OrderConfirmation'; // Import Order
import NotFound from './pages/NotFound'; // Import 404 page
import TrackOrder from './pages/TrackOrder'; // Import Track Order
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <Router>
      <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />
        <div className="min-h-screen bg-[#fafafa] flex flex-col ">
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
                <Route path="/order-confirmation" element={<OrderConfirmation />}/>
                <Route path="/trackorder" element={<TrackOrder />}/>
                <Route path="*" element={<NotFound />} /> {/* 404 Page */}
              </Routes>
            </main>
          </div>
          <Footer /> {/* Ensure Footer is properly imported */}
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

