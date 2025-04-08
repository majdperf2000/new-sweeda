import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Star, Navigation, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import { Badge } from '@/components/ui/Badge.js';
import { cn } from '@/lib/utils.js';
import { getFeaturedStores, Store } from '@/utils/mockData.js';
import { Link } from 'react-router-dom';

const BrowseStores = () => {
  const stores = getFeaturedStores();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Check if scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        setShowScrollButtons(
          scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth
        );
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [stores]);

  // Animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Scroll controls with animation
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <motion.span
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ delay: 0.1 }}
            >
              Partner Stores
            </motion.span>
            <motion.h2
              className="heading-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              Browse <span className="text-[#2A6DFF]">Local Businesses</span>
            </motion.h2>
          </div>
          <motion.div
            className="flex items-center mt-4 md:mt-0 space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            transition={{ delay: 0.3 }}
          >
            {showScrollButtons && (
              <>
                <Button variant="outline" size="icon" onClick={scrollLeft} className="hover-3d">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={scrollRight} className="hover-3d">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
            <Button variant="ghost" className="hover-3d" asChild>
              <Link to="/stores">
                View All Stores <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="relative"
        >
          {/* Horizontal scrollable container */}
          <motion.div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
            whileHover={{ cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                variants={itemVariants}
                custom={index}
                className="min-w-[300px] w-80 snap-start pr-4"
              >
                <StoreCard store={store} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="h-full">
      <Link
        to={`/stores/${store.id}`}
        className="block rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-border shadow-lg hover:shadow-xl transition-all duration-300 h-full hover-3d"
      >
        {/* Store Header with Gradient Overlay */}
        <div
          className="relative h-48 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${store.logo})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Store Logo */}
          <motion.div
            className="absolute top-4 left-4 w-16 h-16 rounded-lg overflow-hidden bg-white shadow-lg p-1"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={store.logo}
              alt={store.name}
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          </motion.div>

          {/* Featured Badge */}
          {store.featured && (
            <Badge className="absolute top-4 right-4 bg-gold-500 text-white" asChild>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Featured
              </motion.div>
            </Badge>
          )}

          {/* Store Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-semibold text-xl mb-1">{store.name}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-gold-500 fill-gold-500" />
                <span className="ml-1 text-sm">{store.rating}</span>
              </div>

              <div className="flex items-center text-xs text-white/90">
                <Navigation className="h-3 w-3 mr-1" />
                <span>2.4 miles away</span>
              </div>
            </div>
          </div>
        </div>

        {/* Store Details */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {store.categories.slice(0, 3).map((category, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {category}
              </Badge>
            ))}
            {store.categories.length > 3 && (
              <Badge variant="outline">+{store.categories.length - 3}</Badge>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{store.productsCount} Products</span>

            <Button size="sm" className="bg-[#2A6DFF] hover:bg-[#1A5EF0] text-white hover-3d">
              Visit Store
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BrowseStores;
