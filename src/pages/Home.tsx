import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  return (
    <div className="relative h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Corrected Image Path */}
        <img
          src="/img/download.jpeg" // Path relative to the `public` folder
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <div className="relative h-full flex items-center justify-center text-white">
        <div className="text-center space-y-6">
          
          
          

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link 
              to="/shop"
              className="inline-flex items-center space-x-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            >
              <span>SHOP</span>
              
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link 
              to="/lookbook"
              className="inline-flex items-center space-x-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            >
              <span>LOOKBOOK</span>
              
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link 
              to="/about"
              className="inline-flex items-center space-x-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            >
              <span>ABOUT US</span>
              
            </Link>

          </motion.div>
           {/* Instagram Icon */}
           <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center space-x-4 mt-2"
          >
            <a
              href="https://instagram.com/toofargone.in" // Replace with your Instagram link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:text-black hover:bg-white transition-colors rounded-full p-2"
            >
              <img
                src="img/instagram-new.png" // Path relative to `public`
                alt="Instagram Icon"
                className="h-4 w-4" // Adjust size as needed
              />
            </a>
            {/* Spotify Icon */}
            <a
              href="https://open.spotify.com/playlist/58zSqyd5OZxHp88EMmcYPl?si=6d1167e7ba8e4ef5" // Replace with your Spotify playlist link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:text-black hover:bg-white transition-colors rounded-full p-2"
            >
              <img
                src="/img/s.png" // Path relative to `public`
                alt="Spotify Icon"
                className="h-3 w-3" // Adjust size as needed
              />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
