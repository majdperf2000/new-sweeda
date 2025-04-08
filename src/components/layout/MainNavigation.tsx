import * as React from 'react';
import { Link } from 'react-router-dom';
import { Home, Store, ShoppingCart, User, Map, Search } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.js';
import { cn } from '@/lib/utils.js';

const MainNavigation: React.FC = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            <Home className="h-4 w-4 mr-2" />
            <span>الرئيسية</span>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Store className="h-4 w-4 mr-2" />
            <span>المتاجر</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/stores"
                  >
                    <Store className="h-6 w-6 mb-2" />
                    <div className="mb-2 mt-4 text-lg font-medium">كل المتاجر</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      تصفح جميع المتاجر الشريكة وابحث عن منتجاتك المفضلة
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/stores"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">المتاجر الموصى بها</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      متاجر مختارة بناءً على تفضيلاتك السابقة
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/stores-map"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">المتاجر على الخريطة</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      عرض المتاجر القريبة منك على الخريطة التفاعلية
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/stores"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">جولة افتراضية</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      تجول داخل المتاجر افتراضيًا وتصفح المنتجات مباشرة
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/products" className={navigationMenuTriggerStyle()}>
            <span>المنتجات</span>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Map className="h-4 w-4 mr-2" />
            <span>البحث</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/stores"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">البحث عن متجر</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      ابحث عن المتاجر حسب الاسم أو الموقع
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/stores-map"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">المتاجر القريبة</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      اعثر على المتاجر في محيط 5 كم من موقعك
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li className="col-span-2">
                <NavigationMenuLink asChild>
                  <Link
                    to="/products"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">بحث المنتجات</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      ابحث عن المنتجات عبر جميع المتاجر بسرعة وسهولة
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/cart" className={navigationMenuTriggerStyle()}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span>السلة</span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
