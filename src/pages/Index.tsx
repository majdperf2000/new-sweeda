import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Map, ShoppingCart, User, Search } from 'lucide-react';
import { products } from '@/utils/mockData';
import { PageTransition } from '@/components/ui/page-transition';
import MainLayout from '@/components/layout/MainLayout';
import { ProductCard } from '@/components/product/ProductCard';
import { FeaturedProduct } from '@/components/product/FeaturedProduct';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const featuredProduct = products[0];
  const topProducts = products.slice(1, 4);

  // متاجر يتم عرضها كمتاجر موصى بها
  const recommendedStores = [
    {
      id: 1,
      name: 'سوبر ماركت الميدان',
      address: 'شارع الملك عبدالله، حي الروضة',
      image:
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2200&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'هايبر باندا',
      address: 'شارع الأمير سلطان، حي الريان',
      image:
        'https://images.unsplash.com/photo-1555519735-a3033909aa7c?q=80&w=2187&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'كارفور',
      address: 'طريق الملك فهد، العليا',
      image:
        'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=2148&auto=format&fit=crop',
    },
  ];

  return (
    <MainLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="inline-block px-3 py-1 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full"
              >
                مرحبا بك في سوبر ماركت
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="heading-1 mb-6"
              >
                تسوق بكل سهولة من المتاجر القريبة منك
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="paragraph mb-8 max-w-2xl"
              >
                اكتشف مجموعة متنوعة من المنتجات عالية الجودة من متاجر محلية وعالمية. توصيل سريع وآمن
                إلى باب منزلك.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button asChild size="lg">
                  <Link to="/products">
                    تصفح المنتجات <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/stores">المتاجر القريبة</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Categories / Navigation Cards */}
        <section className="py-12 bg-accent/30">
          <div className="container mx-auto px-4">
            <h2 className="heading-2 mb-8 text-center">تصفح بسهولة</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">المتاجر</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    تصفح جميع المتاجر الشريكة وابحث عن منتجاتك المفضلة
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/stores">عرض المتاجر</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">المتاجر على الخريطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    عرض المتاجر القريبة منك على الخريطة التفاعلية
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/stores-map">عرض الخريطة</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">المنتجات</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    تصفح تشكيلة واسعة من المنتجات بأفضل الأسعار
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/products">تصفح المنتجات</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">حسابي</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    إدارة حسابك وتتبع طلباتك وعرض المشتريات السابقة
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard">لوحة التحكم</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recommended Stores Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="heading-2">المتاجر الموصى بها</h2>
                <p className="paragraph mt-2">متاجر مختارة بناءً على تفضيلاتك</p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/stores">
                  عرض الكل <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedStores.map((store) => (
                <Link to={`/stores?id=${store.id}`} key={store.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
                      <p className="text-muted-foreground">{store.address}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Product Section */}
        <section className="py-12 bg-accent/50">
          <div className="container mx-auto px-4">
            <h2 className="heading-2 mb-8 text-center">منتج مميز</h2>
            <FeaturedProduct product={featuredProduct} />
          </div>
        </section>

        {/* Top Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="heading-2">أبرز المنتجات</h2>
                <p className="paragraph mt-2">اكتشف أكثر المنتجات مبيعاً</p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/products">
                  عرض الكل <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-accent/50">
          <div className="container mx-auto px-4">
            <h2 className="heading-2 mb-8 text-center">لماذا سوبر ماركت؟</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'توصيل سريع',
                  description:
                    'خدمة توصيل سريعة إلى باب منزلك مع إمكانية تتبع طلبك في الوقت الحقيقي.',
                  icon: '🚚',
                },
                {
                  title: 'منتجات طازجة',
                  description: 'نقدم لك منتجات طازجة يومياً من أفضل الموردين المحليين.',
                  icon: '🥑',
                },
                {
                  title: 'خدمة عملاء متميزة',
                  description: 'فريق دعم جاهز لمساعدتك في أي وقت ومع أي استفسار.',
                  icon: '👨‍💼',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="glass-card p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="glass-card bg-primary/5 p-8 md:p-12 text-center max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="heading-2 mb-4"
              >
                هل أنت جاهز للتسوق؟
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="paragraph mb-8 max-w-2xl mx-auto"
              >
                انضم إلى مجتمع المتسوقين لدينا وكن أول من يعلم بالعروض الحصرية والمنتجات الجديدة.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Button asChild size="lg">
                  <Link to="/products">
                    تسوق الآن <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/stores-map">المتاجر القريبة</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </PageTransition>
    </MainLayout>
  );
};

export default Index;
