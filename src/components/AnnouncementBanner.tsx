import React, { useEffect, useState } from 'react';

const announcements = [
  "FREE DOMESTIC SHIPPING ON ORDERS ABOVE 2000",
  " 10% OFF : USE CODE \"SANTA666\" ON ORDERS ABOVE 5000 "
];

export default function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-0.5">
      <div className="relative overflow-hidden h-5">
        <div
          className="whitespace-nowrap transition-transform duration-500 ease-in-out absolute w-full text-center"
          style={{
            transform: `translateX(${-currentIndex * 100}%)`,
          }}
        >
          {announcements.map((text, index) => (
            <span
              key={index}
              className="inline-block w-full text-xs font-medium tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
