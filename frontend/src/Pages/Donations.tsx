import React, { useState, useEffect } from "react";
import { Listing } from "../lib/types";
import axios from "axios";
import { ListingCard } from "../components/ui/VendorInfo";

type DonationType = "foodbank" | "expired";

const Toggle: React.FC<{
  selected: DonationType;
  onToggle: (type: DonationType) => void;
}> = ({ selected, onToggle }) => {
  return (
    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg w-fit">
      <button
        onClick={() => onToggle("foodbank")}
        className={`px-4 py-2 rounded-md transition-all ${
          selected === "foodbank"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}>
        Food Banks
      </button>
      <button
        onClick={() => onToggle("expired")}
        className={`px-4 py-2 rounded-md transition-all ${
          selected === "expired"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}>
        Composters
      </button>
    </div>
  );
};

const Donations: React.FC = () => {
  const [donationType, setDonationType] = useState<DonationType>("foodbank");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const endpoint =
          donationType === "foodbank"
            ? "/listing/foodbank"
            : "/listing/expired";

        const response = await axios.get<Listing[]>(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setListings(response.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch listings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [donationType]); // Refetch when donation type changes

  const handleToggle = (type: DonationType) => {
    setDonationType(type);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Donations</h1>
        <Toggle selected={donationType} onToggle={handleToggle} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">{error}</div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Description based on type */}
          <div className="mb-6">
            {donationType === "foodbank" ? (
              <p className="text-gray-600">
                Food banks accepting donations of unexpired food items. Help
                reduce food waste and support those in need.
              </p>
            ) : (
              <p className="text-gray-600">
                Composting facilities accepting expired food items. Turn food
                waste into valuable compost.
              </p>
            )}
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-8">
                No {donationType === "foodbank" ? "food banks" : "composters"}{" "}
                available at the moment
              </p>
            ) : (
              listings.map((listing, index) => (
                <ListingCard
                  key={`${listing.vendorId._id}-${index}`}
                  listing={listing}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Donations;
