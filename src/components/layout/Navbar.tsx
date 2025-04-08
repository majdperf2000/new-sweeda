import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import { cn } from '@/lib/utils.js';
import { useIsMobile } from '@/hooks/use-mobile.js';
import { Badge } from '@/components/ui/Badge.js';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.js';
import { ThemeSwitcher } from '@/components/ui/theme-switcher.js';
import { NAV_ITEM_HOVER, BUTTON_CLICK, PAGE_TRANSITION } from '@/utils/enhanced-animations.js';
import MainNavigation from './MainNavigation.js';
import { useCart } from '@/hooks/use-cart.js';
import { useAuth } from '@/hooks/use-auth.js';
import { debounce } from 'lodash-es';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { cartItems } = useCart();
  const { isAuthenticated, user } = useAuth();

  // Debounced scroll handler
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 10);
    }, 50);

    window.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowSearchBar(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Stores', path: '/stores' },
    { name: 'Stores Map', path: '/stores/map' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const authLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Order Tracking', path: '/orders' },
      ]
    : [];

  const allLinks = [...navLinks, ...authLinks];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md',
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-md py-2' : 'bg-transparent py-4',
        'supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-gray-900/80'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={cn(
            'font-display text-2xl font-bold flex items-center transition-all duration-300',
            isScrolled ? 'scale-90' : 'scale-100',
            BUTTON_CLICK
          )}
          aria-label="VIStore Home"
        >
          <span className="text-primary">VI</span>
          <span className="text-gold-500">Store</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && <MainNavigation />}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Bar (desktop) */}
          {showSearchBar && !isMobile ? (
            <form onSubmit={handleSearch} className="animate-fade-in">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-4 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </form>
          ) : (
            !isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(BUTTON_CLICK)}
                      onClick={toggleSearchBar}
                      aria-label="Search"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          )}

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Notifications */}
          {isAuthenticated && (
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn('relative', BUTTON_CLICK)}
                        aria-label="Notifications"
                      >
                        <Bell className="h-5 w-5" />
                        {notificationCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 bg-primary text-white text-xs h-5 w-5 flex items-center justify-center">
                            {notificationCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 font-medium border-b">Notifications</div>
                <div className="py-2 max-h-[300px] overflow-auto">
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="font-medium">New order received</div>
                    <div className="text-xs text-muted-foreground">10 minutes ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="font-medium">Inventory alert: Product running low</div>
                    <div className="text-xs text-muted-foreground">1 hour ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="font-medium">New customer registered</div>
                    <div className="text-xs text-muted-foreground">3 hours ago</div>
                  </DropdownMenuItem>
                </div>
                <div className="p-2 border-t text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn('w-full', BUTTON_CLICK)}
                    onClick={() => setNotificationCount(0)}
                  >
                    Mark all as read
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Shopping Cart */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/cart" aria-label="Shopping Cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn('relative cart-icon', BUTTON_CLICK)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#00FF88] text-[#1A1A1A] text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Shopping Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Auth Button */}
          <Link to={isAuthenticated ? '/dashboard' : '/auth'}>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'hidden md:flex bg-gradient-to-r from-[#2A6DFF] to-[#00FF88] hover:opacity-90 text-white border-0',
                'transform transition-all duration-300',
                isScrolled ? 'scale-90' : 'scale-100',
                BUTTON_CLICK
              )}
            >
              <User className="mr-2 h-4 w-4" />
              {isAuthenticated ? user.name.split(' ')[0] : 'Sign In'}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={BUTTON_CLICK}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 px-6 animate-slide-down">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-4 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </form>

          <nav className="flex flex-col space-y-4">
            {allLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-foreground/80 hover:text-primary transition-colors duration-200 py-2',
                  location.pathname === link.path && 'text-primary font-medium',
                  `animate-fade-in delay-${index * 50}`
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to={isAuthenticated ? '/dashboard' : '/auth'}>
              <Button className={cn('w-full mt-2', BUTTON_CLICK)}>
                <User className="mr-2 h-4 w-4" />
                {isAuthenticated ? 'My Account' : 'Sign In'}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
