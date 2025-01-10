import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import dummy from "../lib/data/itemListing.json";

// Types
interface Vendor {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
  password: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  isADonor?: boolean;
  email?: string;
  registeredAt?: Date;
  donationCount?: number;
  description?: string;
}

interface Item {
  itemName: string;
  expirationDate: string;
  price: number;
}

interface Listing {
  vendor: Vendor;
  items: Item[];
  bulkExpirationDate: string;
  createdAt: string;
  updatedAt: string;
}

const Discount: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        // Transform dummy data into the Listing format
        const listingsData: Listing[] = dummy.map((data) => ({
          vendor: {
            ...data.vendor,
            registeredAt: new Date(data.vendor.registeredAt),
          },
          items: data.items,
          bulkExpirationDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));

        setListings(listingsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch listings"
        );
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  // Add safety check before rendering
  if (!Array.isArray(listings)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Invalid data format received</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Discounts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No listings available
          </p>
        ) : (
          listings.map((listing, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold">{listing.vendor.name}</h2>
                  {listing.vendor.isADonor && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Donor
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {listing.vendor.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Vendor Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{listing.vendor.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">
                        {listing.vendor.phoneNumber}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{listing.vendor.email}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Available Items:</h3>
                    <div className="space-y-2">
                      {listing.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{item.itemName}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(item.expirationDate)}
                            </div>
                          </div>
                          <div className="flex flex-col ">
                            <p className=" text-green-500">50% off</p>
                            <p className="font-semibold">
                              ₹{(item.price / 2).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bulk Expiration */}
                  <div className="text-sm text-gray-500 mt-2">
                    Bulk expiration: {formatDate(listing.bulkExpirationDate)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Discount;
