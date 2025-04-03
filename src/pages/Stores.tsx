import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';

const Stores = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock store data
  const stores = [
    {
      id: 1,
      name: 'élite - New York SoHo',
      address: '123 Broadway, New York, NY 10013',
      phone: '(212) 555-1234',
      hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
      image:
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2200&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'élite - Los Angeles',
      address: '456 Rodeo Drive, Beverly Hills, CA 90210',
      phone: '(310) 555-5678',
      hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-6pm',
      image:
        'https://images.unsplash.com/photo-1555519735-a3033909aa7c?q=80&w=2187&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'élite - Chicago',
      address: '789 Michigan Avenue, Chicago, IL 60611',
      phone: '(312) 555-9012',
      hours: 'Mon-Sat: 9am-8pm, Sun: 11am-5pm',
      image:
        'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=2148&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'élite - Miami',
      address: '321 Collins Avenue, Miami Beach, FL 33139',
      phone: '(305) 555-3456',
      hours: 'Mon-Sun: 10am-9pm',
      image:
        'https://images.unsplash.com/photo-1555529771-7888783a18d3?q=80&w=2187&auto=format&fit=crop',
    },
    {
      id: 5,
      name: 'élite - San Francisco',
      address: '555 Union Square, San Francisco, CA 94108',
      phone: '(415) 555-7890',
      hours: 'Mon-Sat: 10am-8pm, Sun: 11am-7pm',
      image:
        'https://images.unsplash.com/photo-1465151602455-1fb7cb8cfe8b?q=80&w=2187&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'élite - Seattle',
      address: '888 Pine Street, Seattle, WA 98101',
      phone: '(206) 555-2345',
      hours: 'Mon-Sat: 9am-7pm, Sun: 10am-6pm',
      image:
        'https://images.unsplash.com/photo-1509650926597-c72207c4078f?q=80&w=2187&auto=format&fit=crop',
    },
  ];

  // Filter stores based on search query
  const filteredStores = searchQuery
    ? stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stores;

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-2 mb-4">Our Stores</h1>
            <p className="paragraph mb-8">
              Visit one of our élite locations and experience our products in person. Our
              knowledgeable staff is ready to assist you with personalized recommendations.
            </p>

            <div className="mb-8 flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by location or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button asChild>
                <Link to="/stores-map">View Map</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStores.map((store) => (
                <Card key={store.id} className="glass-card overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{store.name}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex">
                        <MapPin className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex">
                        <Clock className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                        <span>{store.hours}</span>
                      </div>
                      <div className="flex">
                        <Phone className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                        <span>{store.phone}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button variant="outline" asChild>
                        <a href={`tel:${store.phone.replace(/[^0-9]/g, '')}`}>Call Store</a>
                      </Button>
                      <Button variant="ghost" asChild className="text-primary">
                        <Link to={`/stores-map?store=${store.id}`}>
                          Get Directions <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStores.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No stores found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any stores matching your search criteria.
                </p>
                <Button onClick={() => setSearchQuery('')}>View All Stores</Button>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Stores;
