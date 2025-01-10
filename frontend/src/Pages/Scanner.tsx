import { useEffect, useState, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

interface Order {
  _id: string;
  orderNo: string;
  items: {
    id: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

const Scanner: React.FC = () => {
  const scannerRef = useRef<HTMLVideoElement>(null);
  const [scanned, setScanned] = useState<string | null>(null);
  const [curntOrder, setCurntOrder] = useState<Order | "loading" | null>(null);
  let barcodeScanner: BrowserMultiFormatReader | null = null;

  useEffect(() => {
    setCurntOrder("loading");
    if (scannerRef.current) {
      barcodeScanner = new BrowserMultiFormatReader();
      barcodeScanner.decodeFromVideoDevice(
        null,
        scannerRef.current,
        (result) => {
          if (result) {
            setScanned(result.getText());
          }
        }
      );
    }

    return () => {
      if (barcodeScanner) {
        barcodeScanner.reset();
      }
    };
  }, [scannerRef.current, curntOrder]);

  return (
    <>
      <div className="flex justify-center w-screen max-w-5xl mx-auto px-3 text-center">
        {curntOrder === "loading" ? (
          <div>loading</div>
        ) : !curntOrder ? (
          <div className="items-center">
            <h1 className="text-2xl font-bold mb-4">Scan Barcode</h1>

            <div className="flex justify-center items-center h-screen w-screen">
              <video
                ref={scannerRef}
                className="block w-full h-full object-cover"></video>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg m-auto">
            <h2 className="text-2xl font-bold mb-4">Scanned Order</h2>
            <h3 className="text-xl mb-4">Order No: {curntOrder.orderNo}</h3>
            <table className="w-full table-auto mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {curntOrder.items.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-gray-800 border-b border-gray-700">
                    <td className="px-4 py-2">{item.id.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.id.price}</td>
                  </tr>
                ))}
                <tr className="bg-gray-800 border-b border-gray-700 border-t-4 border-t-black">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">
                    {curntOrder.items
                      .map((item) => item.quantity * item.id.price)
                      .reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Scanner;
