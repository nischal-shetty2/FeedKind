
# FEEDKIND

## Problem Statement
Food waste is a major issue leading to environmental harm and food insecurity. This project aims to reduce food waste by managing near-expiring products and ensuring their proper usage.

![image](https://github.com/user-attachments/assets/f78b8adf-2511-4687-95ff-b8342ebd65a3)

---

## How It Works

1. **Adding Products**  
   Product details are stored using barcode scanning.
   
   ![image](https://github.com/user-attachments/assets/f78b8adf-2511-4687-95ff-b8342ebd65a3)

3. **Expiration Tracking**  
   Products nearing expiration (4 days before) are listed on the platform.
   
   ![image](https://github.com/user-attachments/assets/f78b8adf-2511-4687-95ff-b8342ebd65a3)

5. **Customer Purchase**  
   Customers can buy these products at a 50% discount.
   
   ![image](https://github.com/user-attachments/assets/f78b8adf-2511-4687-95ff-b8342ebd65a3)

7. **Food Bank Access**  
   Food banks can claim products for free one day before expiration.
   
   ![image](https://github.com/user-attachments/assets/f78b8adf-2511-4687-95ff-b8342ebd65a3)

9. **Composting**  
   Unclaimed products are sent to composters.
   
   ![image](https://github.com/user-attachments/assets/f78b8adf-2511-4687-95ff-b8342ebd65a3)

---

## Login Options

- **Donor**  
  Stores add products and manage inventory.
  
  ![image](https://github.com/user-attachments/assets/e8150562-abdf-47c5-853a-cd6cab1b7e7e)

- **Food Bank**  
  Food banks claim free products to distribute.
  
  ![image](https://github.com/user-attachments/assets/95dcdb94-0020-4307-86c0-1ffcc0e5f3fd)

---

## Steps to Run

### Frontend
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/FEEDKIND.git
   ```

2. Navigate to the frontend directory:  
   ```bash
   cd FEEDKIND/frontend
   ```

3. Install dependencies:  
   ```bash
   npm install
   ```

4. Start the frontend:  
   ```bash
   npm run dev
   ```

### Backend
1. Navigate to the backend directory:  
   ```bash
   cd FEEDKIND/backend
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following environment variables:  
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:  
   ```bash
   npm run start
   ```

5. Ensure the backend is connected to MongoDB. If you're using a cloud database like MongoDB Atlas, replace `your_mongodb_connection_string` in the `.env` file with your Atlas URI.

6. Test the backend by accessing API endpoints using Postman or a browser.

---

