import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import { Input } from '@/components/ui/input.js';
import { useNewsletter } from '@/hooks/useNewsletter.js';

// بيانات يمكن استيرادها من ملف خارجي لتسهيل التعديل
const footerLinks = [
  { title: 'Home', path: '/' },
  { title: 'Products', path: '/products' },
  { title: 'Stores', path: '/stores' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact Us', path: '/contact' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Careers', path: '/careers' },
];

const socialLinks = [
  { icon: Facebook, url: 'https://facebook.com/localconnect' },
  { icon: Twitter, url: 'https://twitter.com/localconnect' },
  { icon: Instagram, url: 'https://instagram.com/localconnect' },
  { icon: Youtube, url: 'https://youtube.com/localconnect' },
];

const policies = [
  { title: 'Privacy Policy', path: '/privacy-policy' },
  { title: 'Terms of Service', path: '/terms-of-service' },
  { title: 'Shipping Policy', path: '/shipping-policy' },
];

const Footer = () => {
  const { email, setEmail, handleSubmit, isLoading, isSuccess } = useNewsletter();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link
              to="/"
              className="font-display text-2xl font-bold flex items-center hover:opacity-90 transition-opacity"
              aria-label="LocalConnect Home"
            >
              <span className="text-primary">Local</span>
              <span className="text-gold-500">Connect</span>
            </Link>

            <p className="text-muted-foreground leading-relaxed">
              Connecting local stores with customers through a modern shopping experience and
              reliable delivery service.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.icon.displayName} page`}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Contact Us</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Market Street, Suite 456
                  <br />
                  City Center, Country
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a
                  href="tel:+12345678900"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a
                  href="mailto:support@localconnect.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  support@localconnect.com
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Newsletter</h3>
            <p className="text-muted-foreground leading-relaxed">
              Subscribe to our newsletter to receive updates and special offers.
            </p>

            {isSuccess ? (
              <div className="bg-primary/10 text-primary p-3 rounded-md text-sm">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-muted/50 flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isLoading} className="shrink-0">
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-border my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} LocalConnect. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {policies.map((policy) => (
              <Link
                key={policy.title}
                to={policy.path}
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {policy.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
