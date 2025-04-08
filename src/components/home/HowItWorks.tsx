import { useRef, useEffect, useState } from 'react';
import { Search, ShoppingCart, Truck, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { FADE_IN, DELAY_100, DELAY_200, DELAY_300 } from '@/utils/nhanced-animationse.ts';
import { Button } from '@/components/ui/button.js';

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Intersection observer for scroll animations
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.how-it-works-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
                card.classList.remove('opacity-0');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Glow effect for hovered cards
  useEffect(() => {
    const cards = document.querySelectorAll('.how-it-works-card');
    cards.forEach((card, index) => {
      const glow = card.querySelector('.card-glow');

      card.addEventListener('mouseenter', () => {
        setHoveredCard(index);
        if (glow) {
          glow.classList.add('opacity-100');
          glow.classList.remove('opacity-0');
        }
      });

      card.addEventListener('mouseleave', () => {
        setHoveredCard(null);
        if (glow) {
          glow.classList.remove('opacity-100');
          glow.classList.add('opacity-0');
        }
      });
    });
  }, []);

  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Search & Discover',
      description:
        'Explore thousands of products from local stores with our intuitive search and smart filters.',
      color: 'from-blue-400 to-cyan-400',
      action: 'Browse Stores',
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: 'Easy Checkout',
      description:
        'Securely add items to your cart and complete your purchase in just a few clicks.',
      color: 'from-purple-400 to-pink-400',
      action: 'View Cart',
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Fast Delivery',
      description:
        'Get your items delivered quickly or choose convenient pickup options from nearby stores.',
      color: 'from-amber-400 to-orange-400',
      action: 'Track Order',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-400 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-full bg-cyan-100/70 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300 mb-4 inline-block',
              FADE_IN
            )}
          >
            Simple Process
          </span>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white',
              FADE_IN,
              DELAY_100
            )}
          >
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Works
            </span>
          </h2>
          <p
            className={cn(
              'text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto',
              FADE_IN,
              DELAY_200
            )}
          >
            Our seamless platform connects you with local businesses in just a few simple steps
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                'how-it-works-card opacity-0 transform translate-y-10 transition-all duration-700',
                'hover:scale-[1.02] hover:shadow-xl transition-transform duration-300',
                'relative group'
              )}
            >
              {/* Glow effect */}
              <div
                className={cn(
                  'card-glow absolute inset-0 rounded-xl opacity-0',
                  'bg-gradient-to-br transition-opacity duration-500',
                  step.color,
                  'blur-md -z-10'
                )}
              ></div>

              {/* Main card */}
              <div
                className={cn(
                  'h-full bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700/50',
                  'shadow-sm hover:shadow-lg transition-shadow duration-300',
                  'flex flex-col items-center text-center relative overflow-hidden'
                )}
              >
                {/* Step indicator */}
                <div
                  className={cn(
                    'absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center',
                    'bg-gradient-to-br text-white font-bold text-sm',
                    step.color
                  )}
                >
                  {index + 1}
                </div>

                {/* Animated icon */}
                <div
                  className={cn(
                    'mb-6 p-5 rounded-2xl relative transition-all duration-500',
                    'bg-gradient-to-br shadow-lg',
                    step.color,
                    hoveredCard === index ? 'rotate-6 scale-110' : ''
                  )}
                >
                  {step.icon}
                  <div className="absolute inset-0 rounded-2xl opacity-30 bg-current blur-lg -z-10"></div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {step.description}
                </p>

                <Button
                  variant="link"
                  className={cn(
                    'px-0 text-sm font-medium group-hover:text-cyan-500 transition-colors',
                    'flex items-center gap-1 text-gray-500 dark:text-gray-400'
                  )}
                >
                  {step.action}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className={cn('mt-20 text-center', FADE_IN, DELAY_300)}>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Ready to experience local shopping reimagined?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-gray-300 dark:border-gray-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
