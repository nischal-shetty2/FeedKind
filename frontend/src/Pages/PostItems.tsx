import React, { useEffect, useState, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Trash2, Plus } from "lucide-react";
import axiosFetch from "../lib/axiosFetch";

interface Product {
  barcode: string;
  product_name: string;
  manufacture_date: string;
  expire_date: string;
  price: number;
}

interface ScannedItem {
  product_name: string;
  expire_date: string;
  manufacture_date?: string;
  price: number;
}

const productDatabase: Product[] = [
  {
    barcode: "8906090574372",
    product_name: "Too Yumm Boot Chips",
    manufacture_date: "2024-11-23",
    expire_date: "2025-03-22",
    price: 10,
  },
  {
    barcode: "8901491502030",
    product_name: "Lays",
    manufacture_date: "2024-12-30",
    expire_date: "2025-04-29",
    price: 10,
  },
  {
    barcode: "8901063092730",
    product_name: "good day cashew",
    manufacture_date: "2024-12-30",
    expire_date: "2025-04-29",
    price: 10,
  },
  {
    barcode: "7622202398698",
    product_name: "Dairy Milk",
    manufacture_date: "2024-10-01",
    expire_date: "2025-10-31",
    price: 20,
  },
  {
    barcode: "8901063092747",
    product_name: "Good Day Biscuit",
    manufacture_date: "2024-11-18",
    expire_date: "2025-05-18",
    price: 10,
  },
  {
    barcode: "8901491990219",
    product_name: "Doritos",
    manufacture_date: "2024-11-07",
    expire_date: "2025-04-21",
    price: 10,
  },
  {
    barcode: "8901063092730",
    product_name: "Good Day Cookies",
    manufacture_date: "2024-12-21",
    expire_date: "2025-05-20",
    price: 10,
  },
  {
    barcode: "8901123001214",
    product_name: "Lotte Choco Pie",
    manufacture_date: "2024-11-20",
    expire_date: "2025-11-19",
    price: 10,
  },
  {
    barcode: "8901491103329",
    product_name: "Kurkure",
    manufacture_date: "2024-12-07",
    expire_date: "2025-04-06",
    price: 10,
  },
];

const PostItems: React.FC = () => {
  const scannerRef = useRef<HTMLVideoElement>(null);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [bulkExpirationDate, setBulkExpirationDate] = useState<string>("");
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualItem, setManualItem] = useState({
    product_name: "",
    expire_date: "",
    manufacture_date: "",
    price: 0,
  });
  const [earliestExpiry, setEarliestExpiry] = useState<string>("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (scannedItems.length > 0) {
      const earliest = scannedItems.reduce(
        (earliest, item) =>
          item.expire_date < earliest ? item.expire_date : earliest,
        scannedItems[0].expire_date
      );
      setEarliestExpiry(earliest);
    } else {
      setEarliestExpiry("");
    }
  }, [scannedItems]);

  useEffect(() => {
    if (scannerRef.current) {
      const barcodeScanner = new BrowserMultiFormatReader();
      const scannedBarcodes = new Set<string>();

      barcodeScanner.decodeFromVideoDevice(
        null,
        scannerRef.current,
        (result) => {
          if (result) {
            const scannedBarcode = result.getText();
            if (!scannedBarcodes.has(scannedBarcode)) {
              const foundProduct = productDatabase.find(
                (product) => product.barcode === scannedBarcode
              );

              if (
                foundProduct &&
                !scannedItems.some(
                  (item) => item.product_name === foundProduct.product_name
                )
              ) {
                setScannedItems((prev) => [
                  ...prev,
                  {
                    product_name: foundProduct.product_name,
                    expire_date: foundProduct.expire_date,
                    manufacture_date: foundProduct.manufacture_date,
                    price: foundProduct.price,
                  },
                ]);
              }

              // Add to cooldown list and remove after 2 seconds
              scannedBarcodes.add(scannedBarcode);
              setTimeout(() => scannedBarcodes.delete(scannedBarcode), 2000);
            }
          }
        }
      );

      return () => {
        barcodeScanner.reset();
      };
    }
  }, [scannerRef.current, scannedItems]);

  const handleManualAdd = () => {
    console.log(manualItem.expire_date);
    console.log(manualItem.price);
    console.log(manualItem.product_name);
    if (manualItem.product_name && manualItem.expire_date && manualItem.price) {
      if (
        !scannedItems.some(
          (item) => item.product_name === manualItem.product_name
        )
      ) {
        setScannedItems((prev) => [...prev, { ...manualItem }]);
        setManualItem({
          product_name: "",
          expire_date: "",
          manufacture_date: "",
          price: 0,
        });
      }
    }
  };

  const removeItem = (index: number) => {
    setScannedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (scannedItems.length === 0) return;

    const vendorId = localStorage.getItem("userId");
    if (!vendorId) return;

    const payload = {
      items: scannedItems.map((item) => ({
        itemName: item.product_name,
        expirationDate: item.expire_date,
        price: item.price,
      })),
      bulkExpirationDate: bulkExpirationDate || earliestExpiry,
    };
    if (!token || !bulkExpirationDate) return;

    try {
      const response = await axiosFetch.post(
        `/listing/${vendorId}`,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { error } = response.data;

      if (error) {
        setScannedItems([]);
        setBulkExpirationDate("");
        throw new Error("failed to post");
      }
      console.log;
      window.location.href = "/discount";
    } catch (error) {
      console.error("Error posting items:", error);
    }
  };
  const offset = 5.5 * 60 * 60 * 1000;

  if (!token || !userId) {
    window.location.href = "/signup";
  }

  return (
    <div className="flex min-h-screen bg-gray-50 p-4 gap-4">
      {/* Left Section - Scanner */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Scan Items</h2>
        <video
          ref={scannerRef}
          className="w-full aspect-video object-cover rounded-lg mb-4"></video>

        <div className="mt-4">
          <button
            onClick={() => setIsManualEntry(!isManualEntry)}
            className="text-green-600 hover:text-green-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isManualEntry ? "Hide Manual Entry" : "Manual Entry"}
          </button>

          {isManualEntry && (
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={manualItem.product_name}
                onChange={(e) =>
                  setManualItem((prev) => ({
                    ...prev,
                    product_name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacture Date
              </label>
              <input
                name="mfd"
                type="date"
                placeholder="Manufacture Date (Optional)"
                value={manualItem.manufacture_date}
                onChange={(e) =>
                  setManualItem((prev) => ({
                    ...prev,
                    manufacture_date: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                placeholder="Expiry Date"
                value={manualItem.expire_date}
                onChange={(e) =>
                  setManualItem((prev) => ({
                    ...prev,
                    expire_date: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />

              <input
                type="number"
                placeholder="Price"
                value={manualItem.price}
                onChange={(e) =>
                  setManualItem((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />

              <button
                onClick={handleManualAdd}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Add Item
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Items List */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Scanned Items</h2>

        <div className="space-y-4 mb-6">
          {scannedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">{item.product_name}</h3>
                <p className="text-sm text-gray-600">
                  Expires: {item.expire_date}
                  {item.manufacture_date &&
                    ` | Manufactured: ${item.manufacture_date}`}
                </p>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-600">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {scannedItems.length > 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={bulkExpirationDate}
                onChange={(e) => {
                  setBulkExpirationDate(e.target.value);
                }}
                min={new Date(Date.now() + offset).toISOString().split("T")[0]}
                max={earliestExpiry}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <button
              onClick={handlePost}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              disabled={scannedItems.length === 0}>
              Post Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItems;
