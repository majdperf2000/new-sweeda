import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/ui/page-transition';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        // Redirect to order confirmation
        window.location.href = '/order-tracking';
      }, 2000);
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-2 mb-8">Checkout</h1>

            <div className="mb-10">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center ${
                      i <= step ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        i <= step ? 'bg-primary text-white' : 'bg-muted'
                      }`}
                    >
                      {i}
                    </div>
                    <span className="text-sm">
                      {i === 1 ? 'Shipping' : i === 2 ? 'Payment' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute h-1 bg-muted top-0 left-0 right-0">
                  <div
                    className="h-1 bg-primary transition-all"
                    style={{ width: `${(step - 1) * 50}%` }}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>
                    {step === 1
                      ? 'Shipping Information'
                      : step === 2
                        ? 'Payment Method'
                        : 'Order Summary'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input id="zipCode" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" defaultValue="United States" required />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on card</Label>
                        <Input id="cardName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-accent p-4">
                        <h3 className="font-medium mb-2">Order Items</h3>
                        <div className="space-y-3">
                          {[
                            'Premium Leather Jacket',
                            'Designer Sunglasses',
                            'Handcrafted Watch',
                          ].map((item, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{item}</span>
                              <span>${(i + 1) * 199.99}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>$699.97</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>$56.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>$755.97</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button type="submit" className="ml-auto">
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isProcessing} className="ml-auto">
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Complete Order'
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Checkout;
