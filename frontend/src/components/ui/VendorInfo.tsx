// VendorInfo.tsx
import { MapPin, Phone, Mail } from "lucide-react";

interface VendorInfoProps {
  vendor: Vendor;
}

export const VendorInfo: React.FC<VendorInfoProps> = ({ vendor }) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <MapPin className="w-4 h-4" />
      <span className="text-sm">{vendor.address}</span>
    </div>
    <div className="flex items-center space-x-2">
      <Phone className="w-4 h-4" />
      <span className="text-sm">{vendor.phoneNumber}</span>
    </div>
    <div className="flex items-center space-x-2">
      <Mail className="w-4 h-4" />
      <span className="text-sm">{vendor.email}</span>
    </div>
  </div>
);

// ListingCard.tsx
import { useState } from "react";
import { Modal } from "./Modal";
import { Listing, Vendor } from "../../lib/types";
import { Card, CardContent, CardHeader } from "./Card";
import { ItemList } from "../ItemList";
interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Card className="relative">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{listing.vendor.name}</h2>
            {listing.vendor.isADonor && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Donor
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{listing.vendor.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <VendorInfo vendor={listing.vendor} />
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Available Items:</h3>
              <ItemList items={listing.items} />
              {listing.items.length > 3 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-2 py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors">
                  View All {listing.items.length} Items
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Deadline: {formatDate(listing.bulkExpirationDate)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{listing.vendor.name}</h2>
            {listing.vendor.isADonor && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Donor
              </span>
            )}
          </div>
          <p className="text-gray-500">{listing.vendor.description}</p>
          <VendorInfo vendor={listing.vendor} />
          <div>
            <h3 className="font-semibold text-lg mb-3">All Available Items</h3>
            <ItemList items={listing.items} showAll={true} />
          </div>
          <div className="text-sm text-gray-500">
            Deadline: {formatDate(listing.bulkExpirationDate)}
          </div>
        </div>
      </Modal>
    </>
  );
};
