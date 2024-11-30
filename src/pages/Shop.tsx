
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface Product {
  productId: string;
  productTitle: string;
  price: number;
  discountedPrice: number;
  images: string[];
  instock: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Lookbook', path: '/lookbook' },
    { label: 'About Us', path: '/about' },
    { label: 'Track Order', path: '/trackorder' },
    { label: 'Back Home', path: '/' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set(prev).add(productId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-24 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white z-40 md:hidden pt-36 px-4 shadow-xl"
          >
            <nav className="space-y-2 pt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
{/*desktop*/}
      <div className="pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-24 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              <div className="space-y-2 pt-8 text-left">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-white-500 hover:text-white hover:bg-gray-400 text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                (product.instock === "" || product.instock === "Out of Stock") && (
                  <motion.div
                    key={product.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Link 
                      to={`/product/${product.productId}`} 
                      className="block relative aspect-square overflow-hidden bg-gray-100 rounded-lg"
                    >
                      <div
                        className="relative w-full h-full"
                        onMouseEnter={() => setHoveredProduct(product.productId)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {product.images && product.images.length > 0 && (
                          <motion.img
                            src={hoveredProduct === product.productId && product.images[1]
                              ? product.images[1]
                              : product.images[0]}
                            alt={product.productTitle}
                            className="w-full h-full object-cover"
                            initial={false}
                            animate={{
                              scale: hoveredProduct === product.productId ? 1.1 : 1
                            }}
                            transition={{ duration: 0.6 }}
                            onError={() => handleImageError(product.productId)}
                          />
                        )}
                      </div>
                    </Link>

                    <div className="mt-4 space-y-1">
                      <Link 
                        to={`/product/${product.productId}`} 
                        className="block text-sm font-medium hover:text-black transition-colors duration-200"
                      >
                        {product.productTitle}
                      </Link>

                      {product.instock === 'Out of Stock' && (
                        <p className="text-red-500 text-xs font-medium">Out of Stock</p>
                      )}

                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                        <p className="text-sm font-semibold">₹{product.discountedPrice}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



