import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function AboutUs() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const menuItems = [
    { label: 'Shop', path: '/shop' },
    { label: 'Lookbook', path: '/lookbook' },
    { label: 'Track Order', path: '/trackorder' },
    { label: 'Back Home', path: '/' },
  ];

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

          {/* Main Content */}
          <div className="flex-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl font-light mb-8 ml-[-100px]">Too Far Gone</h1>
              <p className="text-gray-600 mb-16 leading-relaxed">
                No about us because we don't know who we are. That's why we
                started another oversized clothing brand in an already saturated
                market. We hope you can buy something from us and help this
                passion project turn into something bigger. Pretty pleaseee :3
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Contact us on IG:{" "}
                <a
                  href="https://instagram.com/toofargone.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline hover:text-blue-700"
                >
                  @toofargone.in
                </a>{" "}
                & Mail:{" "}
                <a
                  href="mailto:toofargonesupp0rt@gmail.com"
                  className="font-bold hover:underline hover:text-blue-700"
                >
                  toofargonesupp0rt@gmail.com
                </a>
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="/img/aboutus_png.png"
                  alt="Studio"
                  className="w-full h-[300px] object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center"
              >
                <div>
                  <h2 className="text-2xl font-light mb-6">Our Philosophy</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We don't believe in any of the pretentious "it's not just a
                    clothing brand, it's a movement" stuff. We only care about
                    crafting designs and clothes anyone can wear.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We only care about creating dope things for dope people.
                    You either get it, or you don't.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
