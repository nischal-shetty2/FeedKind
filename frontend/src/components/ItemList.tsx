// ItemList.tsx
import { Calendar } from "lucide-react";
import { Item } from "../lib/types";
import { DonationType } from "../Pages/Donations";

interface ItemListProps {
  items: Item[];
  maxItems?: number;
  showAll?: boolean;
  donationType?: DonationType;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  maxItems = 3,
  showAll = false,
  donationType,
}) => {
  const displayItems = showAll ? items : items.slice(0, maxItems);
  const hasMoreItems = items.length > maxItems;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="space-y-2">
      {displayItems.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between items-center p-2 bg-gray-50 rounded
            ${
              !showAll && index === maxItems - 1 && hasMoreItems
                ? "opacity-70"
                : ""
            }`}>
          <div>
            <p className="font-medium">{item.itemName}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(item.expirationDate)}
            </div>
          </div>
          {!donationType && (
            <div className="flex flex-col items-end">
              <div>
                <p className="text-green-500">50% off</p>
                <p className="font-semibold">₹{(item.price / 2).toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      ))}
      {!showAll && hasMoreItems && (
        <button className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-2">
          +{items.length - maxItems} more items...
        </button>
      )}
    </div>
  );
};
