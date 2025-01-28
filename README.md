
# FeedKind

## Problem Statement  
Food waste is a critical global issue, contributing to environmental harm, resource wastage, and food insecurity. **FEEDKIND** addresses this challenge by building a system that reduces food waste, manages near-expiring products effectively, and maximizes their usage through innovative and collaborative features.


![image](https://github.com/user-attachments/assets/f78b8adf-2511-4687-95ff-b8342ebd65a3)

---

## Key Features & Workflow  

### 1. **Adding Products Efficiently**  
   - Stores can quickly add products using **barcode scanning** to ensure accuracy and reduce manual effort.  
   - Key benefits:  
     - Time-efficient product tracking.  
     - Accurate inventory management.  

---

### 2. **Expiration Tracking for Proactive Action**  
   - The platform monitors products nearing expiration (4 days before expiry) and displays them in a dedicated list.  
   - Key benefits:  
     - Early intervention minimizes waste.  
     - Transparent tracking builds trust with customers and food banks.  

---

### 3. **Discounted Customer Purchases**  
   - Products nearing expiration are available to customers at **50% discounted rates**, ensuring they are sold rather than wasted.  
   - Key benefits:  
     - Increased affordability for customers.  
     - Revenue recovery for stores.  

---

### 4. **Food Bank Collaboration**  
   - Food banks can claim products **free of cost** one day before expiration, ensuring food reaches those in need.  
   - Key benefits:  
     - Supports community welfare.  
     - Reduces food insecurity effectively.  

---

### 5. **Composting for Expired Products**  
   - Expired products are moved to a **dedicated composting list**, making them available to composters.  
   - The **Expired Product Management Page** includes two sections:  
     - **Food Bank Section**: Highlights items close to expiration.  
     - **Compost Section**: Displays expired items for composters.  
   - Key benefits:  
     - Environmentally responsible disposal.  
     - Encourages sustainable practices.

---

## Login Options  

- **Donor Login**:  
   - Enables stores to add products and manage inventory efficiently.  
   - Streamlines tracking and updates of product statuses.
 
- **Food Bank Login**:  
   - Empowers food banks to claim items and distribute them to those in need.  
   - Provides visibility into available products for quicker action.  

   ![image](https://github.com/user-attachments/assets/e8150562-abdf-47c5-853a-cd6cab1b7e7e)


---

## Value Proposition  

- **Reduces Food Waste**: Mitigates environmental harm by ensuring effective utilization of resources.  
- **Economic Incentives**: Drives affordability for customers and revenue for stores through timely discounts.  
- **Community Impact**: Supports food banks to fight food insecurity and encourages composting to protect the environment.  

---

## Technology Stack  
**FEEDKIND** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that combines scalable database management, efficient backend logic, and a dynamic frontend experience.

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

---

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

5. Confirm backend functionality:  
   - Verify API endpoints using Postman or your browser.  
   - Ensure a successful connection to MongoDB.

---

## Results  

- Reduced food waste by optimizing near-expiry product management.  
- Increased community involvement through discounted sales and food bank partnerships.  
- Promoted sustainability through composting solutions for expired products.  

**FEEDKIND** delivers impactful results by leveraging technology to tackle a critical global challenge.

---
