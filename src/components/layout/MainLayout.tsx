import React, { useState } from 'react';
import {
  LayoutDashboard,
  Store,
  Truck,
  ShoppingCart,
  User,
  Map,
  Menu,
  X,
  LogOut,
  AlertCircle,
  Home,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import MainNavigation from './MainNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`جاري البحث عن: ${searchQuery}`);
      // Implementation of search functionality would go here
      setSearchQuery('');
    }
  };

  const navLinks = [
    { text: 'الرئيسية', path: '/', icon: <Home className="h-4 w-4" /> },
    { text: 'المتاجر', path: '/stores', icon: <Store className="h-4 w-4" /> },
    { text: 'خريطة المتاجر', path: '/stores-map', icon: <Map className="h-4 w-4" /> },
    { text: 'السلة', path: '/cart', icon: <ShoppingCart className="h-4 w-4" /> },
    { text: 'تتبع الطلبات', path: '/order-tracking', icon: <Truck className="h-4 w-4" /> },
  ];

  // قائمة روابط لوحات التحكم
  const controlPanelsLinks = [
    {
      text: 'لوحة تحكم المالك',
      path: '/control-panels#2',
      icon: <LayoutDashboard className="h-4 w-4" />,
      notification: 5,
    },
    {
      text: 'لوحة تحكم المتاجر',
      path: '/control-panels#3',
      icon: <Store className="h-4 w-4" />,
      notification: 2,
    },
    {
      text: 'لوحة تحكم التوصيل',
      path: '/control-panels#4',
      icon: <Truck className="h-4 w-4" />,
      notification: 1,
    },
    {
      text: 'لوحة تحكم الأمان',
      path: '/control-panels#5',
      icon: <AlertCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-xl">
              <span className="hidden md:inline">سوبر ماركت</span>
              <span className="inline md:hidden">SM</span>
            </Link>

            {/* Desktop navigation */}
            <MainNavigation />
          </div>

          {/* Search Bar - Visible on all screens */}
          <form onSubmit={handleSearch} className="flex-1 mx-4 hidden md:flex">
            <div className="relative w-full max-w-md mx-auto">
              <Input
                type="search"
                placeholder="ابحث عن متجر أو منتج..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            {/* Cart Icon - Always visible */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full overflow-hidden w-8 h-8 outline-none ring-primary transition focus-visible:ring-2">
                  <div className="bg-muted h-full w-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center cursor-pointer w-full">
                      <LayoutDashboard className="ml-2 h-4 w-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth" className="flex items-center cursor-pointer w-full">
                      <LogOut className="ml-2 h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu trigger */}
            <button
              className="block md:hidden"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile search bar */}
      <div className="md:hidden border-b bg-background p-2">
        <form onSubmit={handleSearch} className="flex">
          <Input
            type="search"
            placeholder="ابحث عن متجر أو منتج..."
            className="w-full pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="ghost" size="icon" className="ml-1">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background shadow-sm">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
            <div className="border-t my-2 pt-2">
              <div className="text-sm font-medium px-3 py-1">لوحات التحكم</div>
              {controlPanelsLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center justify-between gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    toast.success(`تم الانتقال إلى ${link.text}`, {
                      description: 'يمكنك الوصول إلى جميع الأدوات من القائمة الجانبية',
                    });
                  }}
                >
                  <div className="flex items-center">
                    {link.icon}
                    <span className="mr-2">{link.text}</span>
                  </div>
                  {link.notification && (
                    <span className="h-5 min-w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center px-1">
                      {link.notification}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div>© 2023 سوبر ماركت. جميع الحقوق محفوظة.</div>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-foreground transition-colors">
              من نحن
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              اتصل بنا
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
