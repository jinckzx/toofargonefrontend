
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnnouncementBanner from './AnnouncementBanner';

export default function Navbar() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className="fixed top-0 w-full z-40">
      <AnnouncementBanner />
      <nav className={`bg-[#fafafa]/80 backdrop-blur-sm transition-all ${isScrolled ? 'py-0.5' : 'py-1'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between">
            <div className="flex-1 flex justify-center items-center">
              <Link to="/" className="mb-1">
                <img
                  src="/img/1-1.png"
                  alt="Brand Logo"
{/*                   className={`object-contain transition-all ${isScrolled ? 'w-24 h-12' : 'w-28 h-14'}`}
                  style={{ objectFit: 'cover' }} */}
className={`object-contain transition-transform ${isScrolled ? 'scale-110' : 'scale-125'}`} {/* Scales the logo */}
            style={{ objectFit: 'cover', width: '7rem', height: '4.5rem' }} {/* Fixed dimensions */}
                />
              </Link>
            </div>

            <div className="relative">
{/*               <div className="text-center text-xs font-HelveticaCustom">
                <span>{date}</span>
                <span className="inline-block w-8"></span>
                <span>{time}</span>
              </div> */}
              <Link
                to="/cart"
                className="flex items-center justify-center mt-0.5 text-xs font-HelveticaCustom font-bold hover:text-black transition-colors px-4 py-1 rounded"
              >
                <span>Cart</span>
                <span className="ml-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

