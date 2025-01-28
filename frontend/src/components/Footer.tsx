import { 
  Sprout, 
  Users, 
  Globe, 
  Building2, 
  PackageSearch, 
  Recycle, 
  LineChart,
  HandHeart,
  Clock,
  Building,
  BookOpen
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Mission Column */}
          <div className="space-y-6 md:col-span-2">
            <h3 className="text-2xl font-semibold text-green-700">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              Committed to reducing food waste and fighting hunger through innovative technology solutions. Together, we can create a sustainable future where no food goes to waste and no one goes hungry.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <span className="text-green-600 font-medium">Impact:</span>
              <div className="flex flex-wrap gap-6">
                <span className="text-gray-600 flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-green-600" />
                  Reduced Waste
                </span>
                <span className="text-gray-600 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Community Support
                </span>
                <span className="text-gray-600 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Environmental Care
                </span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-green-700">Solutions</h3>
            <ul className="space-y-4">
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <Building2 className="h-5 w-5" />
                Food Bank Network
              </li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <PackageSearch className="h-5 w-5" />
                Inventory Management
              </li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <Recycle className="h-5 w-5" />
                Smart Composting
              </li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <LineChart className="h-5 w-5" />
                Donation Tracking
              </li>
            </ul>
          </div>

          {/* Get Involved Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-green-700">Get Involved</h3>
            <ul className="space-y-4">
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <HandHeart className="h-5 w-5" />
                Partner With Us
              </li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <Clock className="h-5 w-5" />
                Volunteer
              </li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <Building className="h-5 w-5" />
                Food Banks
              </li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer flex items-center gap-3 transition duration-200">
                <BookOpen className="h-5 w-5" />
                Resources
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-gray-600 text-sm">
              © 2025 FoodShare Network. Making a difference through technology.
            </div>
            <div className="flex space-x-6 md:justify-end">
              <span className="text-gray-600 text-sm hover:text-green-600 cursor-pointer transition duration-200">
                Privacy Policy
              </span>
              <span className="text-gray-600 text-sm hover:text-green-600 cursor-pointer transition duration-200">
                Terms of Service
              </span>
              <span className="text-gray-600 text-sm hover:text-green-600 cursor-pointer transition duration-200">
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
