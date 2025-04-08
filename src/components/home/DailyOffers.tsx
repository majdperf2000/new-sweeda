import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Timer, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import { Progress } from '@/components/ui/progress.js';
import { cn } from '@/lib/utils.js';
import { getDailyOffers, Product } from '@/utils/mockData.js';
import { toast } from 'sonner';

const DailyOffers = () => {
  const [offers] = useState<Product[]>(getDailyOffers());
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const containerRef = useRef<HTMLDivElement>(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
        const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleAddToCart = (product: Product) => {
    toast.success(`${product.name} added to cart!`, {
      position: 'top-center',
      duration: 2000,
    });
  };

  const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const timeUnitVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.section
      ref={ref}
      className="section-padding bg-gradient-to-b from-blue-50/30 to-amber-50/30 dark:from-blue-950/30 dark:to-amber-950/30"
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
              Limited Time
            </motion.span>
            <motion.h2
              className="heading-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              Today's <span className="text-primary">Special Offers</span>
            </motion.h2>
          </div>

          <motion.div
            className="flex items-center mt-4 md:mt-0 space-x-6"
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <Timer className="text-primary mr-2" />
              <div className="flex items-center space-x-1">
                {Object.entries(timeLeft).map(([unit, value], i) => (
                  <motion.div
                    key={unit}
                    custom={i}
                    variants={timeUnitVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-primary text-white px-2 py-1 rounded"
                  >
                    {formatTimeUnit(value)}
                    {i < 2 && <span className="ml-1">:</span>}
                  </motion.div>
                ))}
              </div>
            </div>

            <Button variant="ghost" className="hover-3d">
              View All Offers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {offers.map((offer) => {
            const stockPercentage = (offer.stock / 100) * 100;
            const stockStatus =
              stockPercentage > 50
                ? 'In Stock'
                : stockPercentage > 20
                  ? 'Selling Fast'
                  : 'Almost Gone';
            const stockColor =
              stockPercentage > 50
                ? 'bg-emerald-500'
                : stockPercentage > 20
                  ? 'bg-amber-500'
                  : 'bg-red-500';

            const discountedPrice = offer.discount
              ? offer.price * (1 - offer.discount / 100)
              : offer.price;

            return (
              <motion.div
                key={offer.id}
                variants={itemVariants}
                className="offer-card group relative overflow-hidden rounded-xl border border-border bg-white dark:bg-gray-800 shadow-soft hover:shadow-glass transition-all duration-300 hover-3d"
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-48 bg-muted/30 overflow-hidden">
                    <motion.img
                      src={offer.image}
                      alt={offer.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      loading="lazy"
                    />
                    {offer.discount && offer.discount > 0 && (
                      <motion.div
                        className="absolute top-4 left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg"
                        initial={{ rotate: 12 }}
                        whileHover={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        -{offer.discount}%
                      </motion.div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                          {offer.name}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                          {offer.category}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">{offer.description}</p>

                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ${discountedPrice.toFixed(2)}
                        </span>
                        {offer.discount && offer.discount > 0 && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ${offer.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Available Stock</span>
                          <span
                            className={cn(
                              'font-medium',
                              stockPercentage > 50
                                ? 'text-emerald-600'
                                : stockPercentage > 20
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                            )}
                          >
                            {stockStatus}
                          </span>
                        </div>
                        <Progress value={stockPercentage} className={cn('h-2', stockColor)} />
                      </div>

                      <Button
                        className="w-full gap-2 hover-3d"
                        onClick={() => handleAddToCart(offer)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DailyOffers;
