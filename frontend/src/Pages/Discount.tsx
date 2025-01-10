// Modal.tsx
import React, { useEffect, useState } from "react";

// Discount.tsx
import { Listing } from "../lib/types";
import dummy from "../lib/data/itemListing.json";
import { ListingCard } from "../components/ui/VendorInfo";

const Discount: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

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
            <ListingCard key={index} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
};

export default Discount;
