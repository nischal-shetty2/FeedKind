import { useState, useEffect } from "react";
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
import { useInView } from "react-intersection-observer";
import Button from "../components/ui/button";

const CountUpNumber = ({
  end,
  duration = 2000,
  inView,
}: {
  end: number;
  duration?: number;
  inView: boolean;
}) => {
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

const HomePage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      {/* Hero Section with animated gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 animate-gradient-x">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Surplus into
                <span className="text-green-600"> Hope</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our mission to reduce food waste and fight hunger. We
                connect food donors with food banks, making a real difference in
                communities across the nation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all">
                  Start Donating Today
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="hover:bg-green-50 transform hover:scale-105 transition-all">
                  Join as Food Bank
                  <Heart className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Moved Up */}
      <div ref={ref} className="bg-white py-16 -mt-8">
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
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2 text-center">
                  <CountUpNumber end={stat.number} inView={inView} />+
                </div>
                <div className="text-gray-600 text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Graph Section */}
      <div className="bg-white py-16">
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
      </div>

      {/* Search Section with Animation */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto transform hover:scale-105 transition-all">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for available food donations in your area..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* How It Works Section with Hover Effects */}
      <div className="bg-gray-50 py-16">
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
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Animation */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join our growing community of food donors and food banks working
            together to reduce waste and fight hunger.
          </p>
          <Button className="bg-white text-green-600 hover:bg-green-50 transform hover:scale-105 transition-all">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
