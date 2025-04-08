import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import SearchBar from '@/components/ui/SearchBar.tsx';
import { cn } from '@/lib/utils.js';
import { DELAY_300, DELAY_400 } from '@/utils/enhanced-animations.js';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [animatedParticles, setAnimatedParticles] = useState<JSX.Element[]>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      const moveX = (x - 0.5) * 30;
      const moveY = (y - 0.5) * 30;

      heroRef.current.style.setProperty('--move-x', `${moveX}px`);
      heroRef.current.style.setProperty('--move-y', `${moveY}px`);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [
      statsRef.current,
      logoRef.current,
      ...Array.from(document.querySelectorAll('.animate-on-scroll')),
    ].filter(Boolean) as Element[];

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Generate animated particles (optimized)
  useEffect(() => {
    if (!isIntersecting) return;

    const particles = Array.from({ length: 20 }, (_, i) => {
      const size = Math.floor(Math.random() * 30) + 5;
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 80);
      const duration = Math.floor(Math.random() * 20) + 10;
      const delay = Math.floor(Math.random() * 10);
      const opacity = Math.random() * 0.5 + 0.1;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 animate-float"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
            opacity,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      );
    });

    setAnimatedParticles(particles);
  }, [isIntersecting]);

  // Scroll parallax effect (debounced)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!heroRef.current || !ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const parallaxSpeed = 0.5;

          heroRef.current!.style.backgroundPositionY = `${scrollY * parallaxSpeed}px`;

          const parallaxElements = document.querySelectorAll('[data-parallax]');
          parallaxElements.forEach((el) => {
            const element = el as HTMLElement;
            const speed = parseFloat(element.dataset.parallax || '0.5');
            element.style.transform = `translateY(${scrollY * speed}px)`;
          });

          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-[90vh] relative flex items-center justify-center overflow-hidden"
      style={
        {
          '--move-x': '0px',
          '--move-y': '0px',
          background:
            'radial-gradient(circle at 30% 50%, rgba(100, 200, 255, 0.2) 0%, rgba(0, 50, 100, 0.7) 70%)',
        } as React.CSSProperties
      }
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-indigo-900/80"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Animated particles */}
        {animatedParticles}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <div
          ref={logoRef}
          className={cn(
            'mb-8 bg-white/20 backdrop-blur-md p-6 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-on-scroll',
            FADE_IN,
            DELAY_100
          )}
          style={{
            transform: 'scale(1.5)',
            willChange: 'transform, opacity',
          }}
        >
          <h1 className="text-4xl font-poppins font-bold">
            <span className="text-white">VI</span>
            <span className="text-cyan-400">Store</span>
          </h1>
        </div>

        {/* Main heading */}
        <h1
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl text-white',
            FADE_IN,
            DELAY_200
          )}
          style={{
            transform: `translate(calc(var(--move-x) * -0.4), calc(var(--move-y) * -0.4))`,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            willChange: 'transform',
          }}
        >
          Discover amazing products from local businesses
        </h1>

        {/* Subheading */}
        <p className={cn('text-lg md:text-xl text-white/80 mb-8 max-w-2xl', FADE_IN, DELAY_300)}>
          Supporting your community has never been easier. Find unique items from shops near you.
        </p>

        {/* Search bar */}
        <div className={cn('w-full max-w-[600px] mb-12', FADE_IN, DELAY_300)}>
          <SearchBar
            className="shadow-xl rounded-xl bg-white/90 backdrop-blur-sm h-[60px] border border-white/30 focus-within:bg-white focus-within:shadow-lg transition-all duration-300"
            placeholder="Search for products, stores, or categories..."
          />
        </div>

        {/* CTA buttons */}
        <div className={cn('flex flex-wrap gap-4 justify-center', FADE_IN, DELAY_400)}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30 min-h-12 px-8"
          >
            Explore Stores
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transform transition-all duration-300 hover:scale-105 min-h-12 px-8"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 opacity-0 animate-on-scroll"
        >
          {[
            { label: 'Local Stores', value: '500+' },
            { label: 'Products', value: '10K+' },
            { label: 'Daily Orders', value: '2K+' },
            { label: 'Happy Customers', value: '25K+' },
          ].map((stat, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col items-center p-6 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:shadow-white/20 transition-all duration-500 hover:-translate-y-2',
                `delay-${i * 100 + 500}`
              )}
              style={{
                transitionDelay: `${i * 100 + 500}ms`,
                willChange: 'transform, opacity',
              }}
            >
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</span>
              <span className="text-sm text-white/80 tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        data-parallax="0.2"
      >
        <div className="w-10 h-16 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-2 h-3 bg-white/70 rounded-full mt-3 animate-[slideDown_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
