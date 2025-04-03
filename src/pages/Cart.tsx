import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PageTransition } from '@/components/ui/page-transition';
import MainLayout from '@/components/layout/MainLayout';
import { products } from '@/utils/mockData';

// Mock cart items
const initialCartItems = [
  { product: products[0], quantity: 1 },
  { product: products[2], quantity: 1 },
  { product: products[4], quantity: 2 },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (productId: string, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <h1 className="heading-2 mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
              </div>
              <h3 className="heading-3 mb-4">Your cart is empty</h3>
              <p className="paragraph mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/products">
                  Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card p-6 mb-4 flex flex-col sm:flex-row gap-6"
                  >
                    <div className="w-full sm:w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between">
                        <div>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="font-medium hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.category}</p>
                        </div>
                        <div className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-6">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center rounded-md border border-input overflow-hidden">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, -1)}
                              className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <div className="h-8 w-8 flex items-center justify-center text-sm">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, 1)}
                              className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${item.product.price.toFixed(2)} each
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                  <Button variant="ghost" onClick={() => setCartItems([])}>
                    Clear Cart
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-card p-6">
                  <h3 className="heading-4 mb-6">Order Summary</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {shipping === 0 && (
                      <div className="text-sm text-green-600 bg-green-50 p-2 rounded text-center mt-2">
                        You've qualified for free shipping!
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button asChild className="w-full" size="lg">
                      <Link to="/checkout">
                        <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
                      </Link>
                    </Button>
                    <div className="text-xs text-center text-muted-foreground">
                      Secure payment processing. Your payment information is never stored.
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <h4 className="font-medium mb-2">Accepted Payment Methods</h4>
                  <div className="flex gap-2">
                    {['Visa', 'Mastercard', 'American Express', 'PayPal'].map((method) => (
                      <div key={method} className="text-xs px-2 py-1 bg-background rounded">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Cart;
