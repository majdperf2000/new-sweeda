import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import { Badge } from '@/components/ui/Badge.js';
import { cn } from '@/lib/utils.js';
import { getFeaturedProducts, Product } from '@/utils/mockData.js';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products] = useState<Product[]>(getFeaturedProducts());
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);

  // Animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    // Create floating element animation
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();

      const floatingEl = document.createElement('div');
      floatingEl.className =
        'fixed z-50 bg-coral text-white rounded-full flex items-center justify-center w-8 h-8 text-sm font-bold';
      floatingEl.innerHTML = '1';
      floatingEl.style.transform = 'translate(-50%, -50%)';
      floatingEl.style.left = `${event.clientX}px`;
      floatingEl.style.top = `${event.clientY}px`;

      document.body.appendChild(floatingEl);

      // Animation
      const animation = floatingEl.animate(
        [
          {
            left: `${event.clientX}px`,
            top: `${event.clientY}px`,
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
          },
          {
            left: `${cartRect.left + cartRect.width / 2}px`,
            top: `${cartRect.top + cartRect.height / 2}px`,
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.5)',
          },
        ],
        {
          duration: 800,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
        }
      );

      animation.onfinish = () => {
        document.body.removeChild(floatingEl);
        toast.success(`${product.name} added to cart!`, {
          position: 'top-center',
          duration: 2000,
        });
      };
    }
  };

  const handleAddToWishlist = (product: Product) => {
    toast.success(`${product.name} added to wishlist!`, {
      position: 'top-center',
      duration: 2000,
    });
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

  const hoverVariants = {
    hover: {
      y: -5,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-blue-50/20 to-amber-50/20 dark:from-blue-950/20 dark:to-amber-950/20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <motion.span
              className="px-3 py-1 text-xs font-medium rounded-full bg-coral/10 text-coral mb-4 inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ delay: 0.1 }}
            >
              Featured Products
            </motion.span>
            <motion.h2
              className="heading-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              Discover Our <span className="text-coral">Top Picks</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              className="mt-4 md:mt-0 hover:bg-coral hover:text-white border-coral text-coral hover-3d"
              asChild
            >
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-border shadow-lg hover-3d h-full flex flex-col"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden p-4 flex justify-center flex-grow-0">
                <div className="w-[250px] h-[250px] relative">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />

                  {/* Discount Badge */}
                  {product.discount && product.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-coral text-white animate-pulse">
                      {product.discount}% OFF
                    </Badge>
                  )}

                  {/* Quick action buttons */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white rounded-full hover:bg-coral hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToWishlist(product);
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white rounded-full hover:bg-coral hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product, e);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Link to={`/products/${product.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white rounded-full hover:bg-coral hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                  <div className="ml-auto flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs ml-1 text-muted-foreground">{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-medium text-lg line-clamp-1 mb-1 group-hover:text-coral transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {product.description}
                </p>

                {/* Price and CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    {product.discount && product.discount > 0 ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-coral">
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        <span className="text-sm line-through text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-lg text-coral">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Link to={`/products/${product.id}`}>
                    <Button className="bg-coral text-white hover-3d">View Details</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          <Link to="/products">
            <Button className="bg-gradient-to-r from-coral to-orange-500 hover:from-coral/90 hover:to-orange-500/90 text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 uppercase hover-3d">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;
