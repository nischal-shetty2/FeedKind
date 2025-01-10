import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Utensils,
  Building2,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  inView: boolean;
}

const CountUpNumber = ({
  end,
  duration = 2000,
  inView,
}: CountUpNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        setCount(Math.floor(percentage * end));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, inView]);

  return <span>{count.toLocaleString()}</span>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const impactData = [
    { month: "Jan", donations: 2100 },
    { month: "Feb", donations: 3400 },
    { month: "Mar", donations: 4200 },
    { month: "Apr", donations: 5600 },
    { month: "May", donations: 6800 },
    { month: "Jun", donations: 8200 },
    { month: "Jul", donations: 10000 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with enhanced animations */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-r from-green-50 via-emerald-50 to-green-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            className="max-w-3xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Surplus into
              <motion.span
                className="text-green-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {" "}
                Hope
              </motion.span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join our mission to reduce food waste and fight hunger. We connect
              food donors with food banks, making a real difference in
              communities across the nation.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/signup")}
              >
                Start Donating Today
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/signup")}
              >
                Join as Food Bank
                <Heart className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section with Stagger Animation */}
      <motion.div
        className="bg-white py-16 -mt-8"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: 10000,
                label: "Meals Donated",
                icon: <Utensils className="h-6 w-6 text-green-600" />,
              },
              {
                number: 500,
                label: "Active Donors",
                icon: <Building2 className="h-6 w-6 text-green-600" />,
              },
              {
                number: 200,
                label: "Food Banks Served",
                icon: <Heart className="h-6 w-6 text-green-600" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <motion.div
                  className="flex items-center justify-center mb-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold text-green-600 mb-2 text-center">
                  <CountUpNumber end={stat.number} inView={isVisible} />+
                </div>
                <div className="text-gray-600 text-center">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Impact Graph Section with Animation */}
      <motion.div
        className="bg-white py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Growing Impact
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impactData}>
                <XAxis dataKey="month" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="donations"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: "#059669" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Search Section with Enhanced Animation */}
      <motion.div
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="max-w-2xl mx-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <motion.input
              type="text"
              placeholder="Search for available food donations in your area..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg"
              initial={{ width: "80%" }}
              whileFocus={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </motion.div>
      </motion.div>

      {/* How It Works Section with Enhanced Animations */}
      <motion.div
        className="bg-gray-50 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="h-8 w-8 text-green-600" />,
                title: "List Surplus Food",
                description:
                  "Easily list your surplus food items with just a few clicks.",
              },
              {
                icon: <Search className="h-8 w-8 text-green-600" />,
                title: "Find Available Donations",
                description:
                  "Browse and search for available donations in your area.",
              },
              {
                icon: <Utensils className="h-8 w-8 text-green-600" />,
                title: "Coordinate Collection",
                description:
                  "Connect and arrange food pickup through our platform.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{ rotateY: [0, 360] }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section with Enhanced Animation */}
      <motion.div
        className="bg-gradient-to-r from-green-600 to-emerald-600 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join our growing community of food donors and food banks working
            together to reduce waste and fight hunger.
          </p>
          <motion.button
            className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
