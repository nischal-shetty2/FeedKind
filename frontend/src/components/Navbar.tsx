import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Discounts", href: "/discount" },
    { name: "List item", href: "/postitems" },
    { name: "About Us", href: "/about" },
    { name: "Login", href: "/login" },
  ];

  const handleRedirect = (url: string) => {
    window.location.href = url;
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}>
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <motion.a
                href="/"
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}>
                <img
                  src="/public/logo.png"
                  alt="Logo"
                  className="h-12 w-12 rounded-lg"
                />
                <span className="text-xl font-bold text-green-600">
                  FeedKind
                </span>
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}>
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition-transform"
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRedirect("/sighup")} // Redirect to signup
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className={`md:hidden ${isOpen ? "block" : "hidden"}`}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 1, height: "auto" },
              closed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2 }}>
            <div className="pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}>
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-medium"
                whileHover={{ scale: 1.05,rotate:0}}
                whileTap={{ scale: 0.90 }}
                onClick={() => handleRedirect("/login")}>
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
