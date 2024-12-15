
// import { useEffect, useState } from 'react';
// import { motion,AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';

// interface InstagramPost {
//   lookbookId: string;
//   imgUrl: string;
  
  
// }

// export default function Lookbook() {
//   // State variables
//   const [posts, setPosts] = useState<InstagramPost[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const menuItems = [
//     { label: 'Shop', path: '/shop' },
//     { label: 'About Us', path: '/about' },
//     { label: 'Track Order', path: '/trackorder' },
//     { label: 'Back Home', path: '/' },
//   ];

//   // Scroll to top on load
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Fetch posts from the server
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lookbook`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch posts');
//         }
//         const data = await response.json();
//         setPosts(data); // Assuming data is an array of InstagramPost objects
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to load posts');
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Render loading or error messages
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     // <div className="pt-36 min-h-screen">
//     //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     //     <div className="flex gap-8">
//     //       {/* Sidebar - Adjusted width */}
//     //       <div className="w-24 flex-shrink-0">
//     //         <div className="sticky top-28 space-y-6">
//     //           <div className="space-y-2 pt-8 text-left">
//     //             <Link to="/shop" className="block text-white-500 hover:text-white hover:bg-gray-400 text-sm">
//     //               Shop
//     //             </Link>
//     //             <Link to="/about" className="block text-white-500 hover:text-white hover:bg-gray-400 text-sm">
//     //               About Us
//     //             </Link>
//     //             <Link to="/" className="block text-white-500 hover:text-white hover:bg-gray-400 text-sm">
//     //               Track Order
//     //             </Link>
//     //             <Link to="/" className="block text-white-500 hover:text-white hover:bg-gray-400 text-sm">
//     //               Back Home
//     //             </Link>
//     //           </div>
//     //         </div>
//     //       </div>
//     <div className="min-h-screen bg-white">
//       {/* Mobile Menu Button */}
//       <motion.button
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="md:hidden fixed top-24 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
//       >
//         {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </motion.button>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ x: '-100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '-100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//             className="fixed top-0 left-0 h-full w-64 bg-white z-40 md:hidden pt-36 px-4 shadow-xl"
//           >
//             <nav className="space-y-2 pt-8">
//               {menuItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
// {/*desktop*/}
//       <div className="pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex gap-8">
//           {/* Desktop Sidebar */}
//           <div className="hidden md:block w-24 flex-shrink-0">
//             <div className="sticky top-28 space-y-6">
//               <div className="space-y-2 pt-8 text-left">
//                 {menuItems.map((item) => (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     className="block text-white-500 hover:text-white hover:bg-gray-400 text-sm"
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {posts.map((post, index) => (
//                 <motion.div
//                   key={post.lookbookId}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="relative aspect-square group cursor-pointer"
//                 >
//                   <img
//                     src={post.imgUrl}
//                     alt={`Lookbook item ${post.lookbookId}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
//                     <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       {/* You can add some text or buttons here */}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface InstagramPost {
  lookbookId: string;
  imgUrl: string;
}

const getRandomSize = () => {
  const sizes = [
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
    'col-span-1 row-span-2',
    'col-span-2 row-span-2'
  ];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Lookbook() {
  const [posts, setPosts] = useState<(InstagramPost & { size: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Shop', path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Track Order', path: '/trackorder' },
    { label: 'Back Home', path: '/' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lookbook`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        
        // Add random sizes and shuffle the posts
        const postsWithSizes = data.map((post: InstagramPost) => ({
          ...post,
          size: getRandomSize()
        }));
        setPosts(shuffleArray(postsWithSizes));
        setLoading(false);
      } catch (error) {
        setError('Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-light"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-24 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-colors duration-300"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white z-50 md:hidden pt-36 px-4 shadow-xl"
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
          </>
        )}
      </AnimatePresence>

      <div className="pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
           <div className="hidden md:block w-36 -ml-20 flex-shrink-0 ">
            <div className="sticky top-28 space-y-6">
              <div className="space-y-2 pt-8 text-left">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-white-500 hover:text-white hover:bg-gray-400 transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1"
          >
            <div className="grid grid-cols-4 auto-rows-[200px] gap-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.lookbookId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={`${post.size} relative overflow-hidden`}
                >
                  <motion.img
                    src={post.imgUrl}
                    alt={`Lookbook item ${post.lookbookId}`}
                    className="w-full h-full object-contain rounded-lg"
                    layoutId={`image-${post.lookbookId}`}
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
                  >
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-sm font-light"
                    >
                      View Details
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
