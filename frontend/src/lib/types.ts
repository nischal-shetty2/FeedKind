export interface Vendor {
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

export interface Item {
  itemName: string;
  expirationDate: string;
  price: number;
}

export interface Listing {
  vendorId: Vendor;
  items: Item[];
  bulkExpirationDate: string;
  createdAt: string;
  updatedAt: string;
}
