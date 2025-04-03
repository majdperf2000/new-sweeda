import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/utils/mockData';

interface FeaturedProductProps {
  product: Product;
}

export const FeaturedProduct = ({ product }: FeaturedProductProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
    >
      <div className="space-y-6">
        <div>
          <div className="badge badge-secondary mb-3">{product.category}</div>
          <h2 className="heading-2">{product.name}</h2>
          <p className="paragraph mt-4">{product.description}</p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to={`/product/${product.id}`}>
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl aspect-square"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="absolute -bottom-5 -left-5 bg-background/90 backdrop-blur p-4 rounded-xl shadow-lg border border-border"
        >
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < product.rating ? 'text-amber-500' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
