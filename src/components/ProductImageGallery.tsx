import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: string | null;
  productTitle: string;
  onImageClick: (image: string) => void;
  onZoomMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onZoomLeave: () => void;
  onFullScreenToggle: () => void;
  zoom: { x: number; y: number; scale: number };
}

export default function ProductImageGallery({
  images,
  selectedImage,
  productTitle,
  onImageClick,
  onZoomMove,
  onZoomLeave,
  onFullScreenToggle,
  zoom,
}: ProductImageGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Image */}
      <div className="relative">
        <motion.div
          className="relative w-full h-[300px] sm:h-[375px] lg:h-[450px] xl:h-[500px] overflow-hidden rounded-lg cursor-zoom-in"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onMouseMove={onZoomMove}
          onMouseLeave={onZoomLeave}
          onClick={onFullScreenToggle}
        >
          <motion.img
            src={selectedImage || images[0]}
            alt={productTitle}
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${zoom.scale})`,
              transformOrigin: `${zoom.x}% ${zoom.y}%`,
            }}
          />
        </motion.div>
        <button 
          onClick={onFullScreenToggle}
          className="absolute bottom-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <motion.div 
        className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {images.map((image, index) => (
          <motion.button
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ease-in-out ${
              selectedImage === image ? 'border-black' : 'border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => onImageClick(image)}
          >
            <img
              src={image}
              alt={`${productTitle} - View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}