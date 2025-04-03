import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Share2, ChevronLeft, Check, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageTransition } from '@/components/ui/page-transition';
import MainLayout from '@/components/layout/MainLayout';
import { products } from '@/utils/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/products"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="aspect-square overflow-hidden rounded-2xl glass-card p-6"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${index === 0 ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img
                      src={product.image}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="badge badge-secondary mb-3">{product.category}</div>
                <h1 className="heading-2 mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating ? 'text-amber-500' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
                <p className="paragraph">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="badge badge-primary">
                    {Math.round(100 - (product.price / product.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Color: <span className="text-foreground">{selectedColor}</span>
                  </h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          selectedColor === color ? 'border-primary' : 'border-border'
                        }`}
                        aria-label={`Select ${color} color`}
                      >
                        <span className="sr-only">{color}</span>
                        <span
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        {selectedColor === color && (
                          <Check className="absolute h-3 w-3 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Size: <span className="text-foreground">{selectedSize}</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 min-w-10 px-3 rounded-md flex items-center justify-center ${
                          selectedSize === size
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border border-input'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quantity:</h3>
                <div className="flex items-center space-x-3">
                  <div className="inline-flex items-center rounded-md border border-input overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="h-10 w-10 flex items-center justify-center border-r border-input text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="h-10 w-12 flex items-center justify-center">{quantity}</div>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10 flex items-center justify-center border-l border-input text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">{product.stock} available</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <Button size="lg" className="flex-1 min-w-40">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-dashed pt-6">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Free shipping for orders over $100</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>30-day hassle-free returns</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <div className="mt-6 glass-card p-8">
                <TabsContent value="features" className="space-y-4">
                  <h3 className="heading-3 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features?.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <div className="mr-3 h-5 w-5 text-primary flex-shrink-0">✦</div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications">
                  <h3 className="heading-3 mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Dimensions</span>
                        <span className="text-muted-foreground">12.5 x 8.5 x 0.6 cm</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Weight</span>
                        <span className="text-muted-foreground">250g</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Material</span>
                        <span className="text-muted-foreground">Aluminum, Glass</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Connectivity</span>
                        <span className="text-muted-foreground">Bluetooth 5.2, Wi-Fi</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Battery Life</span>
                        <span className="text-muted-foreground">Up to 24 hours</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Warranty</span>
                        <span className="text-muted-foreground">1 year limited</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <h3 className="heading-3 mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {[
                      {
                        name: 'Alex Johnson',
                        date: 'June 12, 2023',
                        rating: 5,
                        comment:
                          'Absolutely love this product! The quality is exceptional and it exceeded all my expectations. Highly recommend to anyone looking for premium quality.',
                      },
                      {
                        name: 'Sam Taylor',
                        date: 'May 28, 2023',
                        rating: 4,
                        comment:
                          'Great product overall. Sleek design and works as advertised. The only small issue is that the battery life could be a bit better, but otherwise perfect.',
                      },
                      {
                        name: 'Jordan Smith',
                        date: 'April 15, 2023',
                        rating: 5,
                        comment:
                          'Worth every penny! The attention to detail is remarkable and the performance is outstanding. Shipping was also super fast.',
                      },
                    ].map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-border pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-amber-500' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Related Products */}
          <section className="mt-24">
            <h2 className="heading-2 mb-8">You may also like</h2>
            <div className="product-grid">
              {products.slice(2, 5).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="glass-card glass-card-hover overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default ProductDetail;
