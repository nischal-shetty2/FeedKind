import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Utensils, Building2, Heart, ArrowUpRight, TrendingUp, Search } from "lucide-react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useNavigate } from "react-router-dom";  // Import useNavigate

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
  const [selectedMetric, setSelectedMetric] = useState<keyof typeof metrics>('donations');
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const impactData = [
    { month: "Jan", donations: 2100, recipients: 1890, efficiency: 95 },
    { month: "Feb", donations: 3400, recipients: 3128, efficiency: 97 },
    { month: "Mar", donations: 4200, recipients: 3906, efficiency: 93 },
    { month: "Apr", donations: 5600, recipients: 5320, efficiency: 98 },
    { month: "May", donations: 6800, recipients: 6460, efficiency: 96 },
    { month: "Jun", donations: 8200, recipients: 7790, efficiency: 94 },
    { month: "Jul", donations: 10000, recipients: 9500, efficiency: 99 },
  ];

  const metrics = {
    donations: {
      label: "Total Donations",
      color: "#059669",
      value: "10,000+",
      growth: "+47%",
      description: "Monthly food donations across all partners"
    },
    recipients: {
      label: "Recipients Reached",
      color: "#0284c7",
      value: "9,500+",
      growth: "+42%",
      description: "People receiving food assistance monthly"
    },
    efficiency: {
      label: "Distribution Efficiency",
      color: "#7c3aed",
      value: "99%",
      growth: "+4%",
      description: "Success rate of food distribution"
    }
  };

  return (
    <div className="min-h-screen bg-green-50">

      {/* Hero Section with Background */}
      <motion.div
  className="relative overflow-hidden bg-[url('https://wishesandblessings.net/public/images/food_all.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black/10 before:backdrop-blur-sm before:shadow-3xl"
  initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-olive-900/70 via-olive-800/60 to-olive-700/50 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4)" />
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            className="max-w-3xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Surplus into
              <span className="text-green-400"> Hope</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
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
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")} // Add the redirection
              >
                Start Donating Today
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 flex items-center justify-center font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")} // Add the redirection
              >
                Join as Food Bank
                <Heart className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
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
                icon: <Utensils className="h-6 w-7 text-green-600" />,
              },
              {
                number: 500,
                label: "Active Donors",
                icon: <Building2 className="h-6 w-7 text-green-600" />,
              },
              {
                number: 200,
                label: "Food Banks Served",
                icon: <Heart className="h-6 w-7 text-green-600" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-50 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2 text-center">
                  <CountUpNumber end={stat.number} inView={isVisible} />+
                </div>
                <div className="text-gray-600 text-center font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Impact Graph Section */}
      <motion.div
        className="bg-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              className="lg:w-1/3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8">Impact Metrics</h2>
              <div className="space-y-6">
                {Object.entries(metrics).map(([key, metric]) => (
                  <motion.div
                    key={key}
                    className={`p-6 rounded-xl cursor-pointer transition-all ${
                      selectedMetric === key ? 'bg-gray-50 shadow-md' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedMetric(key as keyof typeof metrics)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{metric.label}</h3>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{metric.growth}</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <p className="text-gray-600 text-sm">{metric.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:w-2/3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={impactData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metrics[selectedMetric].color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={metrics[selectedMetric].color} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#374151" />
                    <YAxis stroke="#374151" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke={metrics[selectedMetric].color}
                      fillOpacity={1}
                      fill="url(#colorGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        className="bg-green-50 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
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
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-50 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="bg-gradient-to-r from-green-600 to-green-800 py-20"
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
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <motion.div
            className="flex justify-center gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
            >
              Donate Now
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 flex items-center justify-center font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
            >
              Join as Food Bank
              <Heart className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
