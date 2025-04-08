import { useEffect } from "react";
import Hero from "@/components/home/Hero.js";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrowseStores from "@/components/home/BrowseStores";
import HowItWorks from "@/components/home/HowItWorks";
import DailyOffers from "@/components/home/DailyOffers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedProducts />
        <BrowseStores />
        <DailyOffers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;