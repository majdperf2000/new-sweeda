import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { LayoutDashboard, Store, Truck, ShoppingCart, Map, Home } from 'lucide-react';
import { toast } from 'sonner';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`جاري البحث عن: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-4"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark"
            >
              Search
            </button>
          </form>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile search bar */}
      <div className="md:hidden border-b bg-background p-2">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-3 py-2 rounded-r-md hover:bg-primary-dark"
          >
            Search
          </button>
        </form>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background shadow-sm">
          <nav className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              <a href="/" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
                <Home className="h-4 w-4 mr-2" />
                الرئيسية
              </a>
              <a
                href="/stores"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <Store className="h-4 w-4 mr-2" />
                المتاجر
              </a>
              <a
                href="/stores-map"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <Map className="h-4 w-4 mr-2" />
                خريطة المتاجر
              </a>
              <a href="/cart" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
                <ShoppingCart className="h-4 w-4 mr-2" />
                السلة
              </a>
              <a
                href="/order-tracking"
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <Truck className="h-4 w-4 mr-2" />
                تتبع الطلبات
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 My Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
